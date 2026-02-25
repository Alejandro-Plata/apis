const API_KEY = '5d4491126a7a6d8767d99c5e668a1569';
const BASE_URL = 'https://api.themoviedb.org/3';

const mapearIdioma = (idioma) => idioma === 'en' ? 'en-US' : 'es-ES';

// PELÍCULAS
export async function obtenerPopularesPeliculas(pagina = 1, idioma = 'es') {
  try {
    const url = new URL(`${BASE_URL}/movie/popular`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('page', pagina);
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en obtenerPopularesPeliculas:', error.message);
    return null;
  }
}

export async function obtenerPeliculasOrdenadas(ordenPor = 'popularity', orden = 'desc', pagina = 1, idioma = 'es') {
  try {
    const sortMap = {
      'rating': `vote_average.${orden}`,
      'popularity': `popularity.${orden}`,
      'release_date': `release_date.${orden}`
    };
    
    const url = new URL(`${BASE_URL}/discover/movie`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('sort_by', sortMap[ordenPor] || 'popularity.desc');
    url.searchParams.append('page', pagina);
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en obtenerPeliculasOrdenadas:', error.message);
    return null;
  }
}

export async function buscarPeliculas(consulta, pagina = 1, idioma = 'es') {
  try {
    const url = new URL(`${BASE_URL}/search/movie`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('query', consulta);
    url.searchParams.append('page', pagina);
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en buscarPeliculas:', error.message);
    return null;
  }
}

export async function obtenerDetallesPeliculas(id, idioma = 'es') {
  try {
    const url = new URL(`${BASE_URL}/movie/${id}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('append_to_response', 'videos');
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en obtenerDetallesPeliculas:', error.message);
    return null;
  }
}

// SERIES
export async function obtenerPopularesSeries(pagina = 1, idioma = 'es') {
  try {
    const url = new URL(`${BASE_URL}/tv/popular`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('page', pagina);
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en obtenerPopularesSeries:', error.message);
    return null;
  }
}

export async function obtenerSeriesOrdenadas(ordenPor = 'popularity', orden = 'desc', pagina = 1, idioma = 'es') {
  try {
    const sortMap = {
      'rating': `vote_average.${orden}`,
      'popularity': `popularity.${orden}`,
      'first_air_date': `first_air_date.${orden}`
    };
    
    const url = new URL(`${BASE_URL}/discover/tv`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('sort_by', sortMap[ordenPor] || 'popularity.desc');
    url.searchParams.append('page', pagina);
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en obtenerSeriesOrdenadas:', error.message);
    return null;
  }
}

export async function buscarSeries(consulta, pagina = 1, idioma = 'es') {
  try {
    const url = new URL(`${BASE_URL}/search/tv`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('query', consulta);
    url.searchParams.append('page', pagina);
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en buscarSeries:', error.message);
    return null;
  }
}

export async function obtenerDetallesSeries(id, idioma = 'es') {
  try {
    const url = new URL(`${BASE_URL}/tv/${id}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', mapearIdioma(idioma));
    url.searchParams.append('append_to_response', 'videos');
    
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
    return await respuesta.json();
  } catch (error) {
    console.error('Error en obtenerDetallesSeries:', error.message);
    return null;
  }
}

// Función para obtener el color del rating
export function obtenerColorRating(rating) {
  const num = rating / 2;
  if (num >= 4.5) return 'rating-gold';
  if (num > 3.5) return 'rating-green';
  if (num > 2.5) return 'rating-yellow';
  if (num < 1.5) return 'rating-purple';
  return 'rating-red';
}
