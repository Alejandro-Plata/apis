# 🗂️ Estructura del Proyecto y Referencia Rápida

> Guía de archivos para la migración de Pokédex a React

---

## 📁 Estructura Esperada

```
pokeapi - vacia/
├── 📄 index.html                    [Plantilla HTML - NO EDITAR]
├── 📄 package.json                  [Dependencias - NO EDITAR]
├── 📄 vite.config.js                [Configuración - NO EDITAR]
├── 📋 README.md                     [Descripción del proyecto]
├── 📋 GUIA_REACT.md                 [Conceptos de React]
├── 📋 MIGRATION_GUIDE.md            [Guía paso a paso]
├── 📋 proyecto.md                   [Este archivo]
│
└── 📁 src/
    ├── 📄 main.jsx                  [Punto de entrada React] ← CREAR
    ├── 📄 App.jsx                   [Componente raíz] ← CREAR
    ├── 📄 style.css                 [Estilos globales] ← COPIAR del original
    │
    ├── 📁 components/               [Componentes React] ← CREAR
    │   ├── 📄 Header.jsx            [Búsqueda]
    │   ├── 📄 PokemonCard.jsx       [Tarjeta individual]
    │   ├── 📄 PokemonGrid.jsx       [Grid de Pokémon]
    │   ├── 📄 Modal.jsx             [Detalles del Pokémon]
    │   └── 📄 Pagination.jsx        [Controles de página]
    │
    ├── 📁 hooks/                    [Custom Hooks] ← CREAR
    │   └── 📄 usePokeAPI.js         [Hook para consumir API]
    │
    └── 📁 services/                 [Servicios/API] ← CREAR
        └── 📄 pokemonService.js     [Llamadas a PokeAPI]
```

---

## 📚 Documentación Disponible

### Para Aprender

| Documento | Propósito | Tiempo |
|-----------|-----------|--------|
| **GUIA_REACT.md** | Conceptos fundamentales de React | 45 min |
| **MIGRATION_GUIDE.md** | Paso a paso de la migración | 2-4 horas |
| **README.md** | Resumen del proyecto | 5 min |

### Para Referencia

| Referencia | Ubicación | Uso |
|-----------|-----------|-----|
| **Código Vanilla original** | `../pokeapi - original/` | Ver estructura HTML/JS original |
| **Solución React avanzada** | `../api_pelis/` | Ver patrones React complejos |

---

## 🎯 Archivos a Crear (en orden)

### ✅ 1. `src/main.jsx` - Punto de entrada
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
**Duración:** 5 minutos  
**¿Qué es?** Inicializa React en el navegador

---

### ✅ 2. `src/style.css` - Estilos
```bash
# Copia desde el proyecto original
cp ../pokeapi\ -\ original/style.css ./src/style.css
```
**Duración:** 1 minuto  
**¿Qué es?** Los mismos estilos del proyecto original

---

### ✅ 3. `src/services/pokemonService.js` - API
**Duración:** 20 minutos  
**¿Qué es?** Funciones para llamar a PokeAPI

**Funciones a crear:**
- `getPokemonPage(page)` - Obtiene una página de Pokémon
- `searchPokemon(name)` - Busca un Pokémon por nombre
- `transformPokemonData(data)` - Transforma datos de API

Ver: [MIGRATION_GUIDE.md - Fase 3.1](MIGRATION_GUIDE.md#paso-31-crear-servicio-de-api)

---

### ✅ 4. `src/hooks/usePokeAPI.js` - Custom Hook
**Duración:** 15 minutos  
**¿Qué es?** Hook reutilizable para la lógica de API

**Funcionalidades:**
- Carga datos de página
- Maneja loading/error
- Permite búsqueda

Ver: [MIGRATION_GUIDE.md - Fase 3.2](MIGRATION_GUIDE.md#paso-32-crear-custom-hook-usepokeopiajsx)

---

### ✅ 5. `src/components/Header.jsx` - Encabezado
**Duración:** 10 minutos  
**¿Qué es?** Header con búsqueda

**Props:**
- `onSearch(query)` - Callback al buscar

Ver: [MIGRATION_GUIDE.md - Paso 2.2](MIGRATION_GUIDE.md#paso-22-crear-componente-headerjsx)

---

### ✅ 6. `src/components/PokemonCard.jsx` - Tarjeta
**Duración:** 10 minutos  
**¿Qué es?** Tarjeta individual de un Pokémon

**Props:**
- `pokemon` - Datos del Pokémon
- `onClick(pokemon)` - Callback al hacer click

Ver: [MIGRATION_GUIDE.md - Paso 2.3](MIGRATION_GUIDE.md#paso-23-crear-componente-pokemoncardjsx)

---

### ✅ 7. `src/components/PokemonGrid.jsx` - Grid
**Duración:** 10 minutos  
**¿Qué es?** Grid que renderiza múltiples tarjetas

**Props:**
- `pokemon` - Array de Pokémon
- `onCardClick(pokemon)` - Callback al hacer click

Ver: [MIGRATION_GUIDE.md - Paso 2.4](MIGRATION_GUIDE.md#paso-24-crear-componente-pokemongodjsx)

---

### ✅ 8. `src/components/Modal.jsx` - Modal
**Duración:** 15 minutos  
**¿Qué es?** Modal para detalles del Pokémon

**Props:**
- `pokemon` - Datos del Pokémon seleccionado
- `onClose()` - Callback al cerrar

Ver: [MIGRATION_GUIDE.md - Paso 2.5](MIGRATION_GUIDE.md#paso-25-crear-componente-modaljsx)

---

### ✅ 9. `src/components/Pagination.jsx` - Paginación
**Duración:** 15 minutos  
**¿Qué es?** Controles de paginación

**Props:**
- `currentPage` - Página actual
- `totalPages` - Total de páginas
- `onPageChange(page)` - Callback al cambiar página

Ver: [MIGRATION_GUIDE.md - Paso 2.6](MIGRATION_GUIDE.md#paso-26-crear-componente-paginationjsx)

---

### ✅ 10. `src/App.jsx` - Componente Raíz
**Duración:** 20 minutos  
**¿Qué es?** Componente principal que une todo

**Responsabilidades:**
- Manejo de estado global
- Coordinación entre componentes
- Lógica de paginación y búsqueda

Ver: [MIGRATION_GUIDE.md - Fase 4.1](MIGRATION_GUIDE.md#paso-41-crear-appjsx-completo)

---

## 🚀 Comandos Útiles

```bash
# Instalar dependencias (primera vez)
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# Ver build en local
npm run preview
```

---

## ⚡ Checklist de Implementación

Marca conforme vayas completando:

### Configuración Inicial
- [ ] Crear carpeta `src/`
- [ ] Crear carpeta `src/components/`
- [ ] Crear carpeta `src/hooks/`
- [ ] Crear carpeta `src/services/`

### Archivos Principales
- [ ] Copiar `style.css` al proyecto
- [ ] Crear `src/main.jsx`
- [ ] Crear `src/App.jsx`

### Servicios y Hooks
- [ ] Crear `src/services/pokemonService.js`
- [ ] Crear `src/hooks/usePokeAPI.js`

### Componentes
- [ ] Crear `src/components/Header.jsx`
- [ ] Crear `src/components/PokemonCard.jsx`
- [ ] Crear `src/components/PokemonGrid.jsx`
- [ ] Crear `src/components/Modal.jsx`
- [ ] Crear `src/components/Pagination.jsx`

### Testing
- [ ] ✅ `npm run dev` sin errores
- [ ] ✅ Se muestran Pokémon en la grid
- [ ] ✅ Click abre modal
- [ ] ✅ Botón cerrar funciona
- [ ] ✅ Búsqueda funciona
- [ ] ✅ Paginación funciona
- [ ] ✅ Estados de carga visibles
- [ ] ✅ Manejo de errores funciona

---

## 💡 Tips Importantes

### Antes de Empezar

1. **Lee GUIA_REACT.md** - Entender los conceptos
2. **Mira MIGRATION_GUIDE.md** - Entender el plan
3. **Revisa pokeapi - original/** - Entender dónde viene

### Mientras Implementas

1. **Crea un archivo a la vez** - No intentes todo junto
2. **Prueba con `npm run dev`** - Después de cada archivo
3. **Usa console.log** - Para debuggear
4. **Compara con api_pelis/** - Si algo no funciona

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| "Cannot find module" | Import incorrecto | Revisar paths y nombres |
| "x is not a function" | Function no importada | Verificar `export default` |
| No se renderiza nada | App no conectado | Revisar `main.jsx` |
| Múltiples renders | useEffect sin dependencias | Agregar `[]` |
| Props undefined | No pasar props | Revisar `<Component prop={value} />` |

---

## 📖 Navegación Rápida

**¿Necesitas aprender sobre...?**

- **React basics** → `GUIA_REACT.md`
- **Cómo migrar** → `MIGRATION_GUIDE.md`
- **Componente específico** → `MIGRATION_GUIDE.md#Fase 2`
- **Consumir API** → `MIGRATION_GUIDE.md#Fase 3.1`
- **Estado y hooks** → `GUIA_REACT.md#Estado`
- **README general** → `README.md`

---

## 🎬 Próximos Pasos

1. ✅ Lee este archivo
2. ✅ Lee GUIA_REACT.md
3. ✅ Lee MIGRATION_GUIDE.md
4. ✅ Crea los archivos en orden
5. ✅ Prueba con `npm run dev`
6. ✅ Compara con api_pelis/ si necesitas ayuda

**¡Feliz migración! 🚀**
