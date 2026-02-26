import { useState, useEffect } from 'react';
import { getPokemonPage, searchPokemon } from '../services/pokemonService';

/**
 * Custom hook para consumir PokeAPI
 * Maneja estado de carga, error y datos de Pokémon
 * 
 * @param {number} page - Página actual (defecto: 1)
 * @returns {Object} - { pokemon, loading, error, totalPages, search }
 */
function usePokeAPI(page = 1) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  /**
   * Carga Pokémon de la página actual
   */
  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const { pokemon, totalPages } = await getPokemonPage(page);
        setPokemon(pokemon);
        setTotalPages(totalPages);
      } catch (err) {
        setError(err.message || 'Error desconocido');
        setPokemon([]);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [page]); // Re-ejecutar cuando 'page' cambia

  /**
   * Busca un Pokémon por nombre
   * @param {string} name - Nombre del Pokémon a buscar
   */
  const search = async (name) => {
    if (!name.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await searchPokemon(name);
      setPokemon([result]);
      setTotalPages(1);
    } catch (err) {
      setError('Pokémon no encontrado. Intenta con otro nombre.');
      setPokemon([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  return { 
    pokemon, 
    loading, 
    error, 
    totalPages, 
    search 
  };
}

export default usePokeAPI;
