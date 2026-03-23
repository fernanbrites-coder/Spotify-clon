function SongList({ songs, setCurrentSong, onAddToPlaylist }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 15px 0", color: "#1db954" }}>Todas las Canciones</h3>
      
      {songs.map((song) => (
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
            onClick={() => onAddToPlaylist(song)}
            style={{ 
              padding: "5px 10px", 
              fontSize: "12px",
              marginLeft: "10px"
            }}
          >
            ➕
          </button>
        </div>
      ))}
    </div>
  );
}

export default SongList;