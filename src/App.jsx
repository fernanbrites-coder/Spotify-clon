import { useState } from "react";
import songs from "./data/songs";
import SongList from "./components/SongList";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import "./App.css";

function App() {
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const nextSong = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = index === songs.length - 1 ? 0 : index + 1;
    setCurrentSong(songs[nextIndex]);
  };

  const prevSong = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = index === 0 ? songs.length - 1 : index - 1;
    setCurrentSong(songs[prevIndex]);
  };

return (
  <div className="app">
    <div className="sidebar">
      <h2 className="logo">Spotify</h2>

      <SongList
        songs={songs}
        setCurrentSong={setCurrentSong}
      />

      <Playlist
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
    </div>

    <div className="main">
      <h1>Reproductor</h1>
    </div>

    <div className="player-bar">
      <Player
        currentSong={currentSong}
        nextSong={nextSong}
        prevSong={prevSong}
      />
    </div>
  </div>
);
}

export default App;