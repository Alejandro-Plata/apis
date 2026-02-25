import React from 'react';

// Componente únicamente visual
export default function Header() {
  return (
    <header className="kitty-header">
      <div className="bow-decoration">
        <div className="bow-left"></div>
        <div className="bow-center"></div>
        <div className="bow-right"></div>
      </div>

      <h1>HELLO CINEMA</h1>
      
      {/* TODO: Cuando entiendas estado, puedes agregar botones de idioma aquí */}
    </header>
  );
}
