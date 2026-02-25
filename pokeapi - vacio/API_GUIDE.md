# 🔗 PokeAPI - Guía de Peticiones

Cómo obtener datos reales de Pokémon desde PokeAPI.

## 1. ¿Qué es PokeAPI?

Es una **API pública gratuita** con datos de todos los Pokémon.

- URL: `https://pokeapi.co/api/v2/`
- No requiere autenticación
- Límite: 100 peticiones por minuto (más que suficiente)

---

## 2. Endpoints Útiles

### Obtener Lista de Pokémon:
```
GET https://pokeapi.co/api/v2/pokemon?limit=100
```

**Respuesta:**
```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?limit=100&offset=100",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    ...
  ]
}
```

### Obtener Detalles de UN Pokémon:
```
GET https://pokeapi.co/api/v2/pokemon/25/
```

**Respuesta (parcial):**
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
}
```

---

## 3. Cómo Hacer Peticiones con Fetch

### Básico:
```javascript
fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Con Async/Await:
```javascript
async function fetchPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchPokemon();
```

---

## 4. Extraer ID de la URL

La API te devuelve URLs así:
```
https://pokeapi.co/api/v2/pokemon/25/
```

Necesitas extraer el ID (25):

```javascript
const url = "https://pokeapi.co/api/v2/pokemon/25/";
const id = url.split('/')[6];  // "25"

// Obtener imagen
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
```

---

## 5. Custom Hook: usePokeAPI

Aquí está el hook completo para usar en App.jsx:

```jsx
// src/hooks/usePokeAPI.js
import { useState, useEffect } from 'react';

export function usePokeAPI() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPokemon(data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);  // Solo una vez al cargar

  return { pokemon, loading, error };
}
```

### Cómo usarlo:
```jsx
import { usePokeAPI } from './hooks/usePokeAPI';

function App() {
  const { pokemon, loading, error } = usePokeAPI();

  if (loading) return <p>Cargando Pokémon...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{pokemon.length} Pokémon cargados</h1>
      {pokemon.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
}
```

---

## 6. Búsqueda Filtrada (Sin API)

Para la búsqueda, NO hagas peticiones nuevas. Filtra el array que ya tienes:

```jsx
function App() {
  const { pokemon } = usePokeAPI();
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setFiltered(pokemon);
  }, [pokemon]);

  const handleSearch = (q) => {
    setQuery(q);
    
    if (!q) {
      setFiltered(pokemon);
    } else {
      const results = pokemon.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );
      setFiltered(results);
    }
  };

  return (
    <>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar pokémon..."
      />
      <p>{filtered.length} resultados</p>
    </>
  );
}
```

---

## 7. Conseguir Detalles Completos (Opcional)

Si quieres stats, ataques, etc:

```javascript
async function getPokemonDetails(name) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}/`
  );
  const data = await response.json();
  
  return {
    name: data.name,
    id: data.id,
    height: data.height,
    weight: data.weight,
    image: data.sprites.front_default,
    types: data.types,
    stats: data.stats,
  };
}

// Uso:
const pikachu = await getPokemonDetails('pikachu');
console.log(pikachu);
```

**Estructura de stats:**
```javascript
{
  "stat": { "name": "hp", ... },
  "base_stat": 35,
  "effort": 0
}
```

---

## 8. Alternativa: Axios (Opcional)

Si prefieres axios en lugar de fetch:

```bash
npm install axios
```

```jsx
import axios from 'axios';

async function fetchPokemon() {
  try {
    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=100'
    );
    console.log(data.results);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 9. Tips y Trucos

### Evitar Problema CORS:
PokeAPI tiene CORS habilitado, así que fetch directo funciona. ✅

### Cache de Imágenes:
Las imágenes se cargan de GitHub, que las cachea bien. Rápido! ⚡

### Manejo de Errores:
```javascript
try {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  
  const data = await response.json();
} catch (error) {
  console.error('Fetch fallé:', error);
}
```

---

## 📊 Ejemplo Completo

```jsx
import { useState, useEffect } from 'react';

export function usePokeAPI() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=100'
        );
        const data = await res.json();
        setPokemon(data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { pokemon, loading, error };
}
```

---

## ✅ Checklist

- [ ] Entiendo qué es PokeAPI
- [ ] Sé hacer un fetch básico
- [ ] Puedo extraer ID de URLs
- [ ] Sé cómo crear usePokeAPI hook
- [ ] Puedo filtrar sin hacer API calls nuevas
- [ ] Entiendo manejo de errores

¡Listo para codear! 🚀
