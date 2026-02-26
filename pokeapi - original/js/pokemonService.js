/**
 * ===================================
 * POKÉMON SERVICE - Vanilla JavaScript
 * ===================================
 *
 * Gestiona datos de pokémon desde PokeAPI.
 *
 * ENDPOINTS UTILIZADOS:
 *   - https://pokeapi.co/api/v2/pokemon          → Datos generales (tipos, imagen, peso, altura)
 *   - https://pokeapi.co/api/v2/pokemon-species  → Descripción de la Pokédex
 */

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species';
const POKEMON_PER_PAGE = 20;

function isShiny() {
    return Math.random() < 0.1;
}

/**
 * Obtiene la descripción de un pokémon desde el endpoint de especies.
 * Prioriza español; si no existe, usa inglés.
 *
 * @param {number} id - ID del pokémon
 * @returns {Promise<string>} - Texto de la descripción
 */
async function fetchPokemonDescription(id) {
    try {
        const response = await fetch(`${SPECIES_API_URL}/${id}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const data = await response.json();

        // Buscar descripción en español primero, luego en inglés
        const entry =
            data.flavor_text_entries.find(e => e.language.name === 'es') ||
            data.flavor_text_entries.find(e => e.language.name === 'en');

        if (!entry) return 'Sin descripción disponible.';

        // Limpiar saltos de línea y caracteres especiales del texto
        return entry.flavor_text.replace(/[\n\f\r]/g, ' ');
    } catch {
        return 'Sin descripción disponible.';
    }
}

/**
 * Obtiene pokémon de la API por página.
 *
 * @param {number} page - Número de página (1-indexed)
 * @returns {Promise<Object>} - { pokemon[], total, totalPages }
 */
async function fetchPokemonPage(page) {
    try {
        const offset = (page - 1) * POKEMON_PER_PAGE;
        const url = `${API_URL}?limit=${POKEMON_PER_PAGE}&offset=${offset}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const data = await response.json();

        // Obtener detalles completos de cada pokémon
        const pokemonPromises = data.results.map(pokemon =>
            fetch(pokemon.url).then(res => res.json())
        );

        const pokemonDetails = await Promise.all(pokemonPromises);

        // Obtener descripción real para cada pokémon desde species
        const descriptionPromises = pokemonDetails.map(poke =>
            fetchPokemonDescription(poke.id)
        );
        const descriptions = await Promise.all(descriptionPromises);

        // Transformar datos al formato que necesitamos
        const formattedPokemon = pokemonDetails.map((poke, i) => {
            const isShinyPokemon = isShiny();

            // Obtener imágenes: shiny si es shiny y existe, sino normal
            const shinyImage = poke.sprites.other['official-artwork'].front_shiny;
            const normalImage = poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default;
            const image = (isShinyPokemon && shinyImage) ? shinyImage : normalImage;

            return {
                id: poke.id,
                name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
                types: poke.types.map(t => t.type.name),
                image: image,
                height: poke.height / 10,  // Decímetros → metros
                weight: poke.weight / 10,  // Hectogramos → kilogramos
                description: descriptions[i],
                isShiny: isShinyPokemon
            };
        });

        return {
            pokemon: formattedPokemon,
            total: data.count,
            totalPages: Math.ceil(data.count / POKEMON_PER_PAGE)
        };
    } catch (error) {
        console.error('Error fetching pokémon:', error);
        throw error;
    }
}

/**
 * Mapeo de colores para tipos
 */
const TYPE_COLORS = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

/**
 * Obtiene el color para un tipo específico
 */
function getTypeColor(type) {
    return TYPE_COLORS[type] || '#999999';
}

/**
 * Formatea el número de pokédex: #025, #001, etc.
 */
function formatPokemonNumber(num) {
    return '#' + String(num).padStart(3, '0');
}

/**
 * Busca un pokémon por nombre o ID.
 *
 * @param {string} query - Nombre o ID del pokémon
 * @returns {Promise<Object>} - Pokémon formateado
 */
async function fetchPokemonByName(query) {
    try {
        const url = `${API_URL}/${query.toLowerCase().trim()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const poke = await response.json();
        const isShinyPokemon = isShiny();

        const shinyImage = poke.sprites.other['official-artwork'].front_shiny;
        const normalImage = poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default;
        const image = (isShinyPokemon && shinyImage) ? shinyImage : normalImage;

        // Obtener descripción real desde el endpoint de especies
        const description = await fetchPokemonDescription(poke.id);

        return {
            id: poke.id,
            name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
            types: poke.types.map(t => t.type.name),
            image: image,
            height: poke.height / 10,  // Decímetros → metros
            weight: poke.weight / 10,  // Hectogramos → kilogramos
            description: description,
            isShiny: isShinyPokemon
        };
    } catch (error) {
        console.error('Error buscando pokémon:', error);
        throw error;
    }
}
