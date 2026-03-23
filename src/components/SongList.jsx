function SongList({ songs, setCurrentSong }) {
  return (
    <div>
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