# 📚 Guía de Conceptos React Fundamentales

> Conceptos clave de React para entender la migración

---

## 📋 Tabla de Contenidos

1. [¿Qué es React?](#qué-es-react)
2. [JSX - Sintaxis HTML en JavaScript](#jsx---sintaxis-html-en-javascript)
3. [Componentes](#componentes)
4. [Props - Comunicación entre componentes](#props---comunicación-entre-componentes)
5. [Estado (State) con hooks](#estado-state-con-hooks)
6. [Efectos (Effects) con useEffect](#efectos-effects-con-useeffect)
7. [Renderizado Condicional](#renderizado-condicional)
8. [Listas y Claves](#listas-y-claves)
9. [Manejo de Eventos](#manejo-de-eventos)

---

## ¿Qué es React?

**React** es una librería de JavaScript para construir interfaces de usuario con componentes reutilizables.

### Sin React (Vanilla JavaScript):
```javascript
// Crear elemento
const div = document.createElement('div');
div.id = 'app';
div.innerHTML = 'Hola Mundo';

// Agregar al DOM
document.body.appendChild(div);

// Actualizar (complicado)
div.innerHTML = 'Adiós Mundo';
```

### Con React:
```jsx
function App() {
  return <div id="app">Hola Mundo</div>;
}
```

**Ventajas:**
- ✅ Código más legible
- ✅ Componentes reutilizables
- ✅ Actualización automática del DOM
- ✅ Mejor rendimiento

---

## JSX - Sintaxis HTML en JavaScript

### ¿Qué es JSX?

JSX permite escribir HTML directamente en JavaScript. Se compila a llamadas de funciones.

### Sintaxis Básica

```jsx
// JSX (lo que escribes)
<div className="box">
  <h1>Título</h1>
</div>

// Se compila a:
React.createElement(
  'div',
  { className: 'box' },
  React.createElement('h1', null, 'Título')
);
```

### Reglas importantes:

| Regla | Ejemplo |
|-------|---------|
| **className** en lugar de class | `<div className="box">` |
| **htmlFor** en lugar de for | `<label htmlFor="input">` |
| camelCase para atributos | `onClick`, `onChange` |
| Auto close para etiquetas vacías | `<img />` |
| Expresiones entre `{}` | `<p>{variable}</p>` |

### Ejemplos:

```jsx
// ✅ Correcto
<div className="container">
  <img src={imagePath} />
  <button onClick={handleClick}>Clic</button>
  <p>Valor: {count}</p>
</div>

// ❌ Incorrecto
<div class="container">          {/* ← class en lugar de className */}
  <img src=imagePath>             {/* ← Falta comillas */}
  <button onclick=handleClick>    {/* ← onclick en lugar de onClick */}
  <p>Valor: {count}</p
</div>
```

---

## Componentes

Un **componente** es una función que retorna JSX.

### Componente Funcional Básico

```jsx
function Greeting() {
  return <h1>¡Hola!</h1>;
}

// Usar el componente
function App() {
  return <Greeting />;
}
```

### Componentes con lógica

```jsx
function Counter() {
  const count = 0;
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button>Incrementar</button>
    </div>
  );
}
```

### Convenciones de nombres

```jsx
// ✅ Correcto - PascalCase
function PokemonCard() { }
function Header() { }

// ❌ Incorrecto - camelCase
function pokemonCard() { }
function header() { }
```

### Estructura de componentes

```jsx
// src/components/PokemonCard.jsx

/**
 * Componente para mostrar una tarjeta de Pokémon
 * @param {Object} pokemon - Datos del Pokémon
 * @param {Function} onClick - Callback al hacer click
 */
function PokemonCard({ pokemon, onClick }) {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </div>
  );
}

export default PokemonCard;
```

---

## Props - Comunicación entre componentes

**Props** son argumentos que pasas a los componentes (como parámetros de función).

### Props básicas

```jsx
// Componente que recibe props
function Greeting({ name, age }) {
  return (
    <div>
      <p>Nombre: {name}</p>
      <p>Edad: {age}</p>
    </div>
  );
}

// Usar el componente
<Greeting name="Juan" age={25} />
<Greeting name="María" age={30} />
```

### Props con tipos complejos

```jsx
// Recibir un objeto
function UserCard({ user }) {
  return <p>{user.name} - {user.email}</p>;
}

<UserCard user={{ name: 'Juan', email: 'juan@example.com' }} />

// Recibir funciones (callbacks)
function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

<Button onClick={() => alert('Clic!')} label="Presióname" />

// Recibir listas
function List({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

<List items={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]} />
```

### Props por defecto

```jsx
function Greeting({ name = 'Visitante' }) {
  return <h1>¡Hola, {name}!</h1>;
}

<Greeting />            {/* Muestra "¡Hola, Visitante!" */}
<Greeting name="Juan" /> {/* Muestra "¡Hola, Juan!" */}
```

### Desestructuración avanzada

```jsx
// En lugar de:
function Card(props) {
  return <h1>{props.title}</h1>;
}

// Mejor:
function Card({ title, description }) {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}
```

---

## Estado (State) con hooks

**Estado** es datos que cambian en un componente y disparan re-renders.

### Hook `useState`

```jsx
import { useState } from 'react';

function Counter() {
  // Estado: [valor actual, función para actualizar]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

**¿Cómo funciona?**

```jsx
const [count, setCount] = useState(0);
//    ↑ Valor actual    ↑ Función para actualizar   ↑ Valor inicial
```

1. `count` es el valor actual del estado (inicialmente 0)
2. `setCount()` es la función para actualizar el estado
3. Cuando llamamos `setCount()`, React re-renderiza el componente

### Ejemplos de estado

```jsx
// Contador
const [count, setCount] = useState(0);

// Texto
const [name, setName] = useState('');

// Booleano
const [isOpen, setIsOpen] = useState(false);

// Objeto
const [user, setUser] = useState({ name: '', email: '' });

// Array
const [pokemon, setPokemon] = useState([]);
```

### Actualizar estado correctamente

```jsx
// Array: Agregar elemento
const [items, setItems] = useState([]);
setItems([...items, newItem]); // ✅ Crear nuevo array
// setItems.push(newItem);      // ❌ Mutación directa

// Objeto: Actualizar propiedad
const [user, setUser] = useState({ name: 'Juan', age: 25 });
setUser({ ...user, age: 26 }); // ✅ Crear nuevo objeto
// user.age = 26;               // ❌ Mutación directa

// Número: Incrementar
const [count, setCount] = useState(0);
setCount(count + 1); // ✅ Nuevo valor
// count++;           // ❌ Mutación directa
```

### Estado en formularios

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}
```

---

## Efectos (Effects) con useEffect

**useEffect** ejecuta código después de que el componente se renderice (para operaciones que no son renderizado, como fetches).

### Sintaxis básica

```jsx
import { useEffect, useState } from 'react';

function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Este código se ejecuta DESPUÉS del render
    console.log('Componente renderizado');
    
    // Fetch data
    fetchData().then(setData);
  }, []); // Arreglo de dependencias

  return <div>{data}</div>;
}
```

### Arreglo de dependencias

El segundo argumento controla cuándo se ejecuta el efecto:

```jsx
// Sin dependencias: Se ejecuta después de CADA render
useEffect(() => {
  console.log('Se ejecuta después de cada render');
});

// Con arreglo vacío: Se ejecuta UNA SOLA VEZ (al montar componente)
useEffect(() => {
  console.log('Se ejecuta solo al montar');
}, []);

// Con dependencias: Se ejecuta cuando las dependencias cambian
useEffect(() => {
  console.log('Se ejecuta cuando count cambia');
}, [count]); // ← Solo cuenta

// Múltiples dependencias
useEffect(() => {
  console.log('Se ejecuta cuando count o name cambian');
}, [count, name]);
```

### Ejemplo real: Fetching de datos

```jsx
function PokemonList({ page }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/pokemon?page=${page}`);
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon(); // Llamar función async
  }, [page]); // Re-ejecutar when page cambia

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {pokemon.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

### Limpiar efectos (cleanup)

Algunos efectos necesitan limpieza (desuscribirse, cancelar requests, etc.):

```jsx
useEffect(() => {
  // Suscribirse
  const listener = (e) => console.log('Click:', e);
  window.addEventListener('click', listener);

  // Limpiar al desmontar
  return () => {
    window.removeEventListener('click', listener);
  };
}, []); // Solo se monta una vez
```

---

## Renderizado Condicional

Mostrar/ocultar elementos basado en condiciones.

### Operador ternario

```jsx
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Cerrar sesión</button>
      ) : (
        <button>Iniciar sesión</button>
      )}
    </div>
  );
}
```

### Operador lógico `&&`

```jsx
function UserGreeting({ user }) {
  return (
    // Solo muestra si user existe
    {user && <p>¡Bienvenido, {user.name}!</p>}
  );
}

<UserGreeting user={null} />        {/* No muestra nada */}
<UserGreeting user={{ name: 'Juan' }} /> {/* Muestra saludo */}
```

### Renderizado condicional complejo

```jsx
function Component({ status }) {
  if (status === 'loading') {
    return <p>Cargando...</p>;
  }
  
  if (status === 'error') {
    return <p>Ocurrió un error</p>;
  }

  return <p>Contenido cargado</p>;
}
```

### Clases condicionales

```jsx
function Button({ isActive, onClick }) {
  return (
    <button 
      className={`btn ${isActive ? 'btn-active' : 'btn-inactive'}`}
      onClick={onClick}
    >
      Presióname
    </button>
  );
}
```

---

## Listas y Claves

Renderizar listas con `.map()`:

```jsx
function PokemonList({ pokemon }) {
  return (
    <ul>
      {pokemon.map(poke => (
        <li key={poke.id}>{poke.name}</li>
      ))}
    </ul>
  );
}
```

### ¿Por qué necesitamos `key`?

`key` ayuda a React a identificar qué elementos han cambiado:

```jsx
// ✅ Correcto: ID único
{items.map(item => <Item key={item.id} item={item} />)}

// ⚠️ Evitar: Indice (aunque funciona)
{items.map((item, index) => <Item key={index} item={item} />)}

// ❌ Incorrecto: No poner key
{items.map(item => <Item item={item} />)} // Warning de React
```

---

## Manejo de Eventos

Reaccionar a acciones del usuario.

### Eventos comunes

```jsx
function Form() {
  const handleClick = () => alert('¡Clic!');
  const handleChange = (e) => console.log(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <>
      <button onClick={handleClick}>Click</button>
      <input onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
```

### Event Synthetic vs Native Event

React usa **Synthetic Events**, que funcionan igual pero son normalizados:

```jsx
function Input() {
  const handleChange = (e) => {
    // e es un SyntheticEvent (normalizado por React)
    console.log(e.target.value); // Funciona igual
  };

  return <input onChange={handleChange} />;
}
```

### Pasar parámetros a handlers

```jsx
function List({ items }) {
  const handleDelete = (id) => {
    console.log('Eliminar item:', id);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          {/* Pasar parámetro con flecha anónima */}
          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🎓 Ejemplo Completo: Pokédex Mini

```jsx
import { useState, useEffect } from 'react';

function PokemonSearch() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Efecto: Carga datos cuando searchTerm cambia
  useEffect(() => {
    if (!searchTerm) return; // No buscar si es vacío

    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
        );
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const data = await response.json();
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map(t => t.type.name)
        });
      } catch (err) {
        setError(err.message);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [searchTerm]); // Re-ejecutar cuando searchTerm cambia

  return (
    <div>
      <h1>Buscar Pokémon</h1>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Escriba nombre del Pokémon"
      />

      {loading && <p>Cargando...</p>}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.image} alt={pokemon.name} />
          <p>Tipos: {pokemon.types.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;
```

---

## 📚 Resumen Rápido

| Concepto | Qué es | Ejemplo |
|----------|--------|---------|
| **JSX** | HTML en JS | `<div className="box">{variable}</div>` |
| **Componente** | Función que retorna JSX | `function Card() { return <div>...</div>; }` |
| **Props** | Parámetros del componente | `<Card title="Mi Card" />` |
| **State** | Datos que cambian | `const [count, setCount] = useState(0)` |
| **useEffect** | Efectos después del render | `useEffect(() => {...}, [])` |
| **Renderizado Condicional** | Mostrar/ocultar | `{condition && <p>...</p>}` |
| **Listas** | Renderizar arrays | `{items.map(item => <li key={item.id}>{item}</li>)}` |
| **Eventos** | Reaccionar a clicks | `<button onClick={() => ...}>` |

---

## 📖 Recursos Externos

- [React Official Docs](https://react.dev)
- [React Hooks API Reference](https://react.dev/reference/react/hooks)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)

---

**¡Ahora estás listo para migrar la Pokédex a React! 🚀**
