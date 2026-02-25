import React from 'react';

/**
 * COMPONENTE: PokemonModal
 * 
 * Renderiza un modal con los detalles del pokémon
 * 
 * Props:
 * - pokemon: objeto del pokémon a mostrar
 * - isOpen: boolean que indica si el modal está abierto
 * - onClose: función que se ejecuta al cerrar el modal
 */

export default function PokemonModal({ pokemon, isOpen, onClose }) {
  // Si el modal no está abierto o no hay pokémon, no renderiza nada
  if (!isOpen || !pokemon) return null;

  return (
    <dialog open className="modal-overlay">
      <div className="modal-content kawaii-box">
        
        {/* Botón de cerrar */}
        <button 
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="modal-body">
          
          {/* Imagen del pokémon */}
          <div className="modal-img-container">
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
          
          {/* Nombre del pokémon */}
          <h2 className="modal-name">{pokemon.name}</h2>
          
          {/* Información */}
          <div className="modal-info">
            <p className="description">
              {pokemon.description}
            </p>
            
            {/* Altura y peso */}
            <div className="stats-row">
              <div className="stat-item">
                <span className="label">Altura:</span>
                <span className="value">{pokemon.height}m</span>
              </div>
              <div className="stat-item">
                <span className="label">Peso:</span>
                <span className="value">{pokemon.weight}kg</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </dialog>
  );
}
