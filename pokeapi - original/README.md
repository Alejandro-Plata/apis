# 🌸 Pokédex Kawaii - Vanilla JavaScript

Pokédex completamente funcional con **HTML5, CSS3 y JavaScript Vanilla** (sin frameworks).

## 📁 Estructura del Proyecto

```
pokeapi - original/
├── index.html              # Estructura HTML
├── style.css               # Estilos Kawaii
├── js/
│   ├── pokemonService.js   # Servicios y datos de pokémon
│   └── app.js              # Lógica principal de la app
└── README.md               # Este archivo
```

## 🎮 Características

✅ **Grid de Pokémon** - Muestra pokémon en formato de tarjetas
✅ **Búsqueda en tiempo real** - Filtra pokémon por nombre mientras escribes
✅ **Modal interactivo** - Ver detalles completos de cada pokémon
✅ **Paginación** - Navega entre páginas de pokémon
✅ **Diseño responsivo** - Se adapta a cualquier tamaño de pantalla
✅ **Estilo Kawaii** - Colores suaves y animaciones adorables

## 🚀 Cómo Usar

### Opción 1: Abrir directamente en el navegador
1. Abre `index.html` en tu navegador (doble click o arrastra y suelta)
2. ¡La Pokédex debería cargarse automáticamente!

### Opción 2: Con un servidor local (recomendado)

**Windows (PowerShell):**
```bash
cd "C:\ruta\a\pokeapi - original"
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Mac/Linux:**
```bash
cd /ruta/a/pokeapi\ -\ original
python3 -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Con Node.js (si tienes instalado):**
```bash
npx http-server
```

## 📖 Explicación del Código

### `pokemonService.js`
Contiene toda la lógica de negocio:
- Array de datos de pokémon
- Funciones de búsqueda
- Funciones de formateo
- Mapeo de colores por tipo

### `app.js`
Maneja la interacción con el DOM:
- Renderización del grid
- Gestión del modal
- Paginación
- Event listeners

**Flow:**
```
1. Usuario escribe en búsqueda
   ↓
2. Event listener dispara handleSearch()
   ↓
3. searchPokemon() filtra datos
   ↓
4. renderPokemon() actualiza el DOM
   ↓
5. Se muestran pokémon filtrados
```

## 📊 Estadísticas

- **16 pokémon** incluidos por defecto
- **12 pokémon por página**
- **Totalmente funcional sin dependencias externas**
- **Ligero y rápido**

## 🎨 Personalización

### Agregar más pokémon
Edita `js/pokemonService.js` y agrega al array `POKEMON_DATA`:

```javascript
{
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    image: "URL_de_imagen",
    height: 0.7,
    weight: 6.9,
    description: "Pokémon semilla"
}
```

### Cambiar colores
En `style.css`, modifica las variables CSS:
```css
:root {
    --primary-pink: #ff9eb5;
    --bg-color: #ffe6ea;
    /* etc */
}
```

### Cambiar pokémon por página
En `app.js`:
```javascript
pokemonPerPage: 12  // Cambiar este número
```

## 🔧 Funciones Principales

| Función | Descripción |
|---------|------------|
| `init()` | Inicializa la app |
| `handleSearch()` | Busca pokémon |
| `renderPokemon()` | Dibuja el grid |
| `createPokemonCard()` | Crea una tarjeta |
| `openModal()` | Abre detalles |
| `closeModal()` | Cierra detalles |
| `goToPage()` | Cambia página |

## 📱 Compatibilidad

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Móviles ✅

## 💡 Tips

1. **Abre la consola (F12)** para ver logs si algo no funciona
2. **No necesita internet** para funcionar (datos están locales)
3. **Muy rápido** porque no usa frameworks
4. **Fácil de modificar** - Todo está en 3 archivos

## 🎓 Conceptos Aprendidos

- ✅ DOM Manipulation
- ✅ Event Listeners
- ✅ Estado de la aplicación
- ✅ Funciones de array (filter, map, slice)
- ✅ Template strings
- ✅ CSS Grid
- ✅ Flexbox
- ✅ Media queries

## 🚀 Siguientes Pasos

1. **Conectar con PokeAPI real** - Usar `fetch()` para obtener datos de la API
2. **Agregar favoritos** - Guardar en localStorage
3. **Filtros por tipo** - Agregar botones de filtro
4. **Ordenamiento** - Ordenar por nombre, ID, altura, etc
5. **Dark mode** - Agregar toggle de tema

## 📚 Recursos

- [MDN - DOM Manipulation](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript Array Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

**¡Disfruta de tu Pokédex Kawaii!** 🌸✨
