# 🎮 Pokédex Kawaii - Guía de Inicio

¡Bienvenida al proyecto para aprender **React desde cero** y dominar **APIs, Query Params y Autenticación**!

---

## 🔧 Configuración Inicial del Repositorio

### Opción A: Clonar el repositorio de GitHub (Recomendado)

Si tienes acceso al repositorio remoto:

```bash
# 1. Clonar el repositorio completo
git clone <url-del-repositorio> mi-workspace
cd mi-workspace

# 2. Ver todos los proyectos disponibles
ls -la

# 3. Actualizar el repositorio regularmente
git pull  # Descargar últimos cambios
```

---

### Opción B: Crear un repositorio local desde cero

Si prefieres trabajar localmente sin GitHub:

```bash
# 1. Inicializar repositorio git
git init

# 2. Agregar archivos
git add .

# 3. Hacer primer commit
git commit -m "Repositorio inicial"

# 4. (Opcional) Conectar con GitHub
git remote add origin <url-del-repositorio>
git branch -M main
git push -u origin main
```

---

### Opción C: Copiar y organizar proyectos manualmente

Si prefieres trabajar sin git:

```bash
mkdir fase1-react-pokeapi
mkdir fase2-query-params-peliculas
mkdir fase3-autenticacion

cp -r pokeapi/* ./fase1-react-pokeapi/
cp -r api_pelis/* ./fase2-query-params-peliculas/
cp -r api-basica/* ./fase3-autenticacion/
```

---

### Mantener el repositorio actualizado

```bash
git status      # Ver cambios
git pull        # Descargar últimos cambios
git add .
git commit -m "Descripción"
git push        # Enviar cambios
```

---

## 🚀 Dos Carpetas Principales

### 📁 `pokeapi - vacio/` ← EMPIEZA AQUÍ
**Tu proyecto para completar** con 8 tareas progresivas.

```bash
cd "pokeapi - vacio"
npm install
npm run dev
```

**Archivos de referencia:**
- `README.md` - Descripción general del proyecto
- `LEARN_REACT.md` - Conceptos de React explicados
- `API_GUIDE.md` - Cómo consumir PokeAPI
- `TASKS.md` - Las 8 tareas con código de ejemplo

**Tu trabajo:**
- Completar componentes en `src/components/`
- Crear hook en `src/hooks/usePokeAPI.js`
- Llenar `src/App.jsx` con estado
- Agregar estilos en `src/style.css`

---

### 📁 `pokeapi/` ← SOLUCIÓN COMPLETA
**Proyecto React ya funcional** para comparar.

```bash
cd pokeapi
npm install
npm run dev
```

**Úsalo para:**
- Ver la solución completa cuando te atasques
- Comparar tu código
- Entender cómo funcionan los componentes

---

## 📚 Recomendación de Lectura

### Paso 1: Aprende React (30 min)
1. Lee `pokeapi - vacio/LEARN_REACT.md` - conceptos clave
2. Lee `pokeapi - vacio/API_GUIDE.md` - cómo usar PokeAPI

### Paso 2: Empieza a Codear (2-4 horas)
1. Lee `pokeapi - vacio/TASKS.md` - cada tarea
2. Completa las 8 tareas en orden
3. **Copiar-pegar** el código de ejemplo en TASKS.md
4. Ejecuta `npm run dev` y prueba cada cambio

### Paso 3: Valida (30 min)
1. Abre `pokeapi/` para ver cómo se ve funcionando
2. Compara tu código con la solución
3. Entiende las diferencias

---

## ✅ Checklist de Éxito

- [ ] Leí LEARN_REACT.md
- [ ] Entiendo qué es un componente
- [ ] Sé qué son props y callbacks
- [ ] Completé Tarea 1 (Setup)
- [ ] Completé Tarea 2 (Header)
- [ ] Completé Tarea 3 (usePokeAPI)
- [ ] Completé Tarea 4 (Grid)
- [ ] Completé Tarea 5 (Card)
- [ ] Completé Tarea 6 (Modal)
- [ ] Completé Tarea 7 (App.jsx)
- [ ] Completé Tarea 8 (CSS)
- [ ] Mi Pokédex busca, muestra y abre modal
- [ ] Se ve bonita en móvil

---

## 🎯 Estructura Final

```
pokeapi - vacio/          ← Donde trabajas
├── src/
│   ├── components/
│   │   ├── Header.jsx         (Tarea 2)
│   │   ├── PokemonCard.jsx    (Tarea 5)
│   │   ├── PokemonGrid.jsx    (Tarea 4)
│   │   └── PokemonModal.jsx   (Tarea 6)
│   ├── hooks/
│   │   └── usePokeAPI.js      (Tarea 3)
│   ├── App.jsx                (Tarea 7)
│   └── style.css              (Tarea 8)
└── ...

pokeapi/                  ← Solución de referencia
├── src/
│   ├── components/
│   ├── services/
│   └── ...
└── ...
```

---

## 💡 Tips

1. **Copia el código de TASKS.md** - Es más rápido que escribir desde cero
2. **Prueba en `localhost:5173`** después de cada cambio
3. **Abre la consola (F12)** para ver errores
4. **Si te atasques**, revisa `pokeapi/src` para comparar
5. **Lee los comentarios** en archivos como `usePokeAPI.js`

---

## 🆘 ¿Atascada?

### Error: "Cannot find module 'react'"
```bash
npm install
```

### Error: "localhost:5173 no carga"
```bash
npm run dev
```

### Componente no aparece
1. Revisa que lo importaste en App.jsx
2. Revisa los nombres: ¿son iguales al archivo?
3. Revisa que retorna JSX válido

### La búsqueda no funciona
1. Revisa que Header llama `onSearch` prop
2. Revisa que App.jsx tiene `handleSearch`
3. Revisa que filteredPokemon actualiza

---

## 🚀 Después de Terminar

### Mejoras Opcionales:
- Agregar mas pokémon (cambiar limit=100 a limit=500)
- Guardar favoritos en localStorage
- Dark mode toggle
- Paginación
- Ordenar por tipo

### Conceptos Siguientes:
- Context API (estado global)
- React Router (múltiples páginas)
- TailwindCSS (estilos pro)
- Testing (Jest + React Testing Library)

---

## 📝 Mini Resumen de React

```jsx
// Componente
function Header() {
  return <h1>Hola</h1>;
}

// State (memoria del componente)
const [count, setCount] = useState(0);

// Props (datos del padre)
function Card({ name }) {
  return <p>{name}</p>;
}

// Callback (hijo habla con padre)
<Header onSearch={handleSearch} />

// Hook (lógica reutilizable)
const { pokemon } = usePokeAPI();
```

---

## 🚀 Ruta de Aprendizaje Completa

Una vez completes pokeapi, aquí está la ruta recomendada paso a paso:

### 📍 Fase 1: React + Componentes (Actual)

**Proyecto:** `pokeapi/` o `pokeapi - vacio/`

**Conceptos:** React, props, estado, hooks, APIs

**Tiempo:** 2-4 horas

---

### 📍 Fase 2: Query Parameters Avanzados

**Proyecto:** `api_pelis/` o `api_pelis - vacia/`

**Conceptos:** Query params complejos, filtros, debounce, manejo de errores

**Documentación:**
- [README.md](./api_pelis/README.md) - Overview
- [GUIA_REACT.md](./api_pelis/GUIA_REACT.md) - Componentes
- [IMPLEMENTATION_LOG.md](./api_pelis/IMPLEMENTATION_LOG.md) - Cambios

**Tiempo:** 3-4 horas

---

### 📍 Fase 3: Backend con Autenticación JWT

**Proyecto:** `api-basica - vacia/`

**Conceptos:** Bcrypt, JWT, middleware, validaciones, CRUD

**Documentación:**
- [HOJA_DE_RUTA.md](./api-basica%20-%20vacia/HOJA_DE_RUTA.md) - Guía completa
- [README.md](./api-basica%20-%20vacia/README.md) - Conceptos
- [BCRYPT_GUIDE.md](./api-basica%20-%20vacia/BCRYPT_GUIDE.md) - Hashing
- [JWT_GUIDE.md](./api-basica%20-%20vacia/JWT_GUIDE.md) - Tokens
- [SEQUELIZE_GUIDE.md](./api-basica%20-%20vacia/SEQUELIZE_GUIDE.md) - Base de datos
- [TESTING.md](./api-basica%20-%20vacia/TESTING.md) - Pruebas
- [DEBUGGING.md](./api-basica%20-%20vacia/DEBUGGING.md) - Troubleshooting

**Tiempo:** 3-5 horas

---

### 📍 Próximos Pasos

- Integración Frontend-Backend
- Refresh tokens y logout
- 2FA y recuperación de contraseña
- Blog API, Chat, Tienda online
- Deploy y DevOps

---

## ⏱️ Tiempo Total Estimado

- **Fase 1 (React):** 2-4 horas
- **Fase 2 (Query Params):** 3-4 horas
- **Fase 3 (Autenticación):** 3-5 horas
- **Integración + Extras:** 2-4 horas

**Total: 10-17 horas**

---

## 📚 Recursos

- React: https://react.dev
- Express.js: https://expressjs.com
- JWT: https://jwt.io
- Sequelize: https://sequelize.org
- PokeAPI: https://pokeapi.co
- TMDB API: https://www.themoviedb.org/settings/api

---

## ¡Mucho Éxito! 🎮

Recuerda:
- ✅ React es fácil cuando entiendes los conceptos
- ✅ Los errores son normales, aprende de ellos
- ✅ Comparar código es la mejor forma de aprender
- ✅ ¡Celebra cada tarea completada!

¡A programar! 🚀
