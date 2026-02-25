import React from 'react';

// TODO: Aquí necesitarás:
// 1. Importar useState
// 2. Crear un estado para la consulta de búsqueda
// 3. Crear una función que maneje el submit del formulario
// 4. Pasar la consulta al componente padre (App) para hacer el fetch

export default function SearchFilter() {
  return (
    <div className="search-filter-section">
      <form className="search-box" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Buscar película o serie..."
        />
        <button type="submit" className="search-btn">Buscar</button>
      </form>
      
      <div className="filters-box">
        <div className="filter-group">
          <label htmlFor="order-filter">Ordenar por:</label>
          <select id="order-filter">
            <option value="popularity">Popularidad</option>
            <option value="rating">Rating</option>
            <option value="release_date">Fecha de Salida</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Orden:</label>
          <select id="sort-filter">
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select>
        </div>
      </div>
    </div>
  );
}
