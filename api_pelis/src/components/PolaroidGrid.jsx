import React from 'react';
import TarjetaItem from './PolaroidCard';

export default function GrillaItems({ items, esMovie, alHacer }) {
  return (
    <div className="scrapbook-container">
      <div className="polaroid-grid">
        {items.map((item, index) => (
          <TarjetaItem 
            key={item.id} 
            item={item} 
            esMovie={esMovie}
            alHacer={alHacer}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
