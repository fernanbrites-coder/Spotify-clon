import { useState } from "react";

function Playlist({ songs, setCurrentSong }) {
  const [search, setSearch] = useState("");

  // 🔍 Filtrar canciones
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div style={{ marginTop: "30px", borderTop: "1px solid #333", paddingTop: "15px" }}>
      <h3 style={{ margin: "0 0 15px 0", color: "#1db954" }}>Mi Playlist</h3>
      
      {/* 🔍 INPUT */}
      <input
        type="text"
        placeholder="Buscar en playlist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "none",
          boxSizing: "border-box"
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
        <p style={{ color: "#888", fontSize: "14px" }}>No se encontraron canciones</p>
      )}
    </div>
  );
}

export default Playlist;