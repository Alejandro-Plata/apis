# 📚 Guía de Aprendizaje - Hello Cinema

Bienvenido/a al proyecto Hello Cinema. Este es un proyecto especialmente preparado para aprender React desde cero, enfocándose en conceptos clave como **fetch**, **useState**, **props** y **manejo de eventos**.

## 🎯 ¿Qué ya está hecho?

✅ **Estilos CSS** - Todos los estilos visuales están completos  
✅ **Estructura de componentes** - Los componentes existen y están conectados  
✅ **HTML/JSX visual** - Cada componente tiene la estructura visual lista  

❌ **Lo que debes hacer tú:**
- Agregar lógica de JavaScript (estado, funciones, fetch)
- Pasar props entre componentes
- Conectar eventos (onclick, onChange, onSubmit)

---

## 📖 Ruta de aprendizaje (paso a paso)

### Paso 1: Aprende sobre `useState` ⚛️

**Archivo:** `src/App.jsx`

Lo primero es entender cómo manejar estado en React.

**Tareas:**
1. Importa `useState` del paquete 'react'
2. Crea un estado para almacenar un array de películas: `const [peliculas, setPeliculas] = useState([])`
3. Crea un estado para controlar si se está mostrando películas o series: `const [tipo, setTipo] = useState('movies')`
4. Crea un estado para el modal: `const [modalAbierto, setModalAbierto] = useState(false)`
5. Crea un estado para el item seleccionado: `const [itemSeleccionado, setItemSeleccionado] = useState(null)`

---

### Paso 2: Aprende sobre `fetch` 🌐

**Archivo:** `src/App.jsx` o `src/services/tmdbService.js`

Ahora harás tu primera llamada a una API real: The Movie Database (TMDB).
[TMDB API Docs](https`https://developer.themoviedb.org/reference/getting-started`)

---

### Paso 3: Aprende a pasar props 🎁

**Archivos afectados:** Todos los componentes

Las props son como argumentos que pasas a un componente.

**Ejemplos:**

En `App.jsx`:
```jsx
<Navigation tipo={tipo} alCambiarTipo={setTipo} />
<SearchFilter onBuscar={buscarPeliculas} />
<PolaroidGrid peliculas={peliculas} onSeleccionar={setItemSeleccionado} />
```

Luego en cada componente, reciben las props:
```jsx
export default function Navigation({ tipo, alCambiarTipo }) {
  return (
    <button onClick={() => alCambiarTipo('movies')}>
      {tipo === 'movies' ? 'Películas (activo)' : 'Películas'}
    </button>
  );
}
```

---

### Paso 4: Conectar el formulario de búsqueda

**Archivo:** `src/components/SearchFilter.jsx`

1. Importa `useState`
2. Crea un estado para la consulta: `const [consulta, setConsulta] = useState('')`
3. Recibe la prop `onBuscar` del App
4. Crea una función para manejar el submit:
```javascript
const manejarBuscar = (e) => {
  e.preventDefault();
  if (consulta.trim()) {
    onBuscar(consulta);
    setConsulta(''); // Limpiar el input
  }
};
```

5. Conecta el input y button al estado y función

---

### Paso 5: Mostrar las películas en la grilla

**Archivo:** `src/components/PolaroidGrid.jsx`

1. Recibe `peliculas` como prop del App
2. Usa `.map()` para renderizar un `PolaroidCard` por cada película:
```jsx
{peliculas.map((pelicula) => (
  <PolaroidCard 
    key={pelicula.id}
    item={pelicula}
    onSeleccionar={onSeleccionar}
  />
))}
```

---

### Paso 6: Mostrar datos en la tarjeta

**Archivo:** `src/components/PolaroidCard.jsx`

1. Recibe `item` y `onSeleccionar` como props
2. Extrae datos de la película:
   - Título: `item.title`
   - Poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`
   - Rating: `(item.vote_average / 2).toFixed(1)` (de 0-5 estrellas)

3. Muestra los datos en el JSX
4. Agrega un `onClick` para abrir el modal

---

### Paso 7: Implementar el modal de detalles

**Archivo:** `src/components/DetailModal.jsx`

1. Importa `useRef` y `useEffect`
2. Recibe `item`, `abierto` y `onCerrar` como props
3. Usa `useRef` para controlar el elemento `<dialog>`
4. Usa `useEffect` para mostrar/ocultar el modal:
```javascript
useEffect(() => {
  if (abierto && item && dialogRef.current) {
    dialogRef.current.showModal();
  } else if (!abierto && dialogRef.current) {
    dialogRef.current.close();
  }
}, [abierto, item]);
```

5. Muestra la información del item

---

### Paso 8: Filtrar y ordenar (Opcional - Avanzado)

**Archivos:** `src/components/SearchFilter.jsx` y `src/App.jsx`

Crea estados adicionales en App para los filtros y pasélos a SearchFilter. Luego modifica la URL del fetch para incluir los parámetros de ordenamiento.

---

## 🔗 Enlaces útiles

- **TMDB API Docs:** https://developer.themoviedb.org/docs
- **React Docs - useState:** https://react.dev/reference/react/useState
- **React Docs - useEffect:** https://react.dev/reference/react/useEffect
- **Fetch API:** https://developer.mozilla.org/es/docs/Web/API/Fetch_API
- **Array.map():** https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map

---

## 💡 Notas importantes

- No tengas miedo de leer los mensajes de error en la consola (F12) - ¡Son tus amigos!
- Usa `console.log()` para ver qué datos estás recibiendo
- Empieza pequeño: primero haz funcionar la búsqueda, luego el resto
- Los estilos ya están listos, solo enfócate en la lógica

---

## 🚀 Consejos finales

1. **Antes de escribir código**, lee el archivo y entiende su estructura
2. **Prueba cada paso** antes de pasar al siguiente
3. **Si algo no funciona**, mira la consola (devtools)
4. **Modifica poco a poco** - no intentes todo de una vez
5. **¡Experimenta!** - Cambiar cosas es la mejor forma de aprender

---

¡Mucho ánimo! 💪 Si tienes dudas, la solución está en el historial de git. ¡A por ello!
