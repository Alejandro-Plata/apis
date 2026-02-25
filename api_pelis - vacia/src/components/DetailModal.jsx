import React from 'react';

// TODO: Este componente deberá:
// 1. Recibir los datos de una película/serie como props
// 2. Usar useRef para controlar el elemento <dialog>
// 3. Usar useEffect para abrir/cerrar el modal
// 4. Mostrar información detallada de la película/serie

export default function DetailModal() {
  return (
    <dialog className="modal-overlay">
      <button className="heart-close-btn">
        <span>✖</span>
      </button>

      <div className="deco-header">
        <div className="header-pattern"></div>
        <div className="hero-circle">
          <img src="https://via.placeholder.com/300x300" alt="Película" />
        </div>
      </div>

      <div className="deco-body">
        <div className="title-section">
          <h2 className="cute-title">Nombre de la película</h2>
          <div className="cute-badges">
            <span className="badge badge-pink">Acción</span>
            <span className="badge badge-pink">Drama</span>
            <span className="badge badge-yellow badge-time">2024</span>
          </div>
        </div>

        <div className="bubble-desc">
          <p>Aquí irá la descripción de la película...</p>
        </div>
      </div>
    </dialog>
  );
}
