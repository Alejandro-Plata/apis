import React from 'react';

export default function Encabezado({ idioma, alCambiarIdioma }) {
  return (
    <header className="kitty-header">
      <div className="bow-decoration">
        <div className="bow-left"></div>
        <div className="bow-center"></div>
        <div className="bow-right"></div>
      </div>

      <h1>HELLO CINEMA</h1>
      
      <div className="candy-toggle">
        <button 
          className={`candy-btn ${idioma === 'es' ? 'active' : ''}`}
          onClick={() => alCambiarIdioma('es')}
        >
          ES
        </button>
        <button 
          className={`candy-btn ${idioma === 'en' ? 'active' : ''}`}
          onClick={() => alCambiarIdioma('en')}
        >
          EN
        </button>
      </div>
    </header>
  );
}
