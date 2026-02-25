import React from 'react';

export default function Navegacion({ tipo, alCambiarTipo }) {
  return (
    <nav className="ribbon-nav">
      <button 
        className={`ribbon-btn ${tipo === 'peliculas' ? 'active' : ''}`}
        onClick={() => alCambiarTipo('peliculas')}
      >
        Películas 🎬
      </button>
      <div className="ribbon-divider">♥</div>
      <button 
        className={`ribbon-btn ${tipo === 'series' ? 'active' : ''}`}
        onClick={() => alCambiarTipo('series')}
      >
        Series 📺
      </button>
    </nav>
  );
}
