import React, { useState } from 'react';

export default function BuscadorFiltro({ alBuscar, ordenPor, alCambiarOrdenPor, orden, alCambiarOrden }) {
  const [consulta, setConsulta] = useState('');

  const manejarBuscar = (e) => {
    e.preventDefault();
    if (consulta.trim()) {
      alBuscar(consulta.trim());
      setConsulta('');
    }
  };

  return (
    <div className="search-filter-section">
      <form className="search-box" onSubmit={manejarBuscar}>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Buscar película o serie..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />
        <button type="submit" className="search-btn">Buscar</button>
      </form>
      
      <div className="filters-box">
        <div className="filter-group">
          <label htmlFor="order-filter">Ordenar por:</label>
          <select 
            id="order-filter"
            value={ordenPor}
            onChange={(e) => alCambiarOrdenPor(e.target.value)}
          >
            <option value="popularity">Popularidad</option>
            <option value="rating">Rating</option>
            <option value="release_date">Fecha de Salida</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Orden:</label>
          <select 
            id="sort-filter"
            value={orden}
            onChange={(e) => alCambiarOrden(e.target.value)}
          >
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select>
        </div>
      </div>
    </div>
  );
}
