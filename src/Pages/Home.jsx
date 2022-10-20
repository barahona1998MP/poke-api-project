import React from 'react'
import FormHome from '../components/home/FormHome'
import './styles/home.css'

const Home = () => {
  return (
    <div className='home'>
      <img className='home__img' src="/img/Home/pokedex.png" alt="Pokedex Logo" />
      <h2 className="home__subtitle">Hi Trainer!</h2>
      <p className='home__text'>Give me your to see the pokedex</p>
      <FormHome />
    </div>
  )
}

export default Home