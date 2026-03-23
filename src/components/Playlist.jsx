import { useState, useEffect } from "react";

function Playlist({ songs, setCurrentSong }) {
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlists");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");

  // 💾 Guardar
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // ➕ Crear playlist
  const createPlaylist = () => {
    if (!name.trim()) return;

    const newPlaylist = {
      name: name,
      songs: []
    };

    const updatedPlaylists = [...playlists, newPlaylist];
    setPlaylists(updatedPlaylists);
    setName("");
  };

  // ➕ Agregar canción
  const addToPlaylist = (playlistIndex, song) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists[playlistIndex].songs.push(song);

    setPlaylists(updatedPlaylists);
  };

  // 🗑️ Eliminar playlist (🔥 ARREGLADO)
  const deletePlaylist = (indexToDelete) => {
    const updatedPlaylists = playlists.filter(
      (_, index) => index !== indexToDelete
    );

    setPlaylists(updatedPlaylists);
  };

  return (
    <div>
      <h2>Playlists</h2>

      <input
        type="text"
        placeholder="Nombre de playlist"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createPlaylist}>Crear</button>

      {playlists.map((playlist, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{playlist.name}</h3>
            <button onClick={() => deletePlaylist(index)}>❌</button>
          </div>

          {songs.map((song) => (
            <div key={song.id}>
              <span>{song.title}</span>
              <button onClick={() => addToPlaylist(index, song)}>
                +
              </button>
            </div>
          ))}

          <div>
            <h4>Canciones:</h4>
            {playlist.songs.map((song, i) => (
              <p
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentSong(song)}
              >
                {song.title}
              </p>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}

export default Playlist;