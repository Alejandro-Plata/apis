import React from 'react';
import PolaroidCard from './PolaroidCard';

// TODO: Este componente recibirá un array de películas/series del App.jsx
// y deberá renderizar múltiples PolaroidCard usando .map()

export default function PolaroidGrid() {
  return (
    <div className="scrapbook-container">
      <div className="polaroid-grid">
        {/* TODO: Aquí irá: items.map((item) => <PolaroidCard key={item.id} item={item} />) */}
        <PolaroidCard />
        <PolaroidCard />
        <PolaroidCard />
        <PolaroidCard />
      </div>
    </div>
  );
}
