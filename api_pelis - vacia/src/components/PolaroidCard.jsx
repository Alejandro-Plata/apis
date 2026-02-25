import React from 'react';

// Componente visual de una tarjeta
// TODO: Más adelante recibirá props del componente padre para:
// - Mostrar el título de la película/serie
// - Mostrar el poster (imagen)
// - Mostrar el rating
// - Manejar click para abrir modal

export default function PolaroidCard() {
  return (
    <div className="polaroid">
      <div className="washi-tape"></div>
      <div className="photo-frame">
        <img src="https://via.placeholder.com/300x450?text=Cargando" alt="Película" />
        <div className="sticker-score">★</div>
      </div>
      <div className="handwritten-caption">
        <h3>Nombre de la película</h3>
      </div>
    </div>
  );
}
