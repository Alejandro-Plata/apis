/**
 * ===================================
 * POKÉMON SERVICE
 * ===================================
 * 
 * Toda la lógica de negocio separada de React
 */

const POKEMON_DATA = [
    {
        id: 25,
        name: "Pikachu",
        types: ["electric"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        height: 0.4,
        weight: 6.0,
        description: "¡Pika Pika! Pikachu es el Pokémon más famoso. Puede generar electricidad de sus mejillas."
    },
    {
        id: 6,
        name: "Charizard",
        types: ["fire", "flying"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        height: 1.7,
        weight: 90.5,
        description: "Un dragón clásico que escupe fuego. Charizard es poderoso y majestuoso."
    },
    {
        id: 9,
        name: "Blastoise",
        types: ["water"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        height: 1.6,
        weight: 85.5,
        description: "Evolucionado de Squirtle. Tiene cañones de agua en su caparazón."
    },
    {
        id: 3,
        name: "Venusaur",
        types: ["grass", "poison"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        height: 2.0,
        weight: 100.0,
        description: "Pokémon de planta evolucionado. Tiene una flor en su espalda."
    },
    {
        id: 94,
        name: "Gengar",
        types: ["ghost", "poison"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        height: 1.5,
        weight: 40.5,
        description: "Pokémon fantasma. Puede desvanecerse en las sombras."
    },
    {
        id: 130,
        name: "Gyarados",
        types: ["water", "flying"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
        height: 6.5,
        weight: 235.0,
        description: "Un Pokémon acuático gigante y feroz. Evoluciona de Magikarp."
    },
    {
        id: 133,
        name: "Eevee",
        types: ["normal"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
        height: 0.3,
        weight: 6.5,
        description: "Eevee es un Pokémon adaptable con muchas posibles evoluciones."
    },
    {
        id: 26,
        name: "Raichu",
        types: ["electric"],
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
        height: 0.8,
        weight: 30.0,
        description: "La evolución de Pikachu. Más grande y más poderoso."
    }
];

/**
 * Obtiene TODOS los pokémon
 */
export function getAllPokemon() {
    return POKEMON_DATA;
}

/**
 * Busca pokémon por nombre (case-insensitive)
 */
export function searchPokemon(query) {
    if (!query.trim()) return POKEMON_DATA;
    
    return POKEMON_DATA.filter(poke =>
        poke.name.toLowerCase().includes(query.toLowerCase())
    );
}

/**
 * Obtiene un pokémon por ID
 */
export function getPokemonById(id) {
    return POKEMON_DATA.find(poke => poke.id === id);
}

/**
 * Formatea el número de pokédex: #025, #001, etc.
 */
export function formatPokemonNumber(num) {
    return '#' + String(num).padStart(3, '0');
}

/**
 * Mapeo de tipos a nombres en español
 */
export const TYPE_NAMES = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada'
};

/**
 * Convierte un tipo a su nombre en español
 */
export function formatTypeName(type) {
    return TYPE_NAMES[type] || type;
}
