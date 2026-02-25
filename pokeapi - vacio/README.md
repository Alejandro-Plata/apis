# 🎮 Pokédex Kawaii - Aprende React desde Cero

Crea una **Pokédex interactiva con React** consumiendo la **PokeAPI Real**.

## 🚀 ¿Qué Aprenderás?

✅ **Componentes React** - Dividir la UI en piezas reutilizables  
✅ **Estado con Hooks** - `useState`, `useEffect` para interactividad  
✅ **Props & Callbacks** - Comunicación padre-hijo  
✅ **Peticiones HTTP** - Fetch a PokeAPI en tiempo real  
✅ **Filtrado & Búsqueda** - Arrays y lógica funcional  
✅ **CSS Responsivo** - Diseño bonito y moderno  

---

## 📁 Estructura del Proyecto

```
pokeapi - vacio/
├── README.md               ← Este archivo
├── LEARN_REACT.md          ← Guía de conceptos React
├── API_GUIDE.md            ← Guía de PokeAPI + fetch
├── TASKS.md                ← 8 tareas progresivas
├── src/
│   ├── main.jsx            ← Punto de entrada (llenar)
│   ├── App.jsx             ← Componente principal (llenar)
│   ├── style.css           ← Estilos CSS (llenar)
│   ├── components/         ← Componentes vacíos
│   │   ├── Header.jsx
│   │   ├── PokemonGrid.jsx
│   │   ├── PokemonCard.jsx
│   │   └── PokemonModal.jsx
│   └── hooks/              ← Custom hooks
│       └── usePokeAPI.js   ← Hook para fetch
├── index.html              ← Shell HTML
├── package.json            ← NPM config
├── vite.config.js          ← Build config
└── .gitignore
```

---

## 🎯 Tus Tareas (8 Niveles)

### Nivel 1: Setup Inicial ⭐
- [ ] Crea el proyecto con Vite: `npm create vite@latest . -- --template react`
- [ ] Instala dependencias: `npm install`
- [ ] Copia todos los archivos de esta carpeta
- [ ] Corre: `npm run dev`

**Validar:** Deberías ver la app corriendo en `localhost:5173`

---

### Nivel 2: Header Component ⭐
**Archivo:** `src/components/Header.jsx`

Crea un componente que:
- Recibe `onSearch` como prop (función callback)
- Renderiza: `<input>` y `<button>`
- Al escribir: llama `onSearch(query)`

**Pseudocódigo:**
```jsx
export default function Header({ onSearch }) {
  return (
    <header className="header">
      <h1>Pokédex</h1>
      <input 
        type="text"
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
}
```

---

### Nivel 3: Conectar a PokeAPI ⭐⭐
**Archivo:** `src/hooks/usePokeAPI.js`

Crea un custom hook que:
- Usa `useEffect` para hacer fetch a PokeAPI al cargar
- Retorna: `{ pokemon, loading, error }`
- URL base: `https://pokeapi.co/api/v2/pokemon?limit=100`

**Pseudocódigo:**
```javascript
import { useState, useEffect } from 'react';

export function usePokeAPI() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        setLoading(false);
      })
      .catch(err => setError(err));
  }, []);

  return { pokemon, loading, error };
}
```

---

### Nivel 4: PokemonGrid Component ⭐
**Archivo:** `src/components/PokemonGrid.jsx`

Crea un componente que:
- Recibe array `pokemon` como prop
- Recibe `onCardClick` callback
- Renderiza: `.map()` sobre el array
- Para cada uno, renderiza `<PokemonCard>`

**Pseudocódigo:**
```jsx
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

---

### Nivel 5: PokemonCard Component ⭐
**Archivo:** `src/components/PokemonCard.jsx`

Crea un componente que:
- Recibe `pokemon` y `onClick` props
- Renderiza: imagen, nombre, número
- Al hacer click: llama `onClick()`

**Datos disponibles:**
```javascript
// De PokeAPI:
// {
//   name: "pikachu",
//   url: "https://pokeapi.co/api/v2/pokemon/25/"
// }

// Necesitas extraer el ID de la URL:
const id = pokemon.url.split('/')[6];
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
```

---

### Nivel 6: PokemonModal Component ⭐⭐
**Archivo:** `src/components/PokemonModal.jsx`

Crea un modal que:
- Recibe `pokemon`, `isOpen`, `onClose` props
- Retorna `null` si no está abierto
- Renderiza: `<dialog>` element
- Muestra: imagen grande, nombre, stats

**Pseudocódigo:**
```jsx
export default function PokemonModal({ pokemon, isOpen, onClose }) {
  if (!isOpen || !pokemon) return null;

  const id = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <dialog open className="modal">
      <img src={imageUrl} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <button onClick={onClose}>Cerrar</button>
    </dialog>
  );
}
```

---

### Nivel 7: App.jsx (State Management) ⭐⭐⭐
**Archivo:** `src/App.jsx`

Conecta todo con estado:

```jsx
import { useState, useEffect } from 'react';
import { usePokeAPI } from './hooks/usePokeAPI';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';
import PokemonModal from './components/PokemonModal';
import './App.css';

export default function App() {
  const { pokemon, loading, error } = usePokeAPI();
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFilteredPokemon(pokemon);
  }, [pokemon]);

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

  const handleCardClick = (p) => {
    setSelectedPokemon(p);
    setIsModalOpen(true);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      {loading && <p>Cargando Pokémon...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && (
        <PokemonGrid 
          pokemon={filteredPokemon}
          onCardClick={handleCardClick}
        />
      )}
      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
```

---

### Nivel 8: CSS Styling ⭐⭐
**Archivo:** `src/style.css`

Replica el estilo kawaii:
- Header con buscador
- Grid responsive (3-4 columnas)
- Tarjetas con hover effect
- Modal overlay oscuro
- Colores bonitos

**Inspiración:** Ver `pokeapi/src/style.css` en la carpeta solución

---

## 📚 Guías Complementarias

### `LEARN_REACT.md`
Conceptos React: componentes, props, estado, hooks

### `API_GUIDE.md`
Cómo funciona PokeAPI y cómo hacer fetches

### `TASKS.md`
Descripción detallada de cada tarea con código de ejemplo

---

## ✅ Checklist Final

- [ ] Instalé Vite + React
- [ ] Creo componentes funcionales
- [ ] Paso datos con props
- [ ] Callback padre ← hijo
- [ ] useState para estado local
- [ ] useEffect para fetch
- [ ] Filtro arrays con .filter()
- [ ] Consumo PokeAPI real
- [ ] Grid responsive
- [ ] Modal funcional

---

## 🚀 Después de Terminar

1. **Publicar en Vercel:**
   ```bash
   npm run build
   # Deploy la carpeta 'dist'
   ```

2. **Mejoras Opcionales:**
   - [ ] Paginación (siguientes pokémon)
   - [ ] Ordenar por nombre/tipo
   - [ ] Favoritos en localStorage
   - [ ] Dark mode toggle

3. **Próximo Nivel:**
   - Context API
   - React Router
   - TailwindCSS
   - Testing

---

## 📖 Recursos Útiles

- [React Official Docs](https://react.dev)
- [PokeAPI Documentation](https://pokeapi.co)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Vite Documentation](https://vitejs.dev)

---

## 💬 ¿Atascada?

1. Abre la consola (F12)
2. Busca los errores rojos
3. Compara con `pokeapi/` (la solución)
4. Pide ayuda 🙌

¡Éxito! 🚀
