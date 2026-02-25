import React, { useState } from 'react';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';
import PokemonModal from './components/PokemonModal';
import { getAllPokemon, searchPokemon } from './services/pokemonService';
import './style.css';

/**
 * ===================================
 * COMPONENTE PRINCIPAL: App
 * ===================================
 * 
 * Este es el componente raíz que maneja:
 * - Estado global de la aplicación
 * - Props que pasa a los componentes hijos
 * - Funciones de callback
 */

export default function App() {
  // Estado 1: Todos los pokémon (nunca cambia)
  const [allPokemon] = useState(getAllPokemon());
  
  // Estado 2: Pokémon mostrados actualmente (filtrados o todos)
  const [displayedPokemon, setDisplayedPokemon] = useState(allPokemon);
  
  // Estado 3: Pokémon seleccionado para el modal
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  // Estado 4: Si el modal está abierto o no
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Manejador de búsqueda
   * Se ejecuta cada vez que el usuario escribe en el input
   */
  const handleSearch = (query) => {
    const results = searchPokemon(query);
    setDisplayedPokemon(results);
  };

  /**
   * Manejador del click en una tarjeta
   * Abre el modal con los detalles del pokémon
   */
  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  /**
   * Manejador del cierre del modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="app main-container">
      {/* Header con buscador */}
      <Header onSearch={handleSearch} />
      
      {/* Grid de pokémon */}
      <PokemonGrid 
        pokemon={displayedPokemon}
        onCardClick={handleCardClick}
      />
      
      {/* Modal de detalles */}
      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
