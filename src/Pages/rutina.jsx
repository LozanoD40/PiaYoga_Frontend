import { useEffect, useState, useRef } from 'react'
import '../Styles/rutina.css'
import PosturaCard from '../Componentes/Postura/posturaCard'
import MusicaList from '../Componentes/Rutina/musica.jsx'
import Countdown from '../Componentes/Rutina/temporizador.jsx'

const API = import.meta.env.VITE_API_URL

export default function Rutina() {
  const [rutinas, setRutinas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🎵 Música
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [musica, setMusica] = useState([])
  const [volume, setVolume] = useState(0.4)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // ⏱ Temporizador
  const [rutinaActiva, setRutinaActiva] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPaused, setIsPaused] = useState(true)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [posturaActual, setPosturaActual] = useState(0)
  const [enDescanso, setEnDescanso] = useState(false)

  const beepRef = useRef(new Audio('/rutina/Beep.mp3'))

  // 📡 Fetch datos
  useEffect(() => {
    Promise.all([fetch(`${API}/rutinas`), fetch(`${API}/rutinas/musica`)])
      .then(async ([rutinasRes, musicaRes]) => {
        if (!rutinasRes.ok) throw new Error('Error al obtener rutinas')
        if (!musicaRes.ok) throw new Error('Error al obtener música')

        const rutinasData = await rutinasRes.json()
        const musicaData = await musicaRes.json()

        setRutinas(rutinasData.rutinas || rutinasData)
        setMusica(musicaData.musica || musicaData)

        if ((musicaData.musica || musicaData).length > 0) {
          setCurrentTrack((musicaData.musica || musicaData)[0])
        }

        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // 🧮 Tiempo total
  const calcularTiempoRutina = (cantidadPosturas) => {
    const tiempoPostura = 60
    const descanso = 5
    return cantidadPosturas * tiempoPostura + (cantidadPosturas - 1) * descanso
  }

  // ⏳ Temporizador principal (ÚNICO)
  useEffect(() => {
    if (isPaused || elapsedTime >= totalSeconds) return

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const next = prev + 1

        if (next % 60 === 0 && !enDescanso) {
          beepRef.current.play()
          setEnDescanso(true)

          setTimeout(() => {
            setEnDescanso(false)
            setPosturaActual((p) => p + 1)
            beepRef.current.play()
          }, 5000)
        }

        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, elapsedTime, totalSeconds, enDescanso])

  // ▶ Iniciar / Pausar / Reiniciar rutina
  const handleRutinaButton = (rutina) => {
    if (rutinaActiva?._id !== rutina._id) {
      const total = calcularTiempoRutina(rutina.posturas.length)
      setRutinaActiva(rutina)
      setTotalSeconds(total)
      setElapsedTime(0)
      setPosturaActual(0)
      setEnDescanso(false)
      setIsPaused(false)
      return
    }

    setIsPaused((prev) => !prev)
  }

  const getRutinaButtonText = (rutina) => {
    if (rutinaActiva?._id !== rutina._id) return 'Iniciar rutina'
    return isPaused ? 'Reanudar' : 'Pausar'
  }

  // 🔊 Volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // 🎶 Música
  const handlePlayPause = (track) => {
    if (currentTrack?._id === track._id && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
      return
    }

    if (audioRef.current) audioRef.current.pause()

    const audio = new Audio(track.archivoAudio)
    audio.volume = volume

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () =>
      setCurrentTime(audio.currentTime)
    )

    audio.play()
    audioRef.current = audio
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const handleSeek = (newTime) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  if (loading) return <p className="rutina-loading">Cargando rutinas...</p>
  if (error) return <p className="rutina-error">{error}</p>

  return (
    <div className="rutina-container">
      <h1 className="rutina-title">Rutinas</h1>
      <h3>Da los primeros pasos en este nuevo estilo de vida</h3>

      <div className="rutinas-list">
        {rutinas.map((rutina) => (
          <details key={rutina._id} className="rutina-card">
            <summary className="rutina-summary">
              <img
                src={rutina.imagen}
                alt={rutina.nombre}
                className="rutina-img"
              />
              <h2>{rutina.nombre}</h2>
            </summary>

            <section className="rutina-meta">
              <p>{rutina.descripcion}</p>
              <MusicaList
                musica={musica}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                volume={volume}
                onVolumeChange={setVolume}
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />
              <div className="rutina-spotify-box">
                <details className="rutina-spotify-details">
                  <summary className="rutina-spotify-summary">
                    También puedes usar tu música favorita con Spotify
                  </summary>
                  <iframe
                    className="rutina-spotify-iframe"
                    src="https://open.spotify.com/embed/playlist/ID_DE_PLAYLIST"
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </details>
              </div>
              <div></div>
              {rutinaActiva?._id === rutina._id && (
                <Countdown
                  currentSeconds={elapsedTime}
                  totalSeconds={totalSeconds}
                  isPaused={isPaused}
                />
              )}
              <button
                className="rutina-start-btn"
                onClick={() => handleRutinaButton(rutina)}
              >
                {getRutinaButtonText(rutina)}
              </button>
              <p>
                {enDescanso ? '😮‍💨 Descanso' : `🧘 Postura ${posturaActual + 1}`}
              </p>
              <div className="posturas-list">
                {rutina.posturas?.map((p) => (
                  <PosturaCard
                    key={p._id || p.postura}
                    postura={p.postura}
                    duracion={p.duracion}
                  />
                ))}
              </div>
            </section>
          </details>
        ))}
      </div>
    </div>
  )
}
