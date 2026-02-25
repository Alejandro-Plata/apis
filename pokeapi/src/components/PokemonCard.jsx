import React from 'react';
import { formatPokemonNumber } from '../services/pokemonService';

/**
 * COMPONENTE: PokemonCard
 * 
 * Renderiza una tarjeta individual de pokémon
 * 
 * Props:
 * - pokemon: objeto con id, name, types, image
 * - onCardClick: función que se ejecuta al hacer click
 */

export default function PokemonCard({ pokemon, onCardClick }) {
  return (
    <div 
      className="pokemon-card"
      onClick={() => onCardClick(pokemon)}
    >
      <div className="card-header">
        <span className="number">{formatPokemonNumber(pokemon.id)}</span>
      </div>
      
      <div className="img-container">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      
      <h2 className="name">{pokemon.name}</h2>
      
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type} className={`type ${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
