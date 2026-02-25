# 🎬 Hello Cinema - Proyecto de Aprendizaje React

**Aprende React desde cero** construyendo una aplicación real de búsqueda de películas y series.

---

## 📚 ¿Qué es este proyecto?

Este es un proyecto especialmente diseñado para aprender React mientras construyes algo bonito y funcional. Los estilos y la estructura visual ya están listos, **tú harás la lógica**.

### ✅ Lo que YA está hecho:
- 🎨 Todos los estilos CSS
- 🏗️ Estructura de componentes React
- 🎭 HTML/JSX para la interfaz visual

### ❌ Lo que TÚ harás:
- 📦 Agregar estado con `useState`
- 🌐 Hacer fetch a la API de TMDB
- 🔄 Pasar props entre componentes
- 🎯 Conectar eventos (onclick, onChange, onSubmit)
- 🧠 Aprender a pensar como un desarrollador React

---

## 🚀 Empezar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar en desarrollo

```bash
npm run dev
```

La app se abrirá en `http://localhost:5173`

---

## 📖 Rutas de aprendizaje

**Antes de empezar, lee uno de estos archivos:**

📚 **[GUIA_APRENDIZAJE.md](./GUIA_APRENDIZAJE.md)** - Guía paso a paso sobre qué hacer  
💡 **[EJEMPLOS_CODIGO.md](./EJEMPLOS_CODIGO.md)** - Ejemplos de código para consultar

### Orden recomendado de aprendizaje:

1. **useState** - Aprende a manejar estado
2. **fetch** - Conecta a la API de TMDB
3. **Props** - Pasa datos entre componentes
4. **Eventos** - Conecta formularios y botones
5. **useEffect** - Ejecuta código cuando componentes se cargan

---

## 📋 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Encabezado 
│   ├── Navigation.jsx      # Botones películas/series
│   ├── SearchFilter.jsx    # Formulario búsqueda ← EMPIEZA AQUÍ
│   ├── PolaroidGrid.jsx    # Grilla de películas
│   ├── PolaroidCard.jsx    # Tarjeta individual
│   ├── DetailModal.jsx     # Modal de detalles
│   └── EpisodesList.jsx    # Lista de episodios (extra)
├── services/
│   └── tmdbService.js      # Funciones fetch
├── App.jsx                 # PUNTO PRINCIPAL
├── main.jsx                # Entrada
└── style.css               # Estilos (COMPLETO)
```

---

## 🔑 Conceptos principales

### 1. useState - Manejo de estado
```javascript
const [peliculas, setPeliculas] = useState([]);
// peliculas = la variable
// setPeliculas = función para actualizar
// [] = valor inicial
```

### 2. fetch - Llamadas a API
```javascript
const respuesta = await fetch(url);
const datos = await respuesta.json();
```

### 3. Props - Pasar datos
```jsx
// En el padre
<Hijo peliculas={peliculas} />

// En el hijo
export default function Hijo({ peliculas }) { ... }
```

### 4. .map() - Renderizar listas
```javascript
{peliculas.map((pelicula) => (
  <Card key={pelicula.id} item={pelicula} />
))}
```

---

## 📚 Resources útiles

- **TMDB API**: https://developer.themoviedb.org/docs
- **React Docs**: https://react.dev
- **useState Hook**: https://react.dev/reference/react/useState
- **useEffect Hook**: https://react.dev/reference/react/useEffect
- **fetch API**: https://developer.mozilla.org/es/docs/Web/API/Fetch_API

---

**¡A aprender se ha dicho!** 🚀 Revisa [GUIA_APRENDIZAJE.md](./GUIA_APRENDIZAJE.md) para empezar.
