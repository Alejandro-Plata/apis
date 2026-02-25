import React from 'react';
import PokemonCard from './PokemonCard';

/**
 * COMPONENTE: PokemonGrid
 * 
 * Renderiza el grid de tarjetas de pokémon
 * 
 * Props:
 * - pokemon: array de pokémon a mostrar
 * - onCardClick: función que se ejecuta cuando se hace click en una tarjeta
 */

export default function PokemonGrid({ pokemon, onCardClick }) {
  return (
    <div className="pokemon-grid" id="pokedex">
      {pokemon.map(poke => (
        <PokemonCard 
          key={poke.id}
          pokemon={poke}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}
