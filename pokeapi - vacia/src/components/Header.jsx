import { useState } from 'react';

/**
 * Componente Header con búsqueda funcional
 * Permite buscar Pokémon por nombre presionando Enter
 * 
 * @param {Function} onSearch - Callback que recibe el nombre del Pokémon buscado
 */
function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  /**
   * Maneja la búsqueda al presionar Enter
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue);
      setSearchValue('');
    }
  };

  /**
   * Maneja el click en el botón de búsqueda
   */
  const handleSearchClick = () => {
    if (searchValue.trim()) {
      onSearch(searchValue);
      setSearchValue('');
    }
  };

  return (
    <header>
      <h1>🌸 Pokédex 🌸</h1>
      <div className="search-container">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Busca tu Pokémon..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          id="search-btn"
          onClick={handleSearchClick}
          title="Buscar Pokémon"
        >
          <svg 
            className="search-icon-svg" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M65 65 L90 90" stroke="white" strokeWidth="10" strokeLinecap="round" />
            
            <circle cx="42" cy="42" r="32" stroke="white" strokeWidth="7" fill="none" />
            
            <path 
              d="M25 30 Q 35 20 45 25" 
              stroke="white" 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none" 
              opacity="0.6"
            />

            <g transform="translate(62, 58) rotate(-45)">
              <path d="M0 0 C -5 -10, -5 -15, 0 -20 C 5 -15, 5 -10, 0 0" fill="#fff" />
              <path 
                d="M0 0 C -8 -5, -12 -8, -10 -15" 
                stroke="#fff" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none" 
              />
              <path 
                d="M0 0 C 8 -5, 12 -8, 10 -15" 
                stroke="#fff" 
                strokeWidth="3" 
                strokeLinecap="round" 
                fill="none" 
              />
            </g>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
