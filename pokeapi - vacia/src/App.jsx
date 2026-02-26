import { useState } from 'react';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import usePokeAPI from './hooks/usePokeAPI';

/**
 * Componente principal de la aplicación
 * Gestiona el estado global y coordina todos los componentes
 */
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { pokemon, loading, error, totalPages, search } = usePokeAPI(currentPage);

  /**
   * Maneja búsqueda de Pokémon
   * @param {string} query - Nombre del Pokémon a buscar
   */
  const handleSearch = (query) => {
    if (query.trim()) {
      search(query);
      setCurrentPage(1);
      setSelectedPokemon(null);
    }
  };

  /**
   * Maneja cambio de página
   * @param {number} page - Número de página
   */
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedPokemon(null); // Cerrar modal al cambiar página
      window.scrollTo(0, 0); // Scroll al inicio
    }
  };

  return (
    <div className="main-container">
      <Header onSearch={handleSearch} />
      
      {error && (
        <div style={{
          backgroundColor: '#ffcccc',
          color: '#cc0000',
          padding: '15px',
          margin: '20px auto',
          maxWidth: '800px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          ⚠️ {error}
        </div>
      )}
      
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          fontSize: '18px',
          color: '#666'
        }}>
          ⏳ Cargando Pokémon...
        </div>
      ) : (
        <>
          <PokemonGrid 
            pokemon={pokemon} 
            onCardClick={setSelectedPokemon}
          />
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <Modal 
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default App;
