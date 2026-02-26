# 🎮 Pokédex - Guía de Inicio

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

# 4. (Opcional) Conectar con GitHub (tu github)
git remote add origin <url-del-repositorio>
git branch -M main
git push -u origin main
```

---

## 🚀 Proyectos Disponibles

### 📁 `pokeapi - vacia/` ← EMPIEZA AQUÍ
**Migración de Vanilla JS a React** - Tu proyecto para completar.

```bash
cd "pokeapi - vacia"
npm install
npm run dev
```

🔗 **Previsualización:** [https://pokedex-sandy-phi.vercel.app/](https://pokedex-sandy-phi.vercel.app/)

**Documentación:**
- `README.md` - Descripción general del proyecto
- `GUIA_REACT.md` - Conceptos fundamentales de React
- `MIGRATION_GUIDE.md` - Guía paso a paso de la migración

**Tu trabajo:**
- Crear componentes React en `src/components/`
- Implementar hook `src/hooks/usePokeAPI.js`
- Desarrollar lógica en `src/App.jsx`
- Adaptar estilos CSS existentes

**Nivel:** Principiante a Intermedio

---

### 📁 `pokeapi - original/` ← REFERENCIA
**Proyecto con HTML y CSS Vanilla** - Solución original para comparar.

```bash
cd "pokeapi - original"
# No requiere npm, abre index.html directamente
```

**Úsalo para:**
- Entender la estructura HTML original
- Ver cómo funciona el Vanilla JavaScript
- Comparar con la versión React

---

### 📁 `api_pelis/` ← SOLUCIÓN COMPLETA REACT
**Proyecto React Avanzado** - Aplicación de películas con API integration.

```bash
cd "api_pelis"
npm install
npm run dev
```

🔗 **Previsualización:** [https://apis-smoky.vercel.app/](https://apis-smoky.vercel.app/)

**Consulta para:**
- Ver patrones React avanzados
- Entender infinite scroll
- Aplicación con autenticación
- Consumo real de APIs

---

## 📚 Ruta de Aprendizaje Recomendada

### Opción 1: Principiante (Empieza desde cero)

1. **Aprende React** (45 minutos)
   - Lee `pokeapi - vacia/GUIA_REACT.md`
   - Entiende: JSX, componentes, props, state, hooks

2. **Comprende la Migración** (15 minutos)
   - Lee `pokeapi - vacia/MIGRATION_GUIDE.md`
   - Revisa `pokeapi - original/` como referencia

3. **Implementa** (2-4 horas)
   - Sigue el MIGRATION_GUIDE.md paso a paso
   - Crea componentes uno por uno
   - Ejecuta `npm run dev` y prueba cada cambio

4. **Consulta la Solución** (según sea necesario)
   - Abre `api_pelis/` para ver patrones avanzados
   - Compara tu código con la referencia

### Opción 2: Intermedio (Reconocimiento rápido)

1. Lee `pokeapi - vacia/README.md` (5 min)
2. Revisa `pokeapi - original/` (10 min)
3. Salta al MIGRATION_GUIDE.md y codea (2-3 horas)
4. Consulta GUIA_REACT.md si algo no está claro

### Opción 3: Experto (Mira y aprende)

1. Abre `api_pelis/` (React funcional)
2. Compara con `pokeapi - original/` (Vanilla JS)
3. Implementa tu propia versión como ejercicio

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
