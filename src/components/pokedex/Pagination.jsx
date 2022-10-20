import React from 'react'
import './styles/pagination.css'
const Pagination = ({page, pagesLength, setPage}) => {

    const pagesPerBlock = 8
    const currentBlock = Math.ceil(page / pagesPerBlock) 
    const BlockLength = Math.ceil(pagesLength / pagesPerBlock)

    const arrPages = []
    const initialPage = (currentBlock - 1) * pagesPerBlock + 1
                    //  initial + page - 1
                    //      1   *   8   = 8
                    //      2   *   8   = 16
    const limitPage = BlockLength === currentBlock ? pagesLength : currentBlock * pagesPerBlock
    for(let i = initialPage; i <= limitPage; i++) {
        arrPages.push(i)
    }

    const handlePrev = () => {
        setPage(page - 1)
    }
    const handleNext = () => {
        setPage(page + 1)
    }
    const handlePage = (currentPage) => {
        setPage(currentPage)
    }
  return (
    <div className='pagination'>
        {
            page > 1 &&
            <div onClick={handlePrev} className='pagination__prev pagination__active'>&#60;</div>
        }
        <div className='pagination__container'>
            {
                arrPages.map(arrPage => (
                    <li onClick={() => handlePage(arrPage)} 
                        className={`pagination__page ${page == arrPage && 'pagination__active'}`} 
                        key={arrPage}>{arrPage}</li>
                ))
            }
        </div>
        {
            page < pagesLength &&
            <div onClick={handleNext} className='pagination__next pagination__active'>&#62;</div>
        }
    </div>
  )
}

export default Pagination