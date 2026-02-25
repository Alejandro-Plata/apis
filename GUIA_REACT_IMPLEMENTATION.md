# 🎬 Kitty Cinema Club - Guía de Implementación en React

## 📋 Descripción General

**Kitty Cinema Club** es una aplicación web para explorar películas y series de TV utilizando la API de TMDB (The Movie Database). Cuenta con búsqueda, filtrado por rating, lazy loading, modal de detalles, y soporte multiidioma.

### Características principales:
- ✅ Búsqueda de películas y series
- ✅ Filtrado por rating mínimo (escala 0-5)
- ✅ Lazy loading infinito
- ✅ Modal detallado con trailer
- ✅ Episodios de series (primera temporada)
- ✅ Soporte de idiomas (Español/Inglés)
- ✅ Sistema de colores dinámico para ratings
- ✅ Diseño responsive y kawaii

---

## 🔧 Configuración Inicial

### Dependencias necesarias:

```bash
npm install react react-dom
npm install axios  # Para peticiones HTTP
npm install react-router-dom  # Enrutamiento (opcional)
```

### Variables de entorno (.env):

```env
REACT_APP_TMDB_API_KEY=5d4491126a7a6d8767d99c5e668a1569
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
```

---

## 🏗️ Estructura de Carpetas

```
src/
├── components/
│   ├── Header.jsx                 # Encabezado con toggle idioma
│   ├── Navigation.jsx             # Navegación Películas/Series
│   ├── SearchFilter.jsx           # Búsqueda y filtro de rating
│   ├── PolaroidGrid.jsx           # Grid de tarjetas
│   ├── PolaroidCard.jsx           # Tarjeta individual (polaroid)
│   ├── Modal/
│   │   ├── DetailModal.jsx        # Modal principal
│   │   ├── EpisodesList.jsx       # Lista de episodios
│   │   └── TrailerButton.jsx      # Botón de trailer
│   └── common/
│       ├── Spinner.jsx            # Indicador de carga
│       └── EmptyState.jsx         # Sin resultados
├── hooks/
│   ├── useTMDB.js                 # Hook para API
│   └── useInfiniteScroll.js       # Hook para lazy loading
├── services/
│   └── tmdbService.js             # Lógica de API
├── context/
│   └── AppContext.js              # Estado global
├── styles/
│   └── style.css                  # Estilos importados
├── App.jsx
├── App.css
└── index.js
```

---

## 🎯 Componentes Principales

### 1. **App.jsx** (Componente raíz)
```jsx
// Estructura general
- Proveer contexto global (AppContext)
- Mantener estado: currentType, language, filterRating, searchQuery
- Renderizar Header, Navigation, SearchFilter, PolaroidGrid, Modal
```

**Estado necesario:**
```javascript
{
  currentType: 'movies', // 'movies' | 'tv'
  language: 'es-ES',     // 'es-ES' | 'en-US'
  filterRating: '',      // '' | '2.5' | '3' | '3.5' | '4' | '4.5'
  searchQuery: '',       // string
  isSearching: false,    // boolean
  items: [],             // array de películas/series
  isLoading: false,      // boolean
  currentPage: 1,        // number
  selectedItem: null,    // objeto de película/serie seleccionada
  showModal: false       // boolean
}
```

### 2. **Header.jsx**
- Renderiza título y toggle de idioma
- Emitir evento: `onLanguageChange(newLanguage)`
- **Clases CSS:** `kitty-header`, `candy-toggle`, `candy-btn`

### 3. **Navigation.jsx**
- Dos botones: Películas 🎬 | Series 📺
- Emitir evento: `onTypeChange(type)`
- Mostrar ribbon-divider (♥)
- **Clases CSS:** `ribbon-nav`, `ribbon-btn`, `ribbon-divider`

### 4. **SearchFilter.jsx**
- Input de búsqueda con ID `search-input`
- Select de rating con opciones: "", "4.5", "4", "3.5", "3", "2.5"
- Emitir eventos:
  - `onSearch(query)` - al hacer clic en Buscar o presionar Enter
  - `onRatingFilter(rating)` - al cambiar el select
- **Clases CSS:** `search-filter-section`, `search-box`, `search-btn`, `filter-group`

### 5. **PolaroidGrid.jsx**
- Renderizar array de tarjetas
- Implementar Intersection Observer para lazy loading
- Emitir evento: `onLoadMore()` cuando llega al final
- **Clases CSS:** `scrapbook-container`, `polaroid-grid`

### 6. **PolaroidCard.jsx**
```jsx
Props:
{
  item: {
    id: number,
    title/name: string,
    poster_path: string,
    vote_average: number, // 0-10, convertir a 0-5
    backdrop_path: string,
    overview: string,
    genres: array,
    release_date/first_air_date: string,
    media_type?: 'movie' | 'tv'
  },
  onCardClick: (item) => {}
}
```

**Estructura:**
- `washi-tape` (cinta decorativa)
- `photo-frame` con imagen
- `sticker-score` con clase dinámica de color
- `handwritten-caption` con título

**Clases de rating:**
- `.rating-gold`: >= 4.5 (dorado)
- `.rating-green`: > 3.5 (verde)
- `.rating-yellow`: > 2.5 (marrón)
- `.rating-red`: >= 1.5 (rojo)
- `.rating-purple`: < 1.5 (morado)

### 7. **DetailModal.jsx**
```jsx
Props:
{
  item: movieObject,
  isOpen: boolean,
  onClose: () => {},
  isMovie: boolean
}
```

**Estructura:**
- Header con imagen de fondo circular
- Título y badges de géneros
- Descripción
- Botón "Ver Trailer"
- Lista de episodios (solo si es serie)

**Funcionalidades:**
- Cerrar con botón ✖ o clic en fondo
- Botón trailers abre YouTube en nueva pestaña
- Cargar episodios de temporada 1

### 8. **EpisodesList.jsx**
```jsx
Props:
{
  seriesId: number,
  language: string
}
```
- Fetchear `/tv/{id}/season/1`
- Renderizar episodios con número, nombre y duración

---

## 🎣 Hooks Personalizados

### `useTMDB.js`

```javascript
Uso:
const { 
  data, 
  isLoading, 
  error, 
  fetchData 
} = useTMDB(endpoint, params, language);

Funcionalidades:
- Manejar peticiones HTTP
- Convertir ratings de 0-10 a 0-5
- Validar respuestas
```

### `useInfiniteScroll.js`

```javascript
Uso:
const { 
  targetRef, 
  hasMore 
} = useInfiniteScroll(onLoadMore, isLoading);

Funcionalidades:
- Usar Intersection Observer
- Ejecutar callback cuando elemento es visible
- Marcar cuando no hay más resultados
```

---

## 🔌 API de TMDB

### Endpoints necesarios:

1. **Películas/Series populares**
   ```
   GET /movie/popular | /tv/popular
   Params: page, language
   ```

2. **Búsqueda**
   ```
   GET /search/movie | /search/tv
   Params: query, page, language
   ```

3. **Discover (con filtros)**
   ```
   GET /discover/movie | /discover/tv
   Params: page, language, vote_average.gte, sort_by
   ```

4. **Detalles**
   ```
   GET /movie/{id} | /tv/{id}
   Params: language, append_to_response=videos,season/1
   ```

5. **Episodios**
   ```
   GET /tv/{id}/season/1
   Params: language
   ```

6. **Videos (trailers)**
   - Incluido en respuesta de detalles
   - Buscar: `type === 'Trailer' && site === 'YouTube'`

---

## 📝 Lógica de Filtros y Búsqueda

### Flujo de búsqueda:

```
1. Usuario escribe en input y presiona Enter o hace clic en Buscar
2. Limpiar grid, resetear página a 1
3. Llamar: /search/movie or /search/tv con query
4. Guardar estado: isSearching = true, searchQuery = value
5. Renderizar resultados
6. Si scrollea al final, cargar siguiente página CON LA MISMA QUERY
```

### Flujo de filtro de rating:

```
1. Usuario selecciona rating en dropdown
2. Limpiar grid, resetear página a 1, resetear búsqueda
3. Llamar: /discover/movie or /discover/tv
   - Parámetros: vote_average.gte = rating * 2
   - sort_by = 'vote_average.asc' (menor a mayor)
4. Guardar estado: filterRating = value
5. Renderizar resultados
6. Si scrollea al final, cargar siguiente página CON EL MISMO FILTRO
```

### Cambio de tipo (Películas/Series):

```
1. Usuario hace clic en botón
2. Resetear TODO: página, grid, búsqueda, filtro, selectedItem
3. Cambiar currentType
4. Cargar películas/series populares
```

### Cambio de idioma:

```
1. Usuario hace clic en ES/EN
2. Actualizar language
3. Mantener el contenido visible pero RELOADEAR desde API con nuevo idioma
4. Moviendose al top del grid
```

---

## 🎨 Sistema de Colores para Ratings

Escala: 0-5 (convertir de 0-10 dividiendo entre 2)

| Rating | Color | Clase CSS | Gradient |
|--------|-------|-----------|----------|
| >= 4.5 | 🟡 Dorado | `.rating-gold` | `#FFD700 → #FFC700` |
| > 3.5 | 🟢 Verde | `.rating-green` | `#4CAF50 → #45a049` |
| > 2.5 | 🟤 Marrón | `.rating-yellow` | `#8B6F47 → #A0826D` |
| >= 1.5 | 🔴 Rojo | `.rating-red` | `#f44336 → #e53935` |
| < 1.5 | 🟣 Morado | `.rating-purple` | `#9C27B0 → #7B1FA2` |

---

## ⚙️ Detalles de Implementación

### Conversión de Rating:

```javascript
// API devuelve 0-10
const apiRating = 8.5;

// Convertir a 0-5
const displayRating = (apiRating / 2).toFixed(1); // 4.3

// Convertir 0-5 a 0-10 para filtros
const filterValue = parseFloat(filterRating) * 2; // 4.5 → 9
```

### Evitar requests duplicados:

```javascript
// Mantener referencia a petición en progreso
let currentRequest = null;

if (currentRequest) {
  currentRequest.cancel();
}

currentRequest = axios.get(...);
```

### Lazy Loading con Intersection Observer:

```javascript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading && hasMore) {
      onLoadMore();
    }
  }, { rootMargin: '100px' });

  if (sentinelRef.current) {
    observer.observe(sentinelRef.current);
  }

  return () => observer.disconnect();
}, [isLoading, hasMore]);
```

### Manejo de Modal:

```javascript
// Abrir modal y cargar detalles
const handleCardClick = async (item) => {
  setSelectedItem(item);
  setShowModal(true);
  // Cargar detalles completos de la API
  const details = await fetchFromTMDB(
    `/movie/${item.id}`,
    { append_to_response: 'videos,season/1' }
  );
  setSelectedItem(details);
};

// Cerrar
const handleCloseModal = () => {
  setShowModal(false);
  setSelectedItem(null);
};
```

---

## 📱 Consideraciones de Responsive

- Grid: `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`
- Modal: Máximo ancho 550px, centrado
- Búsqueda: Flex, se adapta en móvil
- Márgenes y paddings: Porcentuales o rem

---

## 🚀 Pasos de Implementación (Recomendado)

### Fase 1: Set-up básico
- [ ] Crear estructura de carpetas
- [ ] Instalar dependencias
- [ ] Copiar estilos CSS
- [ ] Crear App.jsx con estado base

### Fase 2: Componentes estáticos
- [ ] Header.jsx
- [ ] Navigation.jsx
- [ ] SearchFilter.jsx
- [ ] PolaroidCard.jsx
- [ ] DetailModal.jsx

### Fase 3: Lógica de API
- [ ] Servicio de TMDB (tmdbService.js)
- [ ] Hook useTMDB
- [ ] Conexión con API

### Fase 4: Interactividad
- [ ] Cambio de tipo (películas/series)
- [ ] Búsqueda
- [ ] Filtro de rating
- [ ] Cambio de idioma

### Fase 5: Características avanzadas
- [ ] Lazy loading
- [ ] Modal detallado
- [ ] Episodios de series
- [ ] Trailers

### Fase 6: Pulido
- [ ] Manejo de errores
- [ ] Loading states
- [ ] Mensajes vacíos
- [ ] Optimización

---

## ⚠️ Problemas Comunes y Soluciones

### Problema: Peticiones múltiples al mismo tiempo
**Solución:** Usar flag `isLoading` para prevenir nuevas peticiones

### Problema: Rating no se convierte correctamente
**Solución:** Siempre dividir API rating (0-10) entre 2 para mostrar (0-5)

### Problema: Lazy loading no funciona en móvil
**Solución:** Ajustar `rootMargin` y `threshold` del Intersection Observer

### Problema: Modal se cierra al clicar en entrada
**Solución:** Usar `event.stopPropagation()` en elementos interactivos del modal

### Problema: Filtro de rating devuelve resultados vacíos
**Solución:** Usar endpoint `/discover/` en lugar de `/popular/`

---

## 📚 Recursos Útiles

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [Axios Documentation](https://axios-http.com/)
- [MDN - Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## 🎓 Conceptos Clave

1. **Context API**: Para compartir estado entre componentes
2. **Custom Hooks**: Para lógica reutilizable
3. **Intersection Observer**: Para lazy loading eficiente
4. **API REST**: Peticiones GET con query params
5. **Renderizado condicional**: Base de datos cambia según estado
6. **Manejo de formularios**: Input y select controlados
7. **Modales**: useState para mostrar/ocultar
8. **Responsive Design**: Mobile-first

---

**¡Buena suerte implementando Kitty Cinema Club en React! 🎬✨**
