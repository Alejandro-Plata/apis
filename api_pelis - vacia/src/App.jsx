import Header from './components/Header';
import Navigation from './components/Navigation';
import SearchFilter from './components/SearchFilter';
import PolaroidGrid from './components/PolaroidGrid';
import DetailModal from './components/DetailModal';

// TODO: Aquí tendrás que:
// 1. Importar useState para manejar el estado
// 2. Crear estados para: películas/series, búsqueda, tipo de contenido, modal
// 3. Crear una función para hacer fetch a la API de TMDB
// 4. Pasar props a los componentes
// 5. Manejar los eventos de búsqueda y cambio de tipo

export default function App() {
  return (
    <div className="app">
      <Header />
      <Navigation />
      <SearchFilter />
      <PolaroidGrid />
      <DetailModal />
    </div>
  );
}
