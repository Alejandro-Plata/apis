// TODO: Tarea 3 - usePokeAPI Hook
// Ver TASKS.md y API_GUIDE.md para código de ejemplo

import { useState, useEffect } from 'react';

export function usePokeAPI() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Agregar useEffect con fetch aquí

  return { pokemon, loading, error };
}
