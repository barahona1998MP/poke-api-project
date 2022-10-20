import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/cardPoke.css'

const CardPokedex = ({url}) => {
  const [pokemon, setPokemon] = useState()

  useEffect(() => {
      axios.get(url)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
    },[])
    
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/pokedex/${pokemon.id}`)
    }
    return (
    <article 
        className={`card-poke border-${pokemon?.types[0].type.name}`} 
        onClick={handleClick}
    >
        <header className={`card-poke__header bg-${pokemon?.types[0].type.name}`}>
            <img
                src={pokemon?.sprites.other.home['front_default']} alt=""
                className='card-poke__sprite' 
            />
        </header>
        <section className='card-poke__body'>
            <h3 className={`card_poke__name letter-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
            <ul className='card-poke__types-container'>
                {
                    pokemon?.types.map(type => (
                        <li key={type.slot} className='card-poke__type'>
                            {type.type.name}
                        </li>
                    ))
                }
            </ul>
            <p className='card-poke__type-label'>Type</p>
        </section>
        <footer className='card-poke__footer'>
            <ul className='card-poke__stats-container'>
                {
                    pokemon?.stats.map(stat => (
                        <li key={stat.stat.name} className='card-poke__stat'>
                            <span className="card-poke__stat-label">{stat.stat.name}</span>
                            <span className={`card-poke__stat-number letter-${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>
        </footer>
    </article>
  )
}

export default CardPokedex