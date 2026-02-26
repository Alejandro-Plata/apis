import PokemonCard from './PokemonCard';

/**
 * Grid de Pokémon
 * Renderiza múltiples tarjetas de Pokémon
 */
function PokemonGrid({ pokemon, onCardClick }) {
  if (!pokemon || pokemon.length === 0) {
    return (
      <div className="pokemon-grid">
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
          Cargando Pokémon...
        </p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map(poke => (
        <PokemonCard 
          key={poke.id} 
          pokemon={poke}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
