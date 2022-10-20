import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pokemon404 from "../components/pokedexId/Pokemon404";
import HeaderPoke from "../components/shared/HeaderPoke";
import "./styles/pokedexById.css";

const PokedexById = () => {
  const { id } = useParams();
  const [pokemonById, setPokemonById] = useState();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    axios
      .get(URL)
      .then((res) => setPokemonById(res.data))
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  }, []);
  if (hasError) {
    return <Pokemon404 />;
  }
  console.log(pokemonById);


  return (
    <div className={`card-pokeid bg-${pokemonById?.types[0].type.name}`}>
      <HeaderPoke />
      <div className="card-pokeid__Back">
        <Link className="card-pokeid__link" to='/pokedex'>See other pokemon</Link>
      </div>
      <article className={`card-pokeid__contenedor`}>
        <header className={`card-pokeid__header bg-${pokemonById?.types[0].type.name}`}>
          <img
            src={pokemonById?.sprites.other.home['front_default']} alt=""
            className='card-pokeid__sprite' 
          />
        </header>
        <div className="card-pokeid__data">
          <h3 className="card-pokeid__id">{`#${pokemonById?.id}`}</h3>
          <h3 className={`card_pokeid__name letter-${pokemonById?.types[0].type.name}`}>{pokemonById?.name}</h3>
          <div className="card-pokeid__details">
            <ul className="card-pokeid__measures">
              <li>Weight: <span>{pokemonById?.weight}</span></li>
              <li>Height: <span>{pokemonById?.height}</span></li>
            </ul>
            <section className="card-pokeid__type-ability">
              <div className="type">
                <p className="card-pokeid__type-title">Type</p>
                <ul className="card-pokeid__type">
                  {
                    pokemonById?.types.map(type => (
                      <li className={
                        `bg-${type.type.name === pokemonById?.types[0].type.name ? pokemonById?.types[0].type.name : pokemonById?.types[1].type.name}`
                      } 
                      key={type.slot}>{type.type.name}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="ability">
                <p className="card-pokeid__type-title">Skills</p>
                <ul className="card-pokeid__abilities">
                  {
                    pokemonById?.abilities.map(ability => (
                      <li key={ability.slot}>{ability.ability.name}</li>
                    ))
                  }
                </ul>
              </div>
            </section>
          </div>
        </div>
        <div className="card-pokeid__stat">
          <h3 className="card-pokeid-title">Stats</h3>
          <ul className='card-pokeid__stats-container'>
            {
              pokemonById?.stats.map(stat => (
                <li key={stat.stat.name} className='card-pokeid__stat-li'>
                  <div className="card-pokeid-name">
                    <h4 className="card-pokeid__stat-label">{stat.stat.name}</h4>
                    <p className={`card-pokeid__stat-number `}>{`${stat.base_stat}/100`}</p>
                  </div>
                  <div className="menu">
                    <div className={`menu-barra bg-${pokemonById?.types[0].type.name}`} style={{width: `${stat.base_stat}%`}}></div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </article>
      <article className="card-pokeid__moves">
        <h2 className="card-pokeid__moves-title">Movements</h2>
        <ul className="card-pokeid__moves-list">
          {
            pokemonById?.moves.map(move => (
              <li className="card-pokeid__moves-item" key={move.move.name}>{move.move.name}</li>
            ))
          }
        </ul>
      </article>
    </div>
  );
};

export default PokedexById;
