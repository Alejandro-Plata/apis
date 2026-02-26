/**
 * Modal para mostrar detalles de un Pokémon
 */
function Modal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content kawaii-box" 
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <div className="modal-body">
          <div className="modal-img-container">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          
          <h2>{pokemon.name}</h2>
          
          <div className="modal-info">
            <p className="description">
              ¡Hola! Soy {pokemon.name}. ID: #{String(pokemon.id).padStart(3, '0')}
            </p>
            
            <div className="stats-row">
              <div className="stat-item">
                <span className="label">Altura:</span>
                <span className="value">{pokemon.height}</span>
              </div>
              <div className="stat-item">
                <span className="label">Peso:</span>
                <span className="value">{pokemon.weight}</span>
              </div>
            </div>

            <div className="types">
              {pokemon.types && pokemon.types.map(type => (
                <span key={type} className={`type ${type}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
