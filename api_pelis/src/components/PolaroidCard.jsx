import React from 'react';
import { obtenerColorRating } from '../services/tmdbService';

export default function TarjetaItem({ item, esMovie, alHacer, index }) {
  const titulo = esMovie ? item.title : item.name;
  const rating = (item.vote_average / 2).toFixed(1);
  const poster = item.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
    : 'https://via.placeholder.com/300x450?text=Sin+Poster';

  const colorClass = obtenerColorRating(item.vote_average);
  const esRosa = index % 2 === 1;

  return (
    <div className="polaroid" onClick={() => alHacer(item)}>
      <div className={`washi-tape ${esRosa ? 'pink-tape' : ''}`}></div>
      <div className="photo-frame">
        <img src={poster} alt={titulo} />
        <div className={`sticker-score ${colorClass}`}>{rating}</div>
      </div>
      <div className="handwritten-caption">
        <h3>{titulo}</h3>
      </div>
    </div>
  );
}
