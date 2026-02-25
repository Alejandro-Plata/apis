import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SearchFilter from './components/SearchFilter';
import PolaroidGrid from './components/PolaroidGrid';
import DetailModal from './components/DetailModal';
import { 
  obtenerPopularesPeliculas, obtenerPopularesSeries,
  obtenerPeliculasOrdenadas, obtenerSeriesOrdenadas,
  buscarPeliculas, buscarSeries,
  obtenerDetallesPeliculas, obtenerDetallesSeries
} from './services/tmdbService';

export default function App() {
  const [tipo, setTipo] = useState('peliculas');
  const [idioma, setIdioma] = useState('es');
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modal, setModal] = useState({ abierto: false, item: null });
  const [ordenPor, setOrdenPor] = useState('popularity');
  const [orden, setOrden] = useState('desc');
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  // Cargar películas/series al cambiar tipo, idioma, orden o dirección
  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      let respuesta;
      
      if (busquedaActiva) {
        // Si hay búsqueda activa, no hacer nada hasta que se busque
        setCargando(false);
        return;
      }

      if (tipo === 'peliculas') {
        respuesta = await obtenerPeliculasOrdenadas(ordenPor, orden, 1, idioma);
      } else {
        respuesta = await obtenerSeriesOrdenadas(ordenPor, orden, 1, idioma);
      }

      if (respuesta?.results) {
        setItems(respuesta.results);
      }
      setCargando(false);
    };
    cargar();
  }, [tipo, idioma, ordenPor, orden, busquedaActiva]);

  const manejarBuscar = async (consulta) => {
    if (!consulta.trim()) {
      setBusquedaActiva(false);
      return;
    }
    setCargando(true);
    const respuesta = tipo === 'peliculas'
      ? await buscarPeliculas(consulta, 1, idioma)
      : await buscarSeries(consulta, 1, idioma);
    if (respuesta?.results) {
      setItems(respuesta.results);
      setBusquedaActiva(true);
    }
    setCargando(false);
  };

  const manejarTarjeta = async (item) => {
    setCargando(true);
    const detalles = tipo === 'peliculas'
      ? await obtenerDetallesPeliculas(item.id, idioma)
      : await obtenerDetallesSeries(item.id, idioma);
    setModal({ abierto: true, item: detalles });
    setCargando(false);
  };

  return (
    <div className="app">
      <Header idioma={idioma} alCambiarIdioma={setIdioma} />
      <Navigation tipo={tipo} alCambiarTipo={setTipo} />
      <SearchFilter 
        alBuscar={manejarBuscar} 
        ordenPor={ordenPor}
        alCambiarOrdenPor={setOrdenPor}
        orden={orden}
        alCambiarOrden={setOrden}
      />
      <PolaroidGrid 
        items={items} 
        esMovie={tipo === 'peliculas'} 
        alHacer={manejarTarjeta}
        cargando={cargando}
      />
      <DetailModal 
        item={modal.item} 
        abierto={modal.abierto} 
        alCerrar={() => setModal({ abierto: false, item: null })}
        esMovie={tipo === 'peliculas'}
      />
    </div>
  );
}
