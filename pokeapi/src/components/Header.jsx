import React from 'react';

/**
 * COMPONENTE: Header
 * 
 * Renderiza el encabezado con buscador
 * 
 * Props:
 * - onSearch: función que se ejecuta cuando el usuario busca
 */

export default function Header({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleButtonClick = () => {
    // Podría hacer algo aquí si lo necesitaras
    console.log('Botón de búsqueda clickeado');
  };

  return (
    <header>
      <h1>🌸 Pokédex 🌸</h1>
      
      <div className="search-container">
        <input
          type="text"
          id="search-input"
          placeholder="Busca tu Pokémon..."
          onChange={handleInputChange}
        />
        
        <button 
          id="search-btn"
          onClick={handleButtonClick}
        >
          <svg className="search-icon-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M65 65 L90 90" stroke="white" strokeWidth="10" strokeLinecap="round" />
            <circle cx="42" cy="42" r="32" stroke="white" strokeWidth="7" fill="none" />
            <path d="M25 30 Q 35 20 45 25" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6"/>
            <g transform="translate(62, 58) rotate(-45)">
              <path d="M0 0 C -5 -10, -5 -15, 0 -20 C 5 -15, 5 -10, 0 0" fill="#fff" />
              <path d="M0 0 C -8 -5, -12 -8, -10 -15" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M0 0 C 8 -5, 12 -8, 10 -15" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </button>
      </div>
    </header>
  );
}
