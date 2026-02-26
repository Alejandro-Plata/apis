/**
 * Componente para mostrar una tarjeta individual de Pokémon
 * Muestra imagen, nombre, tipos y número Pokédex
 */
function PokemonCard({ pokemon, onClick }) {
  return (
    <div 
      className={`pokemon-card ${pokemon.isShiny ? 'shiny' : ''}`}
      onClick={() => onClick(pokemon)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <span className="number">#{String(pokemon.id).padStart(3, '0')}</span>
        {pokemon.isShiny && <span className="shiny-icon">✨</span>}
      </div>
      <div className="img-container">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <h2 className="name">{pokemon.name}</h2>
      <div className="types">
        {pokemon.types && pokemon.types.map(type => (
          <span key={type} className={`type ${type}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
