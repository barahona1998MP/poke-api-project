import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/inputSearch.css'
const InputSearch = () => {
    const navigate = useNavigate()
    const submit = ( e ) => {
        e.preventDefault()
        let search = e.target.search.value.trim().toLowerCase()
        navigate(`/pokedex/${search}`)
    }
  return (
    <form className='form-search' onSubmit={submit}>
        <input className='form-search__input' id='search' type="text" placeholder='Search a pokemon'/>
        <button className='form-search__btn'>Search</button>
    </form>
  )
}

export default InputSearch