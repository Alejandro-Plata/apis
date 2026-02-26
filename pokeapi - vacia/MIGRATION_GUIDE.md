# 🔄 Guía Detallada de Migración: Vanilla JS → React

> Paso a paso para convertir la Pokédex de Vanilla JavaScript a React

---

## 📋 Tabla de Contenidos

1. [Pre-migración](#pre-migración)
2. [Fase 1: Bootstrap React](#fase-1-bootstrap-react)
3. [Fase 2: Migración de HTML a JSX](#fase-2-migración-de-html-a-jsx)
4. [Fase 3: Estado y Lógica](#fase-3-estado-y-lógica)
5. [Fase 4: Componentes Interactivos](#fase-4-componentes-interactivos)
6. [Checklist Final](#checklist-final)

---

## Pre-migración

### ¿Qué tienes?

**Proyecto Vanilla JS (`pokeapi - original/`):**
```
pokeapi - original/
├── index.html          ← HTML estático
├── style.css           ← Estilos
└── js/
    ├── app.js          ← Lógica principal (estado, eventos)
    └── pokemonService.js ← Llamadas a API
```

**Proyecto destino React (`pokeapi - vacia/`):**
```
pokeapi - vacia/
├── index.html          ← Punto de entrada (solo divroot)
├── package.json        ← Dependencias React
├── vite.config.js      ← Configuración Vite
└── src/
    ├── main.jsx        ← Punto de entrada React
    ├── App.jsx         ← Componente raíz
    ├── style.css       ← Estilos (copia del original)
    ├── components/     ← Tus componentes
    ├── hooks/          ← Custom hooks
    └── services/       ← Lógica de API
```

---

## Fase 1: Bootstrap React

### Paso 1.1: Configurar `main.jsx`

Este archivo inicializa la aplicación React en el navegador:

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**¿Qué hace?**
- Importa React
- Importa tu componente `App`
- Importa estilos globales
- Renderiza App dentro del `<div id="root">` del HTML

### Paso 1.2: Actualizar `index.html`

El index.html de React es muy simple:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokédex Kawaii API</title>
</head>
<body>
    <!-- React renderizará aquí -->
    <div id="root"></div>
    
    <!-- Script de Vite se agrega automáticamente -->
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### Paso 1.3: Copiar estilos CSS

Simplemente copia el contenido de `pokeapi - original/style.css` a `pokeapi - vacia/src/style.css`:

```bash
# O cópialos manualmente
cp ../pokeapi\ -\ original/style.css ./src/style.css
```

**Nota:** Los estilos funcionan igual en React, solo ciertos selectores pueden cambiar (IDs → clases)

---

## Fase 2: Migración de HTML a JSX

### Paso 2.1: Entender JSX

JSX es HTML dentro de JavaScript. Las reglas:

```jsx
// ❌ INCORRECTO - HTML puro no funcionaría
<div class="container">
  <h1>Pokédex</h1>
</div>

// ✅ CORRECTO - Atributos cambian
<div className="container">
  <h1>Pokédex</h1>
</div>
```

**Cambios principales:**
| HTML | JSX |
|------|-----|
| `class=` | `className=` |
| `onclick=` | `onClick=` |
| `for=` | `htmlFor=` |
| `id="app"` | `id="app"` ← (igual) |

### Paso 2.2: Crear componente `Header.jsx`

**Vanilla JS (index.html):**
```html
<header>
    <h1>🌸 Pokédex 🌸</h1>
    <div class="search-container">
        <input type="text" id="search-input" placeholder="Busca tu Pokémon...">
        <button id="search-btn">🔍</button>
    </div>
</header>
```

**React (Header.jsx):**
```jsx
// src/components/Header.jsx

function Header({ onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    onSearch(input.value);
    input.value = '';
  };

  return (
    <header>
      <h1>🌸 Pokédex 🌸</h1>
      <form className="search-container" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Busca tu Pokémon..."
        />
        <button type="submit">
          {/* SVG aquí si quieres */}
          🔍
        </button>
      </form>
    </header>
  );
}

export default Header;
```

**Cambios:**
- `id` → removido, controlado por componente
- `onclick` → `onSubmit` en el form
- Prop `onSearch` para comunicar con el padre

### Paso 2.3: Crear componente `PokemonCard.jsx`

**Vanilla JS:**
```html
<div class="pokemon-card">
  <div class="card-header">
    <span class="number">#025</span>
  </div>
  <div class="img-container">
    <img src="..." alt="Pikachu">
  </div>
  <h2 class="name">Pikachu</h2>
  <div class="types">
    <span class="type electric">Eléctrico</span>
  </div>
</div>
```

**React:**
```jsx
// src/components/PokemonCard.jsx

function PokemonCard({ pokemon, onClick }) {
  return (
    <div 
      className={`pokemon-card ${pokemon.isShiny ? 'shiny' : ''}`}
      onClick={() => onClick(pokemon)}
    >
      <div className="card-header">
        <span className="number">#{String(pokemon.id).padStart(3, '0')}</span>
        {pokemon.isShiny && <span className="shiny-icon">✨</span>}
      </div>
      <div className="img-container">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <h2 className="name">{pokemon.name}</h2>
      <div className="types">
        {pokemon.types && pokemon.types.map(type => (
          <span key={type} className={`type ${type}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
```

**Cambios importantes:**
- Datos como `props` en lugar de atributos HTML
- `onClick` en lugar de event listeners
- Ciclo `.map()` para tipos dinámicos
- Clases condicionales con ternarios

### Paso 2.4: Crear componente `PokemonGrid.jsx`

```jsx
// src/components/PokemonGrid.jsx

import PokemonCard from './PokemonCard';

function PokemonGrid({ pokemon, onCardClick }) {
  if (!pokemon || pokemon.length === 0) {
    return <div className="pokemon-grid"><p>Cargando Pokémon...</p></div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map(poke => (
        <PokemonCard 
          key={poke.id} 
          pokemon={poke}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
```

### Paso 2.5: Crear componente `Modal.jsx`

**Vanilla JS:**
```html
<div id="pokemon-modal" class="modal-overlay" style="display: none;">
  <div class="modal-content kawaii-box">
    <button class="close-btn">&times;</button>
    <div class="modal-body">
      <img src="" alt="Pokemon" id="modal-img">
      <h2 id="modal-name">Pikachu</h2>
      <div class="modal-info">
        <p class="description">Descripción...</p>
      </div>
    </div>
  </div>
</div>
```

**React:**
```jsx
// src/components/Modal.jsx

function Modal({ pokemon, onClose }) {
  if (!pokemon) return null; // No renderiza si no hay Pokémon

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content kawaii-box" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <img src={pokemon.image} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <div className="modal-info">
            <p className="description">
              {pokemon.description || 'Información disponible'}
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <span className="label">Altura:</span>
                <span className="value">{pokemon.height}</span>
              </div>
              <div className="stat-item">
                <span className="label">Peso:</span>
                <span className="value">{pokemon.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
```

**Cambios:**
- No usa `display: none`, renderizado condicional
- `onClick` en overlay cierra modal
- `e.stopPropagation()` previene cierre al hacer click dentro

### Paso 2.6: Crear componente `Pagination.jsx`

```jsx
// src/components/Pagination.jsx

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <button 
        className="page-btn prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ❮
      </button>
      
      <div className="page-numbers">
        {pages.map(page => (
          <button
            key={page}
            className={`page-num ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        className="page-btn next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ❯
      </button>
    </div>
  );
}

export default Pagination;
```

---

## Fase 3: Estado y Lógica

### Paso 3.1: Crear servicio de API

```javascript
// src/services/pokemonService.js

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_PER_PAGE = 20;

function isShiny() {
  return Math.random() < 0.1; // 10% probabilidad
}

function transformPokemonData(data) {
  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image: data.sprites?.other['official-artwork']?.front_default,
    height: `${data.height / 10}m`,
    weight: `${data.weight / 10}kg`,
    types: data.types?.map(t => t.type.name) || [],
    isShiny: isShiny(),
  };
}

export async function getPokemonPage(page = 1) {
  try {
    const offset = (page - 1) * POKEMON_PER_PAGE;
    const url = `${API_URL}?limit=${POKEMON_PER_PAGE}&offset=${offset}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener Pokémon');
    
    const data = await response.json();
    
    // Obtener detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(p => 
        fetch(`${API_URL}/${p.name}`).then(r => r.json())
      )
    );

    return {
      pokemon: pokemonDetails.map(transformPokemonData),
      totalPages: Math.ceil(data.count / POKEMON_PER_PAGE),
    };
  } catch (error) {
    console.error('Error en getPokemonPage:', error);
    throw error;
  }
}

export async function searchPokemon(name) {
  try {
    const response = await fetch(`${API_URL}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon no encontrado');
    
    const data = await response.json();
    return transformPokemonData(data);
  } catch (error) {
    console.error('Error en searchPokemon:', error);
    throw error;
  }
}
```

### Paso 3.2: Crear custom hook `usePokeAPI.js`

```javascript
// src/hooks/usePokeAPI.js

import { useState, useEffect } from 'react';
import { getPokemonPage, searchPokemon } from '../services/pokemonService';

function usePokeAPI(page = 1) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const { pokemon, totalPages } = await getPokemonPage(page);
        setPokemon(pokemon);
        setTotalPages(totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [page]); // Se ejecuta cuando 'page' cambia

  const search = async (name) => {
    if (!name.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await searchPokemon(name);
      setPokemon([result]);
      setTotalPages(1);
    } catch (err) {
      setError('Pokémon no encontrado');
      setPokemon([]);
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, loading, error, totalPages, search };
}

export default usePokeAPI;
```

---

## Fase 4: Componentes Interactivos

### Paso 4.1: Crear App.jsx completo

```jsx
// src/App.jsx

import { useState } from 'react';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import usePokeAPI from './hooks/usePokeAPI';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { pokemon, loading, error, totalPages, search } = usePokeAPI(currentPage);

  const handleSearch = (query) => {
    if (query.trim()) {
      search(query);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedPokemon(null); // Cerrar modal al cambiar página
    }
  };

  return (
    <div className="main-container">
      <Header onSearch={handleSearch} />
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Cargando Pokémon...</div>
      ) : (
        <>
          <PokemonGrid 
            pokemon={pokemon} 
            onCardClick={setSelectedPokemon}
          />
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <Modal 
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default App;
```

**Flujo de datos:**
```
App (Estado)
├── Header → handleSearch → App actualiza búsqueda
├── PokemonGrid
│   └── PokemonCard → click → setSelectedPokemon → Modal
├── Modal (selectedPokemon)
└── Pagination → click → setCurrentPage → usePokeAPI load new data
```

---

## Checklist Final

### ✅ Archivos creados:

```
src/
├── main.jsx ........................... CREADO
├── App.jsx ............................ CREADO
├── style.css .......................... COPIADO de original
├── components/
│   ├── Header.jsx ..................... CREADO
│   ├── PokemonCard.jsx ................ CREADO
│   ├── PokemonGrid.jsx ................ CREADO
│   ├── Modal.jsx ...................... CREADO
│   └── Pagination.jsx ................. CREADO
├── hooks/
│   └── usePokeAPI.js .................. CREADO
└── services/
    └── pokemonService.js .............. CREADO
```

### ✅ Funcionalidades verificadas:

- [ ] Página carga sin errores
- [ ] Se muestran Pokémon en la grid
- [ ] Click en tarjeta abre modal
- [ ] Botón cerrar cierra modal
- [ ] Click afuera del modal también cierra
- [ ] Búsqueda funciona
- [ ] Paginación navega correctamente
- [ ] Estados de carga (loading) se muestran
- [ ] Errores se muestran al usuario

### ✅ Performance:

- [ ] Sin console errors
- [ ] Sin warnings de React
- [ ] Renderización suave
- [ ] Modal se anima correctamente

---

## 🎉 ¡Migración Complete!

Una vez completados los pasos, tu Pokédex React está lista.

**Próximas mejoras opcionales:**
- Agregar animaciones con CSS/bibliotecas
- Caché de búsquedas
- Dark mode
- PWA (Progressive Web App)
- Almacenamiento local (IDB)
