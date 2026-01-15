import Volumen from '../../assets/Ambientacion/volumen.svg'
import VolumenMute from '../../assets/Ambientacion/volumenMute.svg'

export default function MusicaList({
  musica,
  currentTrack,
  isPlaying,
  onPlayPause,
  volume,
  onVolumeChange,
  currentTime,
  duration,
  onSeek
}) {
  if (!musica || musica.length === 0) return null

  const currentIndex = musica.findIndex((m) => m._id === currentTrack?._id)

  const playNext = () => {
    const next = musica[currentIndex + 1] || musica[0]
    onPlayPause(next)
  }

  const playPrev = () => {
    const prev = musica[currentIndex - 1] || musica[musica.length - 1]
    onPlayPause(prev)
  }

  const toggleMute = () => {
    onVolumeChange(volume === 0 ? 0.4 : 0)
  }

  /* ---------- Progreso ---------- */
  const progress = duration ? (currentTime / duration) * 100 : 0

  const formatTime = (time = 0) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    if (!duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    onSeek(newTime)
  }

  return (
    <section className="rutina-musica">
      {currentTrack && (
        <div className="music-player">
          <img
            src={currentTrack.portada || '/img/music-placeholder.jpg'}
            alt={currentTrack.titulo}
            className="player-cover"
          />

          <div className="player-content">
            <div className="player-info">
              <strong>{currentTrack.titulo}</strong>
              <span>{currentTrack.artista}</span>
            </div>

            {/* Barra de progreso */}
            <div className="controls-progress">
              <div className="player-progress" onClick={handleProgressClick}>
                <div
                  className="player-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="player-controls">
              <button onClick={playPrev}>⏮</button>

              <button onClick={() => onPlayPause(currentTrack)}>
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button onClick={playNext}>⏭</button>

              <div className="volume-control">
                <button onClick={toggleMute}>
                  {volume === 0 ? (
                    <img src={VolumenMute} alt="Mute" />
                  ) : (
                    <img src={Volumen} alt="Volumen" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
