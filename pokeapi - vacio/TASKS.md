# ✅ TASKS - Las 8 Tareas Detalladas

Copia y pega el código en tus archivos. Cada tarea es independiente.

---

## ✅ Tarea 1: Setup Inicial ⭐

**Objetivo:** Tener el proyecto corriendo en `localhost:5173`

### Pasos:

```bash
# 1. En la carpeta pokeapi - vacio/
npm create vite@latest . -- --template react

# 2. Instala dependencias
npm install

# 3. Corre el servidor
npm run dev
```

**Validar:** Abre `http://localhost:5173` en el navegador.

**Archivos generados automáticamente:**
- `package.json` ✅
- `vite.config.js` ✅
- `index.html` ✅
- `src/main.jsx` ✅
- `src/style.css` ✅

---

## ✅ Tarea 2: Header Component ⭐

**Archivo:** `src/components/Header.jsx`

**Objetivo:** Crear un componente de búsqueda reutilizable.

### Código:

```jsx
// src/components/Header.jsx
export default function Header({ onSearch }) {
  return (
    <header className="header">
      <h1>🎮 Pokédex Kawaii</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar pokémon..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>
    </header>
  );
}
```

### En App.jsx:

```jsx
import Header from './components/Header';

// Dentro del JSX:
<Header onSearch={handleSearch} />
```

**Conceptos:**
- ✅ Props: recibe `onSearch` (función callback)
- ✅ onChange: llamada cada vez que el usuario escribe
- ✅ Comunicación hacia el padre

---

## ✅ Tarea 3: usePokeAPI Hook ⭐⭐

**Archivo:** `src/hooks/usePokeAPI.js`

**Objetivo:** Crear un hook que haga fetch a PokeAPI.

### Código:

```javascript
// src/hooks/usePokeAPI.js
import { useState, useEffect } from 'react';

export function usePokeAPI() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setPokemon(data.results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);  // ← Ejecuta solo una vez al cargar

  return { pokemon, loading, error };
}
```

### En App.jsx:

```jsx
import { usePokeAPI } from './hooks/usePokeAPI';

function App() {
  const { pokemon, loading, error } = usePokeAPI();

  if (loading) return <p>Cargando pokémon...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(pokemon);  // Verifica que tengas 100 pokémon
}
```

**Conceptos:**
- ✅ useEffect: ejecuta fetch al cargar
- ✅ async/await: sintaxis limpia para peticiones
- ✅ Estado loading/error: manejo de estados
- ✅ Hook personalizado: reutilizable

---

## ✅ Tarea 4: PokemonGrid Component ⭐

**Archivo:** `src/components/PokemonGrid.jsx`

**Objetivo:** Renderizar lista de pokémon en una grid.

### Código:

```jsx
// src/components/PokemonGrid.jsx
import PokemonCard from './PokemonCard';

export default function PokemonGrid({ pokemon, onCardClick }) {
  return (
    <div className="pokemon-grid">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.name}
          pokemon={p}
          onClick={() => onCardClick(p)}
        />
      ))}
    </div>
  );
}
```

### En App.jsx:

```jsx
import PokemonGrid from './components/PokemonGrid';

// Dentro del JSX:
{!loading && (
  <PokemonGrid 
    pokemon={filteredPokemon}
    onCardClick={handleCardClick}
  />
)}
```

**Conceptos:**
- ✅ .map(): iterar array
- ✅ key={p.name}: identificar elementos únicos
- ✅ Pasar props: pokemon, onClick
- ✅ Callbacks: onCardClick hacia el padre

---

## ✅ Tarea 5: PokemonCard Component ⭐

**Archivo:** `src/components/PokemonCard.jsx`

**Objetivo:** Tarjeta individual con imagen y nombre.

### Código:

```jsx
// src/components/PokemonCard.jsx
export default function PokemonCard({ pokemon, onClick }) {
  // Extraer ID de la URL
  const id = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  
  // Formatear número: "025"
  const number = String(id).padStart(3, '0');

  return (
    <div className="pokemon-card" onClick={onClick}>
      <div className="card-header">
        <span className="number">#{number}</span>
      </div>
      <div className="img-container">
        <img 
          src={imageUrl} 
          alt={pokemon.name}
          loading="lazy"
        />
      </div>
      <h3 className="name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h3>
    </div>
  );
}
```

**Conceptos:**
- ✅ Extraer ID de URL: `split('/')`
- ✅ Formatear número: `padStart(3, '0')`
- ✅ onClick callback: hacia el padre
- ✅ Imagen lazy loading: optimización

---

## ✅ Tarea 6: PokemonModal Component ⭐⭐

**Archivo:** `src/components/PokemonModal.jsx`

**Objetivo:** Modal para ver detalles del pokémon.

### Código:

```jsx
// src/components/PokemonModal.jsx
export default function PokemonModal({ pokemon, isOpen, onClose }) {
  // Si no está abierto o no hay pokémon, no renderizar nada
  if (!isOpen || !pokemon) {
    return null;
  }

  const id = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const number = String(id).padStart(3, '0');

  return (
    <dialog className="modal" open>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <img src={imageUrl} alt={pokemon.name} className="modal-image" />
        </div>
        
        <div className="modal-body">
          <h2>#{number} {pokemon.name.toUpperCase()}</h2>
          <p className="modal-url">{pokemon.url}</p>
          <button className="modal-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
}
```

**Conceptos:**
- ✅ Renderizado condicional: `if (!isOpen) return null`
- ✅ Dialog HTML5: elemento modal nativo
- ✅ Props: pokemon, isOpen, onClose callback
- ✅ Estilos: `.modal`, `.modal-content`

---

## ✅ Tarea 7: App.jsx (Estado) ⭐⭐⭐

**Archivo:** `src/App.jsx`

**Objetivo:** Conectar todo con estado.

### Código:

```jsx
// src/App.jsx
import { useState, useEffect } from 'react';
import { usePokeAPI } from './hooks/usePokeAPI';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';
import PokemonModal from './components/PokemonModal';
import './style.css';

export default function App() {
  // Estados
  const { pokemon, loading, error } = usePokeAPI();
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cuando pokemon carga, actualiza filtered
  useEffect(() => {
    setFilteredPokemon(pokemon);
  }, [pokemon]);

  // Manejar búsqueda
  const handleSearch = (query) => {
    if (!query) {
      setFilteredPokemon(pokemon);
    } else {
      const filtered = pokemon.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  // Manejar click en tarjeta
  const handleCardClick = (p) => {
    setSelectedPokemon(p);
    setIsModalOpen(true);
  };

  // Manejar cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />

      {loading && <p className="loading">Cargando Pokémon...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      {!loading && !error && (
        <>
          <p className="count">{filteredPokemon.length} pokémon encontrados</p>
          <PokemonGrid
            pokemon={filteredPokemon}
            onCardClick={handleCardClick}
          />
        </>
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
```

**Conceptos:**
- ✅ 4 useState hooks: filteredPokemon, selectedPokemon, isModalOpen, y el de usePokeAPI
- ✅ useEffect para sincronizar estado
- ✅ handleSearch: filtra el array existente
- ✅ handleCardClick: abre modal
- ✅ Props drilling: pasar datos y callbacks a componentes hijos

---

## ✅ Tarea 8: CSS Styling ⭐⭐

**Archivo:** `src/style.css`

**Objetivo:** Estilo bonito y responsive.

### Código (Básico):

```css
/* src/style.css */

:root {
  --primary: #ff6b6b;
  --secondary: #ffd93d;
  --dark: #2d3436;
  --light: #f5f5f5;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
}

/* HEADER */
.header {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  text-align: center;
}

.header h1 {
  color: var(--dark);
  margin-bottom: 15px;
  font-size: 2.5em;
}

.search-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.search-input {
  padding: 10px 15px;
  border: 2px solid var(--primary);
  border-radius: 5px;
  font-size: 1em;
  width: 300px;
}

.search-input:focus {
  outline: none;
  border-color: var(--secondary);
  box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.2);
}

.search-btn {
  padding: 10px 20px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s;
}

.search-btn:hover {
  background: var(--secondary);
  color: var(--dark);
  transform: scale(1.05);
}

/* GRID */
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* CARD */
.pokemon-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.pokemon-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 12px rgba(0,0,0,0.2);
}

.card-header {
  background: var(--secondary);
  padding: 10px;
  text-align: center;
}

.number {
  font-weight: bold;
  color: var(--dark);
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  min-height: 120px;
  background: linear-gradient(135deg, #f5f5f5 0%, #efefef 100%);
}

.pokemon-card img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.name {
  text-align: center;
  padding: 10px;
  color: var(--dark);
  font-size: 0.9em;
  text-transform: capitalize;
}

/* MODAL */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 20px 25px rgba(0,0,0,0.3);
  z-index: 1000;
  border: none;
}

.modal::backdrop {
  background: rgba(0,0,0,0.7);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: var(--dark);
}

.modal-header {
  text-align: center;
  margin-bottom: 20px;
}

.modal-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.modal-body {
  text-align: center;
}

.modal-body h2 {
  color: var(--primary);
  margin-bottom: 10px;
}

.modal-url {
  color: #888;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.modal-btn {
  padding: 10px 30px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}

.modal-btn:hover {
  background: var(--secondary);
  color: var(--dark);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .pokemon-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
  }

  .search-input {
    width: 100%;
  }

  .header h1 {
    font-size: 1.8em;
  }
}

/* ESTADOS */
.loading, .error, .count {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.loading {
  color: var(--primary);
}

.error {
  color: #e74c3c;
  background: #fadbd8;
}

.count {
  color: var(--dark);
  font-weight: bold;
}
```

---

## ✅ Resumen de Archivos

Después de completar todas las tareas, deberías tener:

```
src/
├── components/
│   ├── Header.jsx ✅
│   ├── PokemonCard.jsx ✅
│   ├── PokemonGrid.jsx ✅
│   └── PokemonModal.jsx ✅
├── hooks/
│   └── usePokeAPI.js ✅
├── App.jsx ✅
├── main.jsx ✅
├── style.css ✅
├── App.css (opcional)
```

---

## 🎯 Checklist de Completitud

- [ ] Tarea 1: npm install y npm run dev funciona
- [ ] Tarea 2: Header con input de búsqueda
- [ ] Tarea 3: usePokeAPI trae 100 pokémon
- [ ] Tarea 4: Grid renderiza pokémon
- [ ] Tarea 5: Card muestra imagen y número
- [ ] Tarea 6: Modal abre al hacer click
- [ ] Tarea 7: App conecta todo
- [ ] Tarea 8: Estilos bellos y responsive

---

## 🚀 ¡Listo!

Cuando termines, tu Pokédex debería:
- ✨ Cargar automáticamente 100 pokémon
- 🔍 Buscar en tiempo real
- 🎨 Verse bonita y responsive
- 📱 Funcionar en móvil

¡Mucho éxito! 🎮
