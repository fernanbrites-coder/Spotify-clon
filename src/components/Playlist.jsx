import { useState } from "react";

function SongList({ songs, setCurrentSong }) {
  const [search, setSearch] = useState("");

  // 🔍 Filtrar canciones
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div>
      {/* 🔍 INPUT */}
      <input
        type="text"
        placeholder="Buscar canción..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "none"
        }}
      />

      {/* 🎵 LISTA */}
      {filteredSongs.map((song) => (
        <div
          key={song.id}
          className="song"
          onClick={() => setCurrentSong(song)}
        >
          <p>{song.title}</p>
          <small>{song.artist}</small>
        </div>
      ))}

      {/* ❌ si no hay resultados */}
      {filteredSongs.length === 0 && (
        <p>No se encontraron canciones</p>
      )}
    </div>
  );
}

export default SongList;