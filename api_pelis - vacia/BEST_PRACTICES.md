# ⭐ Mejores Prácticas React - Consejos de Experto

A medida que construyes tu aplicación, sigue estas prácticas para escribir código limpio y profesional.

---

## 📝 Convenciones de nombres

### Componentes
- Siempre en **PascalCase** (primera letra mayúscula)
- Nombres descriptivos

```javascript
// ✅ BIEN
function SearchFilter() { ... }
function PolaroidCard() { ... }
function DetailModal() { ... }

// ❌ MAL
function searchFilter() { ... }
function Card() { ... }
function modal() { ... }
```

### Variables y funciones
- En **camelCase** (primera palabra minúscula)
- Nombres claros

```javascript
// ✅ BIEN
const [peliculas, setPeliculas] = useState([]);
const buscarPeliculas = () => { ... };
const manejarBuscar = (e) => { ... };

// ❌ MAL
const [p, setP] = useState([]);
const search = () => { ... };
const handle = (e) => { ... };
```

---

## 🎯 Pasar props correctamente

### Props simples
```javascript
// ✅ BIEN - Props claros y enfocados
<PolaroidCard item={pelicula} onSelected={setSeleccionada} />

// ❌ MAL - Pasar muchos props
<PolaroidCard pelicula={pelicula} titulo={pelicula.title} rating={pelicula.rating} ... />
```

### Desestructuración
```javascript
// ✅ BIEN - Clara y legible
export default function PolaroidCard({ item, onSelected }) {
  return <div>{item.title}</div>;
}

// ❌ MAL - Confuso
export default function PolaroidCard(props) {
  return <div>{props.item.title}</div>;
}
```

---

## 🔄 Orden dentro de un componente

```javascript
import React, { useState, useEffect } from 'react';

export default function MiComponente({ prop1, prop2 }) {
  // 1. Imports y jerarquía de componentes hijo
  
  // 2. Estados
  const [estado1, setEstado1] = useState('');
  const [estado2, setEstado2] = useState([]);
  
  // 3. Refs (si necesitas)
  const dialogRef = useRef(null);
  
  // 4. Effects
  useEffect(() => {
    // Código
  }, []);
  
  // 5. Funciones
  const manejarClick = () => { ... };
  const procesar = (datos) => { ... };
  
  // 6. Renderizado (return)
  return (
    <div>
      {/* JSX aquí */}
    </div>
  );
}
```

---

## 🎨 Estructura de JSX

### Indentación
```jsx
// ✅ BIEN - Fácil de leer
return (
  <div className="container">
    <header>
      <h1>Título</h1>
    </header>
    <main>
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </main>
  </div>
);

// ❌ MAL - Desorden
return (<div className="container"><header><h1>Título</h1></header></div>);
```

### Atributos con múltiples props
```jsx
// ✅ BIEN - Cada prop en su línea
<PolaroidCard
  key={item.id}
  item={item}
  onSelected={handleSelect}
  isActive={active}
/>

// ❌ MAL - Todo en una línea
<PolaroidCard key={item.id} item={item} onSelected={handleSelect} isActive={active} />
```

---

## 🛡️ Manejo de errores

### Try-catch
```javascript
// ✅ BIEN
const buscarPeliculas = async (consulta) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    setPeliculas(datos.results);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    setError(error.message);
  }
};
```

### Validaciones
```javascript
// ✅ BIEN - Validar antes de usar
const manejarBuscar = (e) => {
  e.preventDefault();
  if (!consulta.trim()) {
    console.warn('Búsqueda vacía');
    return;
  }
  buscarPeliculas(consulta);
};
```

---

## 🔑 Cuándo usar qué cosa

### useState
- Datos que cambian
- Entrada del usuario
- Respuestas de API

```javascript
const [peliculas, setPeliculas] = useState([]);
const [consulta, setConsulta] = useState('');
const [cargando, setCargando] = useState(false);
```

### useEffect
- Cuando un componente se monta/desmonta
- Cuando un estado cambia y necesitas hacer algo
- Llamadas a APIs iniciales

```javascript
useEffect(() => {
  // Este código corre cuando el componente se monta
  console.log('Componente montado');
  
  return () => {
    // Este código corre cuando el componente se desmonta
    console.log('Componente desmontado');
  };
}, []); // Array vacío = solo al montar
```

### useRef
- Acceso directo al DOM (como `<dialog>`)
- Valores que cambian pero NO disparan re-renderizado
- Guardar valores previos

```javascript
const dialogRef = useRef(null);
useEffect(() => {
  if (abierto) {
    dialogRef.current.showModal();
  }
}, [abierto]);
```

---

## 📊 Estado derivado

**Evita guardar en estado lo que puedes calcular:**

```javascript
// ❌ MAL - Estado redundante
const [peliculas, setPeliculas] = useState([]);
const [count, setCount] = useState(0);

// Luego tienes que actualizar ambos
setPeliculas(datos);
setCount(datos.length);

// ✅ BIEN - Calcular cuando sea necesario
const [peliculas, setPeliculas] = useState([]);
const count = peliculas.length;
```

---

## 🚫 Bugs comunes a evitar

### 1. Modificar el estado directamente

```javascript
// ❌ MAL
peliculas.push(nuevaPelicula);

// ✅ BIEN
setPeliculas([...peliculas, nuevaPelicula]);
```

### 2. Olvidar la tecla 'key' en listas

```javascript
// ❌ MAL
{peliculas.map((p) => <Card item={p} />)}

// ✅ BIEN
{peliculas.map((p) => <Card key={p.id} item={p} />)}
```

### 3. Crear funciones dentro del return

```javascript
// ❌ MAL - Se crea una función nueva cada render
return (
  <button onClick={() => console.log('Click')}>
    Click
  </button>
);

// ✅ BIEN - Función reutilizable
const manejarClick = () => console.log('Click');
return <button onClick={manejarClick}>Click</button>;
```

### 4. Async directamente en useEffect

```javascript
// ❌ MAL
useEffect(async () => {
  const datos = await fetch(url);
}, []);

// ✅ BIEN
useEffect(() => {
  const obtenerDatos = async () => {
    const datos = await fetch(url);
  };
  obtenerDatos();
}, []);
```

---

## 📱 Responsividad

Aunque los estilos ya están listos, recuerda:

```javascript
// ✅ Usa clases CSS flexibles (ya están en style.css)
<div className="polaroid-grid">
  {/* Se adapta automáticamente */}
</div>

// Verifica que en mobile:
// - El texto sea legible
// - Los botones sean clickeables (mínimo 44px)
// - No haya horizontal scroll
```

---

## 🧪 Cómo testear tu código

### Console.log es tu mejor amigo
```javascript
const buscarPeliculas = async (consulta) => {
  console.log('Consultando:', consulta);
  // ... código
  console.log('Películas encontradas:', peliculas.length);
};
```

### Datos estáticos para testear
```javascript
// Al inicio, testea sin API
const [peliculas, setPeliculas] = useState([
  { id: 1, title: 'Test Movie', poster_path: '/...' },
  { id: 2, title: 'Test Movie 2', poster_path: '/...' }
]);

// Una vez funcione, cambia por el fetch real
```

---

## 💪 Patrón recomendado para tu App

```javascript
import { useState } from 'react';

export default function App() {
  // Estados
  const [peliculas, setPeliculas] = useState([]);
  const [tipo, setTipo] = useState('movie');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Funciones
  const buscarPeliculas = async (consulta) => {
    setCargando(true);
    setError('');
    try {
      // Tu lógica de fetch
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      setPeliculas(datos.results);
    } catch (err) {
      setError('Error en la búsqueda');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  // Renderizar
  return (
    <div className="app">
      {error && <p className="error">{error}</p>}
      {cargando && <p>Cargando...</p>}
      {/* Componentes */}
    </div>
  );
}
```

---

## 📚 Recursos para mejorar

- **React Patterns**: https://react.dev/learn
- **Best Practices**: https://react.dev/learn/thinking-in-react
- **Hooks Rules**: https://react.dev/reference/react/rules-of-hooks

---

**Recuerda:** El código limpio es código mantenible. Tómate tiempo para hacer las cosas bien y el futuro tú te lo agradecerá! 💚
