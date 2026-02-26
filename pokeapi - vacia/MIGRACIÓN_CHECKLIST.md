# ✅ Checklist de Migración - Pokédex Vanilla JS → React

> Seguimiento de progreso para la migración de la Pokédex

---

## 📋 Estado General

**Progreso:** 0/10 tareas completadas  
**Tiempo estimado:** 2-4 horas  
**Dificultad:** ⭐⭐⭐ Intermedia

---

## 🎯 Tareas Principales

### Fase 1: Inicialización React (15 minutos)

- [ ] **1.1 Crear estructura de carpetas**
  - Crear `src/` en la raíz
  - Crear `src/components/`
  - Crear `src/hooks/`
  - Crear `src/services/`

- [ ] **1.2 Copiar y adaptar estilos**
  - Copiar `style.css` de `pokeapi - original/`
  - Guardar en `src/style.css`
  - Verificar que all clases existan

- [ ] **1.3 Crear `src/main.jsx`**
  - Importar React y ReactDOM
  - Crear root element
  - Importar estilos
  - ✅ **VERIFICAR:** Sin errores en consola

---

### Fase 2: Capa de Servicios (20 minutos)

#### Servicio de API

- [ ] **2.1 Crear `src/services/pokemonService.js`**
  - Función `getPokemonPage(page)`
  - Función `searchPokemon(name)`
  - Función `transformPokemonData(data)`
  - ✅ **VERIFICAR:** Funciones sin errores

#### Custom Hook

- [ ] **2.2 Crear `src/hooks/usePokeAPI.js`**
  - Usar `useState` para pokemon, loading, error, totalPages
  - Usar `useEffect` con dependencia `[page]`
  - Implementar función `search(name)`
  - ✅ **VERIFICAR:** Exports e imports correctos

---

### Fase 3: Componentes Base (45 minutos)

#### Componentes de Presentación

- [ ] **3.1 Crear `src/components/Header.jsx`**
  - Renderizar `<header>` con título
  - Input para búsqueda
  - Botón de búsqueda (con SVG o emoji)
  - Prop `onSearch(query)`
  - ✅ **VERIFICAR:** En consola no hay warnings de props

- [ ] **3.2 Crear `src/components/PokemonCard.jsx`**
  - Mostrar imagen del Pokémon
  - Mostrar nombre
  - Mostrar tipo(s)
  - Mostrar número Pokédex (#XXX)
  - Indicador si es shiny (✨)
  - Prop `onClick`
  - ✅ **VERIFICAR:** Se renderiza sin errores

- [ ] **3.3 Crear `src/components/PokemonGrid.jsx`**
  - Importar PokemonCard
  - Map sobre array de pokemon
  - Key única para cada card
  - Mostrar "Cargando..." si no hay datos
  - Prop `onCardClick`
  - ✅ **VERIFICAR:** Renderiza múltiples tarjetas

- [ ] **3.4 Crear `src/components/Modal.jsx`**
  - Renderización condicional (if pokemon)
  - Imagen grande del Pokémon
  - Nombre
  - Tipos
  - Altura y peso
  - Botón cerrar (×)
  - Click afuera cierra
  - Prop `onClose`
  - ✅ **VERIFICAR:** Modal abre y cierra correctamente

- [ ] **3.5 Crear `src/components/Pagination.jsx`**
  - Array de números (1 a totalPages)
  - Botón anterior (❮)
  - Botón siguiente (❯)
  - Clase "active" en página actual
  - Botones deshabilitados en extremos
  - Prop `onPageChange(page)`
  - ✅ **VERIFICAR:** Números de página generados dinámicamente

---

### Fase 4: Componente Principal (30 minutos)

- [ ] **4.1 Crear `src/App.jsx`**
  - Importar todos los componentes
  - Importar usePokeAPI hook
  - Estado: currentPage
  - Estado: selectedPokemon
  - Usar hook usePokeAPI
  - Pasar datos a componentes
  - Implementar handlers:
    - `handleSearch(query)`
    - `handlePageChange(page)`
    - Cerrar modal al cambiar página
  - Mostrar estado loading
  - Mostrar estado error
  - ✅ **VERIFICAR:** Componentes se comunican correctamente

---

## 🧪 Testing y Validación

### Funcionalidad Básica

- [ ] **T1: Carga inicial**
  - `npm install` se ejecuta sin errores
  - `npm run dev` abre navegador en localhost:5173
  - Página renderiza sin console errors
  - Se muestran 20 Pokémon en primer load

- [ ] **T2: Grid de Pokémon**
  - Se renderiza correctamente
  - Cada tarjeta exibe: imagen, nombre, tipo, número
  - Tarjetas tienen espaciado correcto
  - Responsivo en móvil (si CSS lo soporta)

- [ ] **T3: Click en tarjeta**
  - Click abre modal
  - Modal muestra datos correctos
  - Modal superpone el contenido

- [ ] **T4: Cerrar modal**
  - Botón X cierra modal
  - Click afuera cierra modal
  - Esc cierra modal (opcional)

- [ ] **T5: Búsqueda**
  - Input permite escribir
  - Botón busca Pokémon
  - Muestra resultado único
  - Muestra error si no existe

- [ ] **T6: Paginación**
  - Botones anterior/siguiente funcionan
  - Números de página funcionan
  - Se deshabilitan en extremos
  - Carga nuevo set de Pokémon

- [ ] **T7: Estados**
  - "Cargando..." se muestra durante fetch
  - Errores se muestran al usuario
  - Sin estado infinito

---

### Calidad de Código

- [ ] **C1: No hay console warnings**
  - ✅ Sin advertencias de React
  - ✅ Sin advertencias de dependencias
  - ✅ Sin problemas de keys en listas

- [ ] **C2: Estructura correcta**
  - ✅ Todos los archivos en lugares correctos
  - ✅ Imports/exports correctos
  - ✅ Componentes nombrados en PascalCase
  - ✅ Funciones nombradas en camelCase

- [ ] **C3: Buenas prácticas**
  - ✅ Props bien documentadas
  - ✅ useEffect con dependencias
  - ✅ Componentes modularizados
  - ✅ Sin duplicación de código

---

## 🐛 Debugging

Si algo no funciona, verifica:

### Errores Comunes

1. **"Cannot find module 'react'"**
   - Solución: `npm install`

2. **No aparecen Pokémon**
   - Verificar: ¿`usePokeAPI` se llama en App?
   - Verificar: ¿Los datos llegan a PokemonGrid?
   - Verificar: ¿La API responde? (Network tab)

3. **Modal no abre**
   - Verificar: ¿`onClick` en PokemonCard está correcto?
   - Verificar: ¿`selectedPokemon` se setea?
   - Verificar: ¿Modal recibe la prop?

4. **Paginación no funciona**
   - Verificar: ¿`handlePageChange` actualiza estado?
   - Verificar: ¿usePokeAPI tiene `[page]` como dependencia?

5. **Búsqueda no funciona**
   - Verificar: ¿`handleSearch` llama a `search()`?
   - Verificar: ¿Header pasa `onSearch` correctamente?

---

## 📊 Métricas de Progreso

```
Fase 1: [████░░░░░░] 40%
Fase 2: [░░░░░░░░░░] 0%
Fase 3: [░░░░░░░░░░] 0%
Fase 4: [░░░░░░░░░░] 0%

TOTAL:  [████░░░░░░] 10%
```

**Actualizar según avances:**

| Completadas | Total | Porcentaje |
|-------------|-------|-----------|
| 0 | 10 | 0% |
| 1 | 10 | 10% |
| 2 | 10 | 20% |
| ... | 10 | ... |
| 10 | 10 | 100% ✅ |

---

## 📝 Notas Personales

Espacio para anotar dudas, progreso y soluciones encontradas:

```
[Aquí puedes escribir notas mientras avanzas]



```

---

## 🎓 Recursos de Ayuda

Si te atascas en algún punto:

1. **Revisar MIGRATION_GUIDE.md** - Tiene código específico
2. **Revisar api_pelis/** - Ver patrón en código real
3. **Revisar pokeapi - original/** - Ver estructura HTML
4. **Buscar error en console** - Copiar y buscar en Google
5. **Revisar GUIA_REACT.md** - Conceptos teóricos

---

## 🏁 Finalización

Cuando hayas completado todo:

- [ ] Todos los tests pasan (T1-T7)
- [ ] Código sin warnings (C1-C3)
- [ ] 10/10 tareas completadas
- [ ] Mismo funcionamiento que `pokeapi - original/`

**¡Felicidades! 🎉 Has mirado de Vanilla JS a React exitosamente.**

---

Última actualización: 26 de febrero, 2026
