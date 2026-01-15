import { useEffect, useState, useRef } from 'react'
import '../Styles/rutina.css'
import PosturaCard from '../Componentes/Postura/posturaCard'
import MusicaList from '../Componentes/Rutina/musica.jsx'

const API = import.meta.env.VITE_API_URL

export default function Rutina() {
  const [rutinas, setRutinas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //musica
  const audioRef = useRef(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const [musica, setMusica] = useState([])
  const [volume, setVolume] = useState(0.4) // 40% por defecto
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    Promise.all([fetch(`${API}/rutinas`), fetch(`${API}/rutinas/musica`)])
      .then(async ([rutinasRes, musicaRes]) => {
        if (!rutinasRes.ok) {
          throw new Error('Error al obtener rutinas')
        }
        if (!musicaRes.ok) {
          throw new Error('Error al obtener música')
        }

        const rutinasData = await rutinasRes.json()
        const musicaData = await musicaRes.json()

        const musicaLista = musicaData.musica || musicaData

        setRutinas(rutinasData.rutinas || rutinasData)
        setMusica(musicaLista)

        if (musicaLista.length > 0) {
          setCurrentTrack(musicaLista[0])
        }

        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  //funciones rutina
  const iniciarRutina = (rutina) => {
    alert(`Iniciando rutina: ${rutina.nombre}`)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

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

    // canción distinta
    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(track.archivoAudio)
    audio.volume = volume

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration)
    })

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
    })

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


  if (loading) {
    return <p className="rutina-loading">Cargando rutinas...</p>
  }

  if (error) {
    return <p className="rutina-error">{error}</p>
  }

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

              <div className="rutina-info">
                <h2>{rutina.nombre}</h2>
              </div>
            </summary>
            <section>
              <div className="rutina-meta">
                <p className="rutina-desc">{rutina.descripcion}</p>

                <div className="rutina-badges">
                  <div className="rutina-badges-info">
                    <span className="badges-info">
                      Dificultad: {rutina.dificultad}
                    </span>
                    <span className="badges-info">
                      ⏱ {rutina.tiempoTotal} min
                    </span>
                  </div>
                  <div className="rutina-badges-musica">
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
                  </div>
                </div>
                <div className="btn-rutina-iniciar">
                  <button
                    className="rutina-start-btn"
                    onClick={() => iniciarRutina(rutina)}
                  >
                    Iniciar rutina
                  </button>
                </div>
              </div>

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
