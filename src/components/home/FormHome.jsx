import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserNameGlobal } from '../../store/slices/userName.slice'

const FormHome = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submit = ( e ) => {
        e.preventDefault()
        const name = e.target.name.value.trim()
        dispatch(setUserNameGlobal(name))
        navigate('/pokedex')
    }
  return (
    <form onSubmit={submit} className='home__form' >
        <input className='home__input' type="text" placeholder='Enter your name here.' id='name' required/>
        <button className='home__btn'>Catch them all!</button>
  </form>
  )
}

export default FormHome