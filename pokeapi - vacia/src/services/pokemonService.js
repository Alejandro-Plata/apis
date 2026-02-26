/**
 * Servicio para consumir PokeAPI
 * Maneja todas las llamadas a la API de Pokémon
 */

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_PER_PAGE = 20;

/**
 * Determina aleatoriamente si un Pokémon es shiny (brillo especial)
 * 10% de probabilidad
 */
function isShiny() {
  return Math.random() < 0.1;
}

/**
 * Transforma datos de la API a formato utilizable
 * @param {Object} data - Datos crudos de PokeAPI
 * @returns {Object} - Pokémon transformado
 */
function transformPokemonData(data) {
  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image: data.sprites?.other['official-artwork']?.front_default || data.sprites?.front_default,
    height: `${(data.height / 10).toFixed(1)}m`,
    weight: `${(data.weight / 10).toFixed(1)}kg`,
    types: data.types?.map(t => t.type.name) || [],
    isShiny: isShiny(),
  };
}

/**
 * Obtiene una página de Pokémon
 * @param {number} page - Número de página (1-indexed)
 * @returns {Promise<Object>} - { pokemon: Array, totalPages: number }
 */
export async function getPokemonPage(page = 1) {
  try {
    const offset = (page - 1) * POKEMON_PER_PAGE;
    const url = `${API_URL}?limit=${POKEMON_PER_PAGE}&offset=${offset}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener Pokémon');
    
    const data = await response.json();
    
    // Obtener detalles de cada Pokémon en paralelo
    const pokemonDetails = await Promise.all(
      data.results.map(p => 
        fetch(`${API_URL}/${p.name}`)
          .then(r => r.json())
          .catch(err => {
            console.error(`Error al obtener ${p.name}:`, err);
            return null;
          })
      )
    );

    const validPokemon = pokemonDetails
      .filter(p => p !== null)
      .map(transformPokemonData);

    return {
      pokemon: validPokemon,
      totalPages: Math.ceil(data.count / POKEMON_PER_PAGE),
    };
  } catch (error) {
    console.error('Error en getPokemonPage:', error);
    throw error;
  }
}

/**
 * Busca un Pokémon por nombre
 * @param {string} name - Nombre del Pokémon
 * @returns {Promise<Object>} - Datos del Pokémon encontrado
 */
export async function searchPokemon(name) {
  try {
    const response = await fetch(`${API_URL}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon no encontrado');
    
    const data = await response.json();
    return transformPokemonData(data);
  } catch (error) {
    console.error('Error en searchPokemon:', error);
    throw error;
  }
}

/**
 * Obtiene datos extendidos de un Pokémon (para modal)
 * @param {number|string} id - ID o nombre del Pokémon
 * @returns {Promise<Object>} - Datos completos del Pokémon
 */
export async function getPokemonDetails(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Pokémon no encontrado');
    
    const data = await response.json();
    return transformPokemonData(data);
  } catch (error) {
    console.error('Error en getPokemonDetails:', error);
    throw error;
  }
}
