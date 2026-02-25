# Guía para Implementar Funcionalidades en React

Esta guía está diseñada para personas sin experiencia previa en React. Explicaremos conceptos básicos y cómo implementar diferentes funcionalidades.

---

## 📚 Conceptos Fundamentales

### ¿Qué es React?

React es una librería de JavaScript para construir interfaces de usuario. Piensa en ella como un sistema que:
- **Renderiza** (dibuja) elementos en la pantalla
- **Reacciona** a cambios (de ahí su nombre)
- **Actualiza** automáticamente la pantalla cuando los datos cambian

### Componentes

Un **componente** es una pieza reutilizable de interfaz. Por ejemplo:
- `Header` es el encabezado
- `SearchFilter` es el buscador
- `PolaroidGrid` es la cuadrícula de películas

### JSX

JSX es la sintaxis especial de React que parece HTML pero es JavaScript:

```jsx
// JSX
const titulo = <h1>Mis Películas</h1>;

// Es equivalente a:
const titulo = React.createElement('h1', null, 'Mis Películas');
```

---

## 🎣 useState - Guardando Información

`useState` es un "gancho" (hook) que permite guardar y actualizar información en un componente.

### ¿Para qué sirve?

Imagina que necesitas guardar:
- El texto que el usuario escribe en un campo
- Si un botón está presionado o no
- Qué página está viendo el usuario

### Sintaxis Básica

```jsx
import React, { useState } from 'react';

export default function MiComponente() {
  // Crear una variable de estado
  // 'valor' es el valor actual
  // 'setValor' es la función para cambiar el valor
  // 'inicial' es el valor de inicio
  const [valor, setValor] = useState('inicial');

  return (
    <div>
      <p>El valor es: {valor}</p>
      <button onClick={() => setValor('nuevo')}>Cambiar</button>
    </div>
  );
}
```

### Ejemplo Real: Input de Búsqueda

```jsx
import React, { useState } from 'react';

export default function Buscador() {
  // Guardamos lo que el usuario escribe
  const [consulta, setConsulta] = useState('');

  function manejarCambio(evento) {
    // evento.target.value es el texto que escribió
    setConsulta(evento.target.value);
  }

  return (
    <input
      type="text"
      value={consulta}
      onChange={manejarCambio}
      placeholder="Escribe aquí..."
    />
  );
}
```

### Múltiples Estados en un Componente

```jsx
const [nombre, setNombre] = useState('');
const [edad, setEdad] = useState(0);
const [activo, setActivo] = useState(false);
```

---

## ⚡ useEffect - Ejecutar Código en Momentos Específicos

`useEffect` permite ejecutar código en momentos específicos:
- Cuando el componente aparece en la pantalla
- Cuando algo cambia
- Cuando el componente desaparece

### Sintaxis Básica

```jsx
import React, { useEffect } from 'react';

export default function MiComponente() {
  useEffect(() => {
    // Este código se ejecuta DESPUÉS de que el componente se renderice
    console.log('El componente apareció en pantalla');
  }, []); // El array vacío [] significa "solo ejecutar una vez"

  return <h1>Hola</h1>;
}
```

### Los Tres Escenarios

#### 1. Ejecutar Una Sola Vez (Cargar Datos al Iniciar)

```jsx
import React, { useState, useEffect } from 'react';

export default function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    // Descargar películas cuando el componente aparece
    fetch('https://api.ejemplo.com/peliculas')
      .then(res => res.json())
      .then(datos => setPeliculas(datos));
  }, []); // Array vacío = ejecutar solo al iniciar

  return (
    <ul>
      {peliculas.map(p => <li key={p.id}>{p.titulo}</li>)}
    </ul>
  );
}
```

#### 2. Ejecutar Cuando Algo Cambia

```jsx
import React, { useState, useEffect } from 'react';

export default function FiltroGenero() {
  const [genero, setGenero] = useState('acción');
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    // Ejecutar CADA VEZ que 'genero' cambia
    fetch(`https://api.ejemplo.com/peliculas?genero=${genero}`)
      .then(res => res.json())
      .then(datos => setPeliculas(datos));
  }, [genero]); // [genero] = ejecutar cuando genero cambia

  return (
    <div>
      <select onChange={(e) => setGenero(e.target.value)}>
        <option>acción</option>
        <option>drama</option>
        <option>comedia</option>
      </select>
      {/* mostrar películas */}
    </div>
  );
}
```

#### 3. Limpiar Cuando el Componente Desaparece

```jsx
import React, { useEffect } from 'react';

export default function Timer() {
  useEffect(() => {
    // Ejecutar al aparecer
    const intervalo = setInterval(() => {
      console.log('Tick');
    }, 1000);

    // Limpiar al desaparecer
    return () => clearInterval(intervalo);
  }, []);

  return <h1>Timer activo</h1>;
}
```

---

## 📋 Caso Real: Cargar Películas en la App

Aquí está cómo funciona en nuestra aplicación:

```jsx
import React, { useState, useEffect } from 'react';
import { obtenerPopularesPeliculas, obtenerPopularesSeries } from './services/tmdbService';

export default function App() {
  // 1. Guardar el tipo de contenido (películas o series)
  const [tipo, setTipo] = useState('peliculas');
  
  // 2. Guardar las películas/series que descargamos
  const [items, setItems] = useState([]);
  
  // 3. Guardar si está cargando
  const [cargando, setCargando] = useState(false);

  // 4. Cuando cambia el tipo O al inicio, descargar películas
  useEffect(() => {
    const descargar = async () => {
      setCargando(true);
      
      // Elegir qué descargar según el tipo
      const respuesta = tipo === 'peliculas' 
        ? await obtenerPopularesPeliculas(1)
        : await obtenerPopularesSeries(1);
      
      // Guardar las películas descargadas
      if (respuesta?.results) {
        setItems(respuesta.results);
      }
      
      setCargando(false);
    };
    
    descargar();
  }, [tipo]); // Ejecutar cuando 'tipo' cambia

  return (
    <div>
      <button onClick={() => setTipo('peliculas')}>Películas</button>
      <button onClick={() => setTipo('series')}>Series</button>
      
      {cargando ? <p>Cargando...</p> : <PeliculasGrid items={items} />}
    </div>
  );
}
```

### Paso a Paso:
1. El usuarios hace clic en "Series"
2. `setTipo('series')` actualiza el estado
3. React detecta el cambio
4. `useEffect` se ejecuta porque `tipo` cambió
5. Se descarga de la API
6. `setItems(...)` actualiza las películas
7. React renderiza de nuevo con las nuevas películas

---

## 🔍 Filtros con useEffect

### Ejemplo: Filtrar por Rating Mínimo

```jsx
export default function FiltroRating() {
  const [rating, setRating] = useState(0);
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    // Descargar películas con el rating mínimo
    fetch(`https://api.ejemplo.com/peliculas?minRating=${rating}`)
      .then(res => res.json())
      .then(datos => setPeliculas(datos));
  }, [rating]); // Ejecutar cuando rating cambia

  return (
    <div>
      <select onChange={(e) => setRating(e.target.value)}>
        <option value="0">Todas</option>
        <option value="5">Mayor a 5</option>
        <option value="7">Mayor a 7</option>
      </select>

      <ul>
        {peliculas.map(p => (
          <li key={p.id}>{p.titulo} - {p.rating}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Ejemplo: Búsqueda + Filtro

```jsx
export default function BuscadorAvanzado() {
  const [busqueda, setBusqueda] = useState('');
  const [genero, setGenero] = useState('');
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Descargar cuando cambien busqueda O genero
    const url = new URL('https://api.ejemplo.com/peliculas');
    if (busqueda) url.searchParams.append('q', busqueda);
    if (genero) url.searchParams.append('genero', genero);

    fetch(url)
      .then(res => res.json())
      .then(datos => setResultados(datos));
  }, [busqueda, genero]); // Ejecutar cuando cualquiera cambia

  return (
    <div>
      <input
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar..."
      />
      <select onChange={(e) => setGenero(e.target.value)}>
        <option>Todos</option>
        <option>Acción</option>
        <option>Drama</option>
      </select>

      {resultados.map(p => <div key={p.id}>{p.titulo}</div>)}
    </div>
  );
}
```

---

## 🎯 Funcionalidades Comunes - Cómo Implementarlas

### 1. Cargar Modal con Detalles

```jsx
export default function App() {
  const [modalAbierta, setModalAbierta] = useState(false);
  const [detalles, setDetalles] = useState(null);

  const abrirModal = async (peliculaId) => {
    // Descargar detalles
    const respuesta = await fetch(`/api/peliculas/${peliculaId}`);
    const datos = await respuesta.json();
    
    // Guardar y abrir
    setDetalles(datos);
    setModalAbierta(true);
  };

  return (
    <div>
      <button onClick={() => abrirModal(123)}>Ver detalles</button>
      
      {modalAbierta && (
        <Modal onClose={() => setModalAbierta(false)}>
          <h2>{detalles.titulo}</h2>
          <p>{detalles.descripcion}</p>
        </Modal>
      )}
    </div>
  );
}
```

### 2. Paginación

```jsx
export default function PaginasPeliculas() {
  const [pagina, setPagina] = useState(1);
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    // Descargar con el número de página
    fetch(`/api/peliculas?page=${pagina}`)
      .then(res => res.json())
      .then(datos => setPeliculas(datos));
  }, [pagina]);

  return (
    <div>
      {peliculas.map(p => <div key={p.id}>{p.titulo}</div>)}
      
      <button onClick={() => setPagina(pagina - 1)}>Anterior</button>
      <span>Página {pagina}</span>
      <button onClick={() => setPagina(pagina + 1)}>Siguiente</button>
    </div>
  );
}
```

### 3. Infinite Scroll (Cargar Más)

```jsx
import { useEffect, useRef } from 'react';

export default function InfiniteScroll() {
  const [peliculas, setPeliculas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const observadorRef = useRef(null);

  useEffect(() => {
    // Detectar cuando llegamos al final
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPagina(p => p + 1); // Cargar siguiente página
      }
    });

    if (observadorRef.current) {
      observer.observe(observadorRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Cargar películas de la página actual
    fetch(`/api/peliculas?page=${pagina}`)
      .then(res => res.json())
      .then(datos => {
        setPeliculas(p => [...p, ...datos]); // Agregar al final
      });
  }, [pagina]);

  return (
    <div>
      {peliculas.map(p => <div key={p.id}>{p.titulo}</div>)}
      
      {/* Elemento centinela para detectar scroll */}
      <div ref={observadorRef} style={{ height: '2px' }}></div>
    </div>
  );
}
```

### 4. Guardar Favoritos en LocalStorage

```jsx
export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const guardados = localStorage.getItem('favoritos');
    if (guardados) {
      setFavoritos(JSON.parse(guardados));
    }
  }, []);

  // Guardar favoritos cuando cambian
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarFavorito = (pelicula) => {
    setFavoritos([...favoritos, pelicula]);
  };

  return (
    <div>
      <button onClick={() => agregarFavorito({ id: 1, titulo: 'Avatar' })}>
        Agregar Favorito
      </button>
      {favoritos.map(p => <div key={p.id}>{p.titulo}</div>)}
    </div>
  );
}
```

---

## 🚀 Pasos para Agregar una Nueva Funcionalidad

1. **Identificar el estado necesario**
   - ¿Qué información necesitas guardar?
   - Usa `useState` para cada dato

2. **Agregar useEffect si necesitas hacer peticiones**
   - ¿Necesitas descargar datos de la API?
   - ¿O ejecutar algo cuando algo cambie?

3. **Conectar en el componente**
   - Muestra el estado en el JSX
   - Conecta botones y inputs con `setEstado`

4. **Pasar props a componentes hijos**
   - Si otros componentes necesitan los datos, pásalos como props

Ejemplo:

```jsx
// Paso 1: Estado
const [favoritos, setFavoritos] = useState([]);

// Paso 2: useEffect (si necesitas cargar algo)
useEffect(() => {
  // cargar favoritos
}, []);

// Paso 3 y 4: Pasar a componentes hijos
<MiComponente favoritos={favoritos} alAgregar={setFavoritos} />
```

---

## 📖 Resumen Rápido

| Concepto | Para Qué | Sintaxis |
|----------|----------|---------|
| **useState** | Guardar datos | `const [valor, setValor] = useState(inicial)` |
| **useEffect** (sin deps) | Ejecutar al cargar | `useEffect(() => {}, [])` |
| **useEffect** (con deps) | Ejecutar cuando algo cambia | `useEffect(() => {}, [variable])` |
| **Props** | Pasar datos a componentes | `<Hijo dato={valor} />` |
| **onClick** | Detectar clicks | `<button onClick={() => hacer()}>` |
| **onChange** | Detectar cambios en inputs | `<input onChange={(e) => setValor(e.target.value)} />` |

---

## 💡 Tips Importantes

✅ **DO:**
- Usa nombres claros para tus estados: `const [usuarioActual, setUsuarioActual]`
- Agrupa datos relacionados: `const [usuario, setUsuario] = useState({ nombre: '', email: '' })`
- Siempre incluye el array de dependencias en `useEffect`

❌ **DON'T:**
- No modifiques directamente: ❌ `items[0] = 'nuevo'` → ✅ `setItems([...items])`
- No olvides el array de dependencias: ❌ `useEffect(() => {})` → ✅ `useEffect(() => {}, [tipo])`
- No llames `setEstado` dentro de un return

---

## 🔗 Recursos Adicionales

- [Documentación oficial de React (en español)](https://es.react.dev)
- [React Hooks](https://es.react.dev/reference/react)
- Aprende experimentando: cambia el código, ve qué pasa

¡Practícalo y verás que es más fácil de lo que parece!
