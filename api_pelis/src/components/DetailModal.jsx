import React, { useEffect, useRef } from 'react';

export default function ModalDetalles({ item, abierto, alCerrar, esMovie }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (abierto && item && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!abierto && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [abierto, item]);

  if (!item) return null;

  const titulo = esMovie ? item.title : item.name;
  const year = esMovie ? item.release_date?.split('-')[0] : item.first_air_date?.split('-')[0];
  const fondo = item.backdrop_path 
    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}` 
    : 'https://via.placeholder.com/300x300';
  const generos = item.genres ? item.genres.slice(0, 2) : [];

  return (
    <dialog ref={dialogRef} className="modal-overlay" onClick={(e) => e.target === dialogRef.current && alCerrar()}>
      <button className="heart-close-btn" onClick={alCerrar}>
        <span>✖</span>
      </button>

      <div className="deco-header">
        <div className="header-pattern"></div>
        <div className="hero-circle">
          <img src={fondo} alt={titulo} />
        </div>
      </div>

      <div className="deco-body">
        <div className="title-section">
          <h2 className="cute-title">{titulo}</h2>
          <div className="cute-badges">
            {generos.map((g) => (
              <span key={g.id} className="badge badge-pink">{g.name}</span>
            ))}
            {year && <span className="badge badge-yellow badge-time">{year}</span>}
          </div>
        </div>

        <div className="bubble-desc">
          <p>{item.overview || 'Sin descripción disponible'}</p>
        </div>
      </div>
    </dialog>
  );
}
