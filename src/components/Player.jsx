import { useRef, useState, useEffect } from "react";

function Player({ currentSong, nextSong, prevSong, isShuffle, setIsShuffle }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 🔊 volumen (0 a 1)

  useEffect(() => {
    if (currentSong) {
      audioRef.current.play();
      setPlaying(true);
    }
  }, [currentSong]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  // 🔊 cambiar volumen
  const handleVolumeChange = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setVolume(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

return (
  <div style={{ textAlign: "center" }}>
    <div>
      <strong>{currentSong.title}</strong>
      <p>{currentSong.artist}</p>
    </div>

    <audio
      ref={audioRef}
      src={currentSong.file}
      onTimeUpdate={handleTimeUpdate}
      onLoadedData={handleLoadedData}
      onEnded={nextSong}
    />

    <div>
      <button onClick={prevSong}>⏮️</button>
      <button onClick={togglePlay}>
        {playing ? "⏸️" : "▶️"}
      </button>
      <button onClick={nextSong}>⏭️</button>
    </div>

    <div style={{ width: "300px" }}>
      <span>{formatTime(currentTime)}</span>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        style={{ width: "100%" }}
      />
    <div>
  <button onClick={() => setIsShuffle(!isShuffle)}>
    {isShuffle ? "🔀 ON" : "🔀 OFF"}
  </button>

  <button onClick={prevSong}>⏮️</button>

  <button onClick={togglePlay}>
    {playing ? "⏸️" : "▶️"}
  </button>

  <button onClick={nextSong}>⏭️</button>
</div>
      <span>{formatTime(duration)}</span>
    </div>
  </div>
);
}

export default Player;