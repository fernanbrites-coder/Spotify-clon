function SongList({ songs, setCurrentSong }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 15px 0", color: "#1db954" }}>Todas las Canciones</h3>
      
      {songs.map((song) => (
        <div
          key={song.id}
          className="song"
          onClick={() => setCurrentSong(song)}
        >
          <p>{song.title}</p>
          <small>{song.artist}</small>
        </div>
      ))}
    </div>
  );
}

export default SongList;