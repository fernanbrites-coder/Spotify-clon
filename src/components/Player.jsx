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
  <div style={{ 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%",
    padding: "0 20px",
    gap: "20px"
  }}>
    {/* LADO IZQUIERDO - Información de la canción */}
    <div style={{ minWidth: "200px" }}>
      <p style={{ margin: "2px 0", fontWeight: "bold", fontSize: "14px" }}>
        {currentSong.title}
      </p>
      <p style={{ margin: "2px 0", fontSize: "12px", color: "#b3b3b3" }}>
        {currentSong.artist}
      </p>
    </div>

    {/* CENTRO - Controles y barra de progreso */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Botones de control */}
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setIsShuffle(!isShuffle)}>
          {isShuffle ? "🔀 ON" : "🔀"}
        </button>

        <button onClick={prevSong}>⏮️</button>

        <button onClick={togglePlay} style={{ padding: "10px 20px", fontSize: "16px" }}>
          {playing ? "⏸️" : "▶️"}
        </button>

        <button onClick={nextSong}>⏭️</button>
      </div>

      {/* Barra de progreso */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "11px", minWidth: "35px" }}>
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          style={{ flex: 1, height: "4px", cursor: "pointer" }}
        />

        <span style={{ fontSize: "11px", minWidth: "35px", textAlign: "right" }}>
          {formatTime(duration)}
        </span>
      </div>
    </div>

    {/* LADO DERECHO - Volumen */}
    <div style={{ minWidth: "150px", display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "14px" }}>🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        style={{ width: "100px", height: "4px", cursor: "pointer" }}
      />
    </div>

    <audio
      ref={audioRef}
      src={currentSong.file}
      onTimeUpdate={handleTimeUpdate}
      onLoadedData={handleLoadedData}
      onEnded={nextSong}
    />
  </div>
);
}

export default Player;