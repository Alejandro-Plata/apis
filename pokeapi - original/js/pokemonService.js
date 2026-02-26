/**
 * ===================================
 * POKÉMON SERVICE - Vanilla JavaScript
 * ===================================
 * 
 * Gestiona datos de pokémon desde PokeAPI
 */

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_PER_PAGE = 20;

function isShiny() {
    return Math.random() < 0.1;
}

/**
 * Obtiene pokémon de la API por página
 * @param {number} page - Número de página (1-indexed)
 * @returns {Promise<Object>} - Objeto con pokémon y total
 * Tiene en cuenta si el pokemon es shiny o no
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
        
        // Transformar datos al formato que necesitamos
        const formattedPokemon = pokemonDetails.map(poke => {
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
                height: poke.height / 10, // Convertir decímetros a metros
                weight: poke.weight / 10, // Convertir hectogramos a kilogramos
                description: getDefaultDescription(poke.name),
                isShiny: isShinyPokemon // Determinar si es shiny según la función
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
 * Descripción por defecto para pokémon
 */
function getDefaultDescription(name) {
    const descriptions = {
        'pikachu': '¡Pika Pika! El Pokémon más famoso. Puede generar electricidad de sus mejillas.',
        'charizard': 'Un dragón clásico que escupe fuego. Poderoso y majestuoso.',
        'blastoise': 'Evolucionado de Squirtle. Tiene cañones de agua en su caparazón.',
        'venusaur': 'Pokémon de planta evolucionado. Tiene una flor en su espalda.',
        'gengar': 'Pokémon fantasma. Puede desvanecerse en las sombras.',
        'dragonite': 'Dragón final. Vuela a velocidades increíbles.',
        'alakazam': 'Pokémon psíquico extremadamente inteligente.',
        'machamp': 'Pokémon lucha con 4 brazos musculosos.',
        'arcanine': 'Pokémon fuego rápido y feroz.',
        'lapras': 'Pokémon acuático gigante y gentil.',
    };
    
    return descriptions[name.toLowerCase()] || 
        `${name} es un Pokémon fascinante con habilidades únicas y características especiales.`;
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
 * Busca un pokémon por nombre o ID
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

        return {
            id: poke.id,
            name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
            types: poke.types.map(t => t.type.name),
            image: image,
            height: poke.height / 10,
            weight: poke.weight / 10,
            description: getDefaultDescription(poke.name),
            isShiny: isShinyPokemon
        };
    } catch (error) {
        console.error('Error buscando pokémon:', error);
        throw error;
    }
}
