# 🎮 Pokédex Kawaii - Guía de Inicio

¡Bienvenida al proyecto para aprender **React desde cero**!

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

## ¡Mucho Éxito! 🎮

Recuerda:
- ✅ React es fácil cuando entiendes los conceptos
- ✅ Los errores son normales, aprende de ellos
- ✅ Comparar código es la mejor forma de aprender
- ✅ ¡Celebra cada tarea completada!

¡A programar! 🚀
