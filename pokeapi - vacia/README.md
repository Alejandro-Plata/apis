# 📱 Pokédex - Migración a React

> Migración de un proyecto Vanilla JavaScript HTML/CSS a **React 18** con Vite

---

## 🎯 Objetivo

Transformar la Pokédex de una aplicación Vanilla JS (basada en HTML/CSS) a una aplicación React moderna, aprendiendo:

- ✅ Componentes React funcionales
- ✅ Estado con hooks (useState, useEffect)
- ✅ Consumo de APIs (PokeAPI)
- ✅ Gestión de componentes 
- ✅ Renderizado condicional
- ✅ Props y composición

---

## 📦 Stack Tecnológico

```json
{
  "frontend": "React 18 + Vite",
  "styling": "CSS3 (Vanilla CSS)",
  "api": "PokeAPI (https://pokeapi.co/api/v2/)",
  "packageManager": "npm"
}
```

---

## 🚀 Inicio Rápido

### 1. Instalación de dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 3. Build para producción
```bash
npm build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
pokeapi - vacia/
├── index.html              # Plantilla HTML
├── package.json            # Dependencias del proyecto
├── vite.config.js          # Configuración Vite
├── src/
│   ├── App.jsx             # Componente raíz
│   ├── main.jsx            # Punto de entrada React
│   ├── style.css           # Estilos globales
│   ├── components/         # Componentes React
│   │   ├── Header.jsx      # Encabezado + búsqueda
│   │   ├── PokemonGrid.jsx # Grid de Pokémon
│   │   ├── PokemonCard.jsx # Tarjeta individual
│   │   ├── Modal.jsx       # Modal de detalles
│   │   └── Pagination.jsx  # Controles de paginación
│   ├── hooks/              # Custom hooks
│   │   └── usePokeAPI.js   # Hook para PokeAPI
│   └── services/           # Servicios (APIs)
│       └── pokemonService.js # Llamadas a PokeAPI
```

---

## 🔄 Guía de Migración: De Vanilla JS a React

### Paso 1: Entender la Estructura Original

**Archivo original:** `pokeapi - original/`
- HTML estático en `index.html`
- Lógica en Vanilla JS (`app.js`, `pokemonService.js`)
- Estilos en `style.css`

### Paso 2: Conceptos Clave

| Concepto | Vanilla JS | React |
|----------|-----------|-------|
| **DOM** | `document.getElementById()` | Automático (Virtual DOM) |
| **Eventos** | `.addEventListener()` | `onClick={handler}` |
| **Estado** | Variables globales | `useState()` hook |
| **Efectos** | Código directo | `useEffect()` hook |
| **Reutilización** | Funciones | Componentes |

### Paso 3: Migración de Componentes

#### Antes (Vanilla JS):
```html
<!-- HTML -->
<div class="pokemon-grid" id="pokedex"></div>

<div id="pokemon-modal" class="modal-overlay">
  <img src="" alt="Pokemon" id="modal-img">
  <h2 id="modal-name"></h2>
</div>
```

```javascript
// JavaScript
const modal = document.getElementById('pokemon-modal');
const pokedex = document.getElementById('pokedex');

pokedex.innerHTML = pokemonHTML;
modal.style.display = 'block';
```

#### Después (React):
```jsx
// Componente
function PokemonModal({ pokemon, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
      </div>
    </div>
  );
}

// Uso en App.jsx
<PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
```

### Paso 4: Conversión de Lógica (estado y efectos)

#### Antes (Vanilla JS):
```javascript
const state = {
  currentPage: 1,
  currentPokemon: [],
  selectedPokemon: null,
  isLoading: false
};

function init() {
  loadPage(1);
  setupEventListeners();
}

function loadPage(page) {
  state.isLoading = true;
  fetchPokemon(page).then(data => {
    state.currentPokemon = data;
    renderPokemon();
  });
}

init();
```

#### Después (React):
```jsx
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchPokemon(currentPage).then(data => {
      setPokemon(data);
      setIsLoading(false);
    });
  }, [currentPage]);

  return (
    <div>
      <Header />
      <PokemonGrid pokemon={pokemon} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
```

---

## 📚 Guías de Aprendizaje

Consulta los siguientes documentos para profundizar:

- [GUIA_REACT.md](GUIA_REACT.md) - Conceptos fundamentales de React
- [API_GUIDE.md](API_GUIDE.md) - Cómo consumir PokeAPI *(si existe)*
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Pasos detallados de migración *(si existe)*

---

## 🎮 Componentes a Implementar

### 1. **Header** (Búsqueda)
- Input para buscar Pokémon
- Botón de búsqueda

### 2. **PokemonGrid** (Lista)
- Grid responsivo
- Renderiza múltiples PokemonCard

### 3. **PokemonCard** (Tarjeta)
- Imagen del Pokémon
- Número Pokédex
- Nombre
- Tipos
- Click para abrir modal

### 4. **Modal** (Detalles)
- Información completa del Pokémon
- Estadísticas
- Botón cerrar

### 5. **Pagination** (Paginación)
- Botones anterior/siguiente
- Números de página

---

## 🪝 Custom Hook: usePokeAPI

Crear un hook personalizado para centralizar la lógica de consumo de API:

```javascript
// hooks/usePokeAPI.js
function usePokeAPI(page, searchQuery) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Lógica de fetch aquí
  }, [page, searchQuery]);

  return { pokemon, loading, error };
}
```

---

## 🔌 Servicio de API

```javascript
// services/pokemonService.js

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_PER_PAGE = 20;

export async function getPokemonPage(page) {
  const offset = (page - 1) * POKEMON_PER_PAGE;
  const response = await fetch(`${API_URL}?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
  return response.json();
}

export async function getPokemonDetails(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}
```

---

## 📝 Tareas de Migración

### ✅ Tarea 1: Crear estructura React básica
- [ ] Inicializar `src/App.jsx`
- [ ] Crear `main.jsx`
- [ ] Importar estilos en `main.jsx`

### ✅ Tarea 2: Migrar componentes estáticos
- [ ] Crear componente `Header.jsx`
- [ ] Crear componente `PokemonGrid.jsx`
- [ ] Crear componente `PokemonCard.jsx`

### ✅ Tarea 3: Implementar estado
- [ ] `useState` para Pokémon
- [ ] `useState` para página actual
- [ ] `useState` para Pokémon seleccionado

### ✅ Tarea 4: Conectar API
- [ ] Crear `services/pokemonService.js`
- [ ] Usar `useEffect` para cargar datos
- [ ] Mostrar lista de Pokémon

### ✅ Tarea 5: Implementar búsqueda
- [ ] Input de búsqueda en Header
- [ ] Filtrar Pokémon por nombre

### ✅ Tarea 6: Modal de detalles
- [ ] Crear componente `Modal.jsx`
- [ ] Click en tarjeta abre modal
- [ ] Mostrar detalles del Pokémon

### ✅ Tarea 7: Paginación
- [ ] Crear componente `Pagination.jsx`
- [ ] Botones anterior/siguiente
- [ ] Números de página

### ✅ Tarea 8: Pulir y optimizar
- [ ] Estados de carga (loading)
- [ ] Manejo de errores
- [ ] Animaciones y estilos
- [ ] Responsive design

---

## 🐛 Debugging y Solución de Problemas

### Problema: "Import.meta.env is not defined"
**Solución:** Confirmar que Vite está correctamente configurado en `vite.config.js`

### Problema: "Cannot read property 'map' of undefined"
**Solución:** Usar condicional antes de mappear
```jsx
{pokemon && pokemon.length > 0 ? (
  pokemon.map(p => <PokemonCard key={p.id} pokemon={p} />)
) : (
  <p>Cargando...</p>
)}
```

### Problema: Múltiples renders innecesarios
**Solución:** Asegurarse de que `useEffect` tiene las dependencias correctas
```jsx
useEffect(() => {
  // Este code se ejecuta solo cuando 'page' cambia
}, [page]); // ← Las dependencias son importantes
```

---

## 📖 Referencias

- [React Oficial - Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [PokeAPI Documentation](https://pokeapi.co)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 🎬 Próximos Pasos

1. ✅ Revisar este README (5 min)
2. ✅ Leer GUIA_REACT.md si es necesario (15 min)
3. ✅ Implementar componentes una por una (2-3 horas)
4. ✅ Probar en navegador con `npm run dev`

**¡Eso es todo! Feliz migración a React 🚀**
