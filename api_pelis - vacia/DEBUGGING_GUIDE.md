# 🐛 Debugging & Troubleshooting - Guía de Ayuda

Cuando algo no funcione, **no te desesperes**. La mayoría de errores React son fáciles de resolver si sabes dónde mirar.

---

## 🔍 ¿Cómo debuggear en React?

### 1. Abre la Consola del Navegador

Presiona `F12` o `Ctrl+Shift+I` en Windows, o `Cmd+Option+I` en Mac.

Verás dos cosas importantes:
- **Errores en rojo** - Cosas que están mal
- **Warnings en amarillo** - Cosas que podrían estar mejor

### 2. console.log() es tu amigo

```javascript
const buscarPeliculas = async (consulta) => {
  console.log('Buscando:', consulta);
  const respuesta = await fetch(url);
  console.log('Respuesta del servidor:', respuesta);
  const datos = await respuesta.json();
  console.log('Datos recibidos:', datos);
  setPeliculas(datos.results);
};
```

### 3. React DevTools

Descarga la extensión "React Developer Tools" en Chrome o Firefox. Te permite:
- Ver el árbol de componentes
- Inspeccionar el estado de cada componente
- Ver qué props recibe cada componente

---

## ❌ Errores comunes (y cómo arreglarlos)

### Error: "useState is not defined"

**Problema:** Olvidaste importar useState

```javascript
// ❌ MALO
import React from 'react';

// ✅ BUENO
import React, { useState } from 'react';
// o
import { useState } from 'react';
```

---

### Error: "Cannot read property 'map' of undefined"

**Problema:** Tu estado no es un array, probablemente es `null` o `undefined`

```javascript
// ❌ MALO
const [peliculas, setPeliculas] = useState(null);

// ✅ BUENO
const [peliculas, setPeliculas] = useState([]);

// O verifica antes de usar .map()
{peliculas && peliculas.map(...)}
{peliculas?.map(...)} // Optional chaining
```

---

### Error: "Expected 2 arguments, but got X"

**Problema:** Olvidaste pasar un argumento requerido a una función

```javascript
// ❌ MALO
<PolaroidCard item={pelicula} />

// ✅ BUENO (si PolaroidCard espera onSeleccionar)
<PolaroidCard item={pelicula} onSeleccionar={handleSelect} />
```

---

### Error: "Missing 'key' prop"

**Problema:** Cuando haces .map(), cada elemento necesita una `key` única

```javascript
// ❌ MALO
{peliculas.map((pelicula) => (
  <Card item={pelicula} /> 
))}

// ✅ BUENO
{peliculas.map((pelicula) => (
  <Card key={pelicula.id} item={pelicula} /> 
))}
```

---

### Error: "Unexpected token '<' in JSON.parse"

**Problema:** La respuesta del servidor no es JSON válido

```javascript
// Verifica que la respuesta sea JSON
const respuesta = await fetch(url);
console.log(respuesta.status); // 200 es bueno, 404 es malo
const datos = await respuesta.json();
console.log(datos); // Mira qué llegó realmente
```

---

### Las películas no aparecen

**Checklist:**
1. ¿Hiciste el fetch? - `console.log()` después del fetch
2. ¿Los datos llegan? - Mira `datos.results` en la consola
3. ¿El estado se actualiza? - Usa React DevTools para ver
4. ¿El .map() funciona? - Prueba con datos estáticos primero

```javascript
// Prueba con datos estáticos
const [peliculas, setPeliculas] = useState([
  { id: 1, title: 'Película de prueba', poster_path: '/...' }
]);
```

---

### El botón de búsqueda no funciona

**Checklist:**
1. ¿Tiene `type="submit"`? - Necesita `onSubmit` en el `<form>`
2. ¿Llamaste a `e.preventDefault()`? - Si no, la página se recarga
3. ¿Conectaste `onChange` al input? - Necesitas `onChange={(e) => setConsulta(e.target.value)}`

```javascript
// ✅ CORRECTO
<form onSubmit={(e) => {
  e.preventDefault(); // Importante!
  buscarPeliculas(consulta);
}}>
  <input 
    value={consulta}
    onChange={(e) => setConsulta(e.target.value)}
  />
  <button type="submit">Buscar</button>
</form>
```

---

### El modal no abre

**Checklist:**
1. ¿Importaste `useRef`? - Necesario para controlar el `<dialog>`
2. ¿Usaste `dialogRef.current.showModal()`? - No `open={abierto}`
3. ¿El useEffect tiene `[abierto, item]` como dependencias? - Importante

```javascript
// ✅ CORRECTO
export default function DetailModal({ item, abierto, onCerrar }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (abierto && item && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!abierto && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [abierto, item]); // Dependencias

  return <dialog ref={dialogRef}>{...}</dialog>;
}
```

---

## 🌐 Problemas de API (TMDB)

### "Invalid API key"

```javascript
// ❌ MALO - API Key incorrecta o falta
const url = `https://api.themoviedb.org/3/search/movie?api_key=invalid&query=test`;

// ✅ BUENO
const apiKey = 'TU_API_KEY_REAL_AQUI'; // Cópiala de TMDB
const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${consulta}`;
```

### "404" - Recurso no encontrado

Significa que la URL es incorrecta. Verifica:
- El `api_key` es correcto
- El `query` está en la URL
- Estás usando `/search/movie` o `/search/tv` según corresponda

```javascript
// Debug: Imprime la URL que estás usando
console.log('URL:', url);
```

### Sin resultados aunque búscas bien

Probablemente la API retorna `results: []` (array vacío). Verifica:
- ¿Escribiste bien el nombre de la película?
- ¿Añadiste `&language=es-ES`? (es recomendable pero no obligatorio)

```javascript
console.log('Resultados:', datos.results.length);
```

---

## 💻 Herramientas útiles

### 1. Network Tab (F12)
Ve a la pestaña **Network** para ver las llamadas HTTP:
- ¿Se enviaron?
- ¿Status 200 (éxito) o error?
- ¿Qué datos retornó?

### 2. Console Tab
Úsalo para:
- Ver `console.log()` que escribiste
- Ver errores en rojo
- Evaluar código en vivo: `peliculas.length`

### 3. Sources Tab
Para poner breakpoints y ejecutar paso a paso:
- Haz click en el número de línea
- El código se para en ese punto
- Puedes inspeccionar variables

---

## 🎯 Pasos para debuggear eficientemente

1. **Lee el error** en la consola - Dice dónde está el problema
2. **Localiza la línea** de código que causa el error
3. **Añade console.log()** antes y después de esa línea
4. **Actualiza la página** (F5) y mira la consola
5. **Repite** hasta aislar el problema
6. **Arregla** el código basándote en lo que viste

---

## 📝 Template de debugging

Cuando algo no funcione, usa este template:

```javascript
const buscarPeliculas = async (consulta) => {
  console.log('1. Iniciando búsqueda con:', consulta);
  
  try {
    const apiKey = 'TU_KEY';
    console.log('2. API Key:', apiKey);
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${consulta}`;
    console.log('3. URL:', url);
    
    const respuesta = await fetch(url);
    console.log('4. Respuesta status:', respuesta.status);
    
    const datos = await respuesta.json();
    console.log('5. Datos recibidos:', datos);
    
    console.log('6. Resultados encontrados:', datos.results.length);
    setPeliculas(datos.results);
    
  } catch (error) {
    console.error('ERROR:', error);
  }
};
```

Esto te mostrará exactamente dónde está el problema.

---

## ✅ Checklist final antes de pedir ayuda

- [ ] ¿Revisé la consola (F12)?
- [ ] ¿Agregué console.log() para ver qué pasa?
- [ ] ¿El API Key es correcto?
- [ ] ¿Importé todos los hooks que usé?
- [ ] ¿Pasé las props necesarias?
- [ ] ¿Guardé el archivo?
- [ ] ¿Actualicé la página del navegador (F5)?

Si respondiste "sí" a todo y aún no funciona, **¡es hora de pedir ayuda!**  
Cuando lo hagas, incluye:
- El error exacto de la consola
- El código que está fallando
- Lo que capturaste en console.log()

¡Buena suerte! 🍀
