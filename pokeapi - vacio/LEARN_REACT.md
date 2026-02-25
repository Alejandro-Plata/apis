# 📚 Aprender React desde Cero

Una guía completa de los conceptos que necesitas para este proyecto.

## 1. ¿Qué es React?

React es una librería JavaScript que hace que crear interfaces interactivas sea **fácil y rápida**.

### Sin React (Vanilla JS):
```javascript
// Seleccionar elemento
const button = document.getElementById('btn');

// Agregar un listener
button.addEventListener('click', () => {
  const p = document.querySelector('p');
  p.textContent = 'Clickeado!';
});
```

### Con React:
```jsx
function App() {
  const [text, setText] = useState('Clickeado!');

  return (
    <>
      <button onClick={() => setText('Clickeado!')}>
        Click me
      </button>
      <p>{text}</p>
    </>
  );
}
```

React se encarga de actualizar el DOM automáticamente. ✨

---

## 2. Componentes

Un **componente** es una función que retorna HTML (JSX).

### Componente Básico:
```jsx
function Header() {
  return <h1>Bienvenido a Pokédex</h1>;
}
```

### Componente con Contenido:
```jsx
function PokemonCard() {
  return (
    <div className="card">
      <img src="pikachu.png" alt="Pikachu" />
      <h2>Pikachu</h2>
      <p>Eléctrico</p>
    </div>
  );
}
```

**Reglas:**
- El nombre DEBE empezar con mayúscula `Header`, no `header`
- Retorna UNA componente raíz (usa `<>` para envolver múltiples)
- Es una función normal de JavaScript

---

## 3. Props (Parámetros)

Props son cómo pasas datos de padre a hijo.

### Ejemplo:
```jsx
// Componente hijo - recibe props
function Card({ name, image }) {
  return (
    <div>
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </div>
  );
}

// Componente padre - pasa props
function App() {
  return (
    <Card 
      name="Pikachu" 
      image="pikachu.png" 
    />
  );
}
```

**Datos de PokéAPI:**
```javascript
// De PokeAPI recibes esto:
{
  name: "pikachu",
  url: "https://pokeapi.co/api/v2/pokemon/25/"
}

// Tienes que extraer el ID:
const id = pokemon.url.split('/')[6];  // "25"
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
```

---

## 4. State (useState)

State es la "memoria" del componente. Cuando cambia, React re-renderiza.

### Básico:
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);  // Inicial: 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}
```

**Cómo funciona:**
```javascript
const [state, setState] = useState(initialValue);

// state = valor actual
// setState = función para cambiar el estado
// useState = hook que crea el estado
```

### Múltiple State:
```jsx
function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  return (
    <>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => fetchResults(query)}>
        Buscar
      </button>
    </>
  );
}
```

---

## 5. Callbacks (Comunicación Padre → Hijo)

Para que el hijo le hable al padre, usas callbacks.

### Ejemplo:
```jsx
// Padre
function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Buscando:', query);
  };

  return (
    <Header onSearch={handleSearch} />
  );
}

// Hijo
function Header({ onSearch }) {
  return (
    <input
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

**El flujo:**
1. Padre define `handleSearch()`
2. Padre pasa como prop: `onSearch={handleSearch}`
3. Hijo recibe: `function Header({ onSearch })`
4. Hijo llama: `onSearch(e.target.value)`
5. Padre recibe el cambio y actualiza state

---

## 6. useEffect (Side Effects)

`useEffect` se ejecuta después de renderizar. Perfecto para:
- Hacer peticiones API
- Suscribirse a eventos
- Cambiar el título de la página

### Básico:
```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('Component mounted (inicializó)');
  }, []);  // [] = solo una vez al cargar
}
```

### Con Dependencias:
```jsx
function App() {
  const [pokemon, setPokemon] = useState([]);

  // Se ejecuta cuando 'pokemon' cambia
  useEffect(() => {
    console.log('Pokemon actualizado:', pokemon);
  }, [pokemon]);  // Dependency array
}
```

### Fetching API:
```jsx
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => res.json())
      .then(data => {
        setData(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);  // Solo una vez al cargar

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>Datos cargados: {data.length} pokémon</p>;
}
```

---

## 7. Custom Hooks

Un hook es una función que usa otros hooks.

### usePokeAPI (para este proyecto):
```jsx
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

// Uso:
function App() {
  const { pokemon, loading, error } = usePokeAPI();
  
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;
  return <div>{pokemon.length} pokémon</div>;
}
```

**Ventaja:** Reutilizas la lógica en múltiples componentes.

---

## 8. Renderizado Condicional

Mostrar cosas dependiendo del estado.

### If Simple:
```jsx
function Component() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return null;  // No renderizar nada
  }

  return <div>Modal abierto</div>;
}
```

### Operador Ternario:
```jsx
function Component() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <dialog open={isOpen}>
      {isOpen ? <p>Modal abierto</p> : <p>Cerrado</p>}
    </dialog>
  );
}
```

### Operador &&:
```jsx
function Component() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <p>Cargando...</p>}
      {!loading && <p>Listo!</p>}
    </>
  );
}
```

---

## 9. .map() para Listas

Renderizar un array de elementos.

### Básico:
```jsx
function List() {
  const items = ['manzana', 'banana', 'naranja'];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

### Con Objetos:
```jsx
function PokemonList({ pokemon }) {
  return (
    <div className="grid">
      {pokemon.map((p) => (
        <Card 
          key={p.name}  // Siempre unique!
          pokemon={p}
          onClick={() => console.log(p.name)}
        />
      ))}
    </div>
  );
}
```

**⚠️ Importante:**
- Siempre usa `key` único (no `index` si la lista cambia)
- `key` ayuda a React a identificar qué cambió

---

## 10. Componente Dialog

HTML nativo para modales.

```jsx
function Modal({ isOpen, pokemon, onClose }) {
  if (!isOpen || !pokemon) return null;

  return (
    <dialog open>
      <div className="modal-content">
        <h2>{pokemon.name}</h2>
        <p>{pokemon.description}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </dialog>
  );
}
```

**Características:**
- `<dialog open>` - abre el modal
- Estilos CSS para overlay oscuro
- Click en botón cierra

---

## ✅ Check de Aprendizaje

- [ ] Sé qué es un componente y cómo crear uno
- [ ] Entiendo props y cómo pasarlas
- [ ] Puedo usar useState para guardar datos
- [ ] Sé usar useEffect para peticiones
- [ ] Puedo crear custom hooks
- [ ] Entiendo callbacks (padre ← hijo)
- [ ] Puedo renderizar listas con .map()
- [ ] Entiendo renderizado condicional

---

## 🚀 Próximo: Empieza el Proyecto

Ahora que entiendes React, sigue los niveles en `README.md`.

¡Mucho éxito! 🎮
