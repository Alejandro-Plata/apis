import React from 'react';

export default function ListaEpisodios({ episodios }) {
  if (!episodios || episodios.length === 0) {
    return null;
  }

  return (
    <div className="playlist-section">
      <h3>🎀 Episodios</h3>
      <div className="playlist-scroll">
        {episodios.map((ep, i) => (
          <div key={i} className="track-item">
            <div className="play-circle">▶</div>
            <div className="track-info">
              <span className="t-title">{ep.episode_number}. {ep.name}</span>
              <span className="t-time">{ep.runtime} min</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
