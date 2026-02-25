import React from 'react';

// Componente únicamente visual
export default function Navigation() {
  return (
    <nav className="ribbon-nav">
      <button className="ribbon-btn active">
        Películas 🎬
      </button>
      <div className="ribbon-divider">♥</div>
      <button className="ribbon-btn">
        Series 📺
      </button>
    </nav>
  );
}
