import { useState } from "react";

function Playlist({ playlistSongs, setCurrentSong, onRemoveFromPlaylist }) {
  const [search, setSearch] = useState("");

  // 🔍 Filtrar canciones de la playlist
  const filteredSongs = playlistSongs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div style={{ marginTop: "30px", borderTop: "1px solid #333", paddingTop: "15px" }}>
      <h3 style={{ margin: "0 0 15px 0", color: "#1db954" }}>
        Mi Playlist ({playlistSongs.length})
      </h3>
      
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
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div onClick={() => setCurrentSong(song)} style={{ flex: 1, cursor: "pointer" }}>
            <p>{song.title}</p>
            <small>{song.artist}</small>
          </div>
          <button
            onClick={() => onRemoveFromPlaylist(song.id)}
            style={{ 
              padding: "5px 10px", 
              fontSize: "12px",
              marginLeft: "10px",
              backgroundColor: "#d32f2f"
            }}
          >
            ❌
          </button>
        </div>
      ))}

      {/* ❌ si no hay canciones */}
      {playlistSongs.length === 0 && (
        <p style={{ color: "#888", fontSize: "14px" }}>
          Tu playlist está vacía. ¡Añade canciones desde Todas las Canciones!
        </p>
      )}

      {/* ✅ si hay canciones pero la búsqueda no encuentra nada */}
      {playlistSongs.length > 0 && filteredSongs.length === 0 && (
        <p style={{ color: "#888", fontSize: "14px" }}>No se encontraron canciones</p>
      )}
    </div>
  );
}

export default Playlist;