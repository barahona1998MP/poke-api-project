import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardPokedex from '../components/pokedex/CardPokedex'
import InputSearch from '../components/pokedex/InputSearch'
import Pagination from '../components/pokedex/Pagination'
import SelectByType from '../components/pokedex/SelectByType'
import FooterPoke from '../components/shared/FooterPoke'
import HeaderPoke from '../components/shared/HeaderPoke'
import './styles/pokedex.css'
const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [typeSelected, setTypeSelected] = useState('All Pokemons')
  useEffect(() => {
    if(typeSelected !== 'All Pokemons') {
      //Si selection un type
      axios.get(typeSelected)
        .then(res => {
          const result = res.data.pokemon.map(e => e.pokemon)
          setPokemons(result)
        })
        .catch(err => console.log(err))
    } else {
      //Si quiero todos los pokemons
      const URL = 'https://pokeapi.co/api/v2/pokemon?limit=1154&offset=0'
      axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }
  },[typeSelected])
  console.log(pokemons)
  const userName = useSelector(state => state.userName)

  //Lógica de paginacion
  const [page, setPage] = useState(1)
  const [pokePerPage, setPokePerPage] = useState(8)
  const initialPoke = (page - 1) * pokePerPage
              //initialPoke + pokePerPage + 1
  const finalPoke = page * pokePerPage
  return (
    <div className='pokedex'>
      <header className='pokedex__header'>
        <HeaderPoke />
        <p className='pokedex__title'>Welcome <span>{userName}</span>, here you can find favorite pokemon</p>
      </header>
      <aside className='pokedex__aside'>
        <InputSearch />
        <SelectByType setTypeSelected={setTypeSelected} setPage={setPage}/>
      </aside>
      <Pagination 
        page={page} 
        pagesLength={pokemons && Math.ceil(pokemons.length / pokePerPage)}
        setPage={setPage}
      />
      <main>
        <div className="container flex">
          {
            pokemons?.slice(initialPoke, finalPoke).map(pokemon => (
              <CardPokedex 
                key={pokemon.url}
                url={pokemon.url}
              />
            ))
          }
        </div>
      </main>
      <Pagination 
        page={page} 
        pagesLength={pokemons && Math.ceil(pokemons.length / pokePerPage)}
        setPage={setPage}
      />
    </div>
  )
}

export default Pokedex