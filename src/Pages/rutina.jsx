import { useEffect, useState, useRef } from 'react'
import '../Styles/rutina.css'
import PosturaCard from '../Componentes/Postura/posturaCard'

const API = import.meta.env.VITE_API_URL

export default function Rutina() {
  const [rutinas, setRutinas] = useState([])
  const [tipoSeleccionado, setTipoSeleccionado] = useState('')
  const [rutinaActiva, setRutinaActiva] = useState(null)

  const [rutinaEnCurso, setRutinaEnCurso] = useState(false)
  const [indicePostura, setIndicePostura] = useState(0)
  const [tiempoRestante, setTiempoRestante] = useState(0)

  const [musicas, setMusicas] = useState([])
  const [musicaSeleccionada, setMusicaSeleccionada] = useState('')
  const [reproduciendo, setReproduciendo] = useState(false)

  const audioRef = useRef(null)

  /* ================== ACCIONES ================== */

  const iniciarRutina = () => {
    if (!rutinaActiva?.posturas?.length) return

    setIndicePostura(0)
    setTiempoRestante(rutinaActiva.posturas[0].duracion || 30)
    setRutinaEnCurso(true)
  }

  const finalizarRutina = () => {
    setRutinaEnCurso(false)
    setIndicePostura(0)
    setTiempoRestante(0)

    if (audioRef.current) {
      audioRef.current.pause()
      setReproduciendo(false)
    }
  }
  /* ================== CARGAR RUTINAS ================== */
  useEffect(() => {
    fetch(`${API}/rutinas?populate=posturas`)
      .then((res) => res.json())
      .then(setRutinas)
      .catch((err) => console.error('Error cargando rutinas', err))
  }, [])

  /* ================== CONTROL DEL TIMER ================== */
  useEffect(() => {
    if (!rutinaEnCurso || !rutinaActiva) return

    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev > 1) return prev - 1

        // Cuando llega a 0
        setIndicePostura((idx) => {
          const siguiente = idx + 1

          if (siguiente < rutinaActiva.posturas.length) {
            setTiempoRestante(rutinaActiva.posturas[siguiente].duracion || 30)
            return siguiente
          } else {
            finalizarRutina()
            return idx
          }
        })

        return 0
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [rutinaEnCurso, rutinaActiva])


  /* ================== CARGAR MÚSICA ================== */
  useEffect(() => {
    fetch(`${API}/rutinas/musica`)
      .then((res) => res.json())
      .then(setMusicas)
      .catch((err) => console.error('Error cargando música', err))
  }, [])

  /* ================== CONTROL DE AUDIO ================== */
  useEffect(() => {
    if (!musicaSeleccionada) return

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const musica = musicas.find((m) => m._id === musicaSeleccionada)
    if (!musica) return

    const audio = new Audio(musica.archivoAudio)
    audio.loop = true
    audio.volume = 0.5

    audio
      .play()
      .then(() => setReproduciendo(true))
      .catch((err) => console.error('Error audio:', err))

    audioRef.current = audio

    return () => {
      audio.pause()
    }
  }, [musicaSeleccionada, musicas])

  /* ================== FILTRADO ================== */
  const rutinasFiltradas =
    tipoSeleccionado === ''
      ? []
      : rutinas.filter((r) => r.tipo === tipoSeleccionado)

  return (
    <div className="rutina-page">
      <h1 className="rutina-title">Selecciona el tipo de Rutina</h1>

      <select
        className="rutina-select"
        value={tipoSeleccionado}
        onChange={(e) => {
          setTipoSeleccionado(e.target.value)
          setRutinaActiva(null)
          finalizarRutina()
        }}
      >
        <option value="">-- Seleccionar --</option>
        <option value="predefinido">Rutinas Predefinidas</option>
        <option value="personalizado">Rutinas Personalizadas</option>
      </select>

      {tipoSeleccionado && (
        <section className="rutina-list">
          <h2 className="rutina-subtitle">{tipoSeleccionado.toUpperCase()}</h2>

          {rutinasFiltradas.length === 0 && (
            <p className="rutina-empty">No hay rutinas disponibles.</p>
          )}

          <ul className="rutina-items">
            {rutinasFiltradas.map((r) => (
              <li
                key={r._id}
                className="rutina-item"
                onClick={() => setRutinaActiva(r)}
              >
                <strong>{r.nombre}</strong>
                <span className="rutina-action">Ver detalles →</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {rutinaActiva && (
        <div className="modal-overlay" onClick={finalizarRutina}>
          <div
            className="modal-content-rutina rutina-detail"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-rutina" onClick={finalizarRutina}>
              ✕
            </button>

            <h2>Detalles de la Rutina</h2>

            <div className="rutina-metadata">
              <p>
                <strong>Tipo:</strong> {rutinaActiva.tipo}
              </p>
              <p>
                <strong>Energía:</strong> {rutinaActiva.energiaTotal}
              </p>
              <p>
                <strong>Tiempo:</strong> {rutinaActiva.tiempoTotal} min
              </p>
              <p>
                <strong>Dificultad:</strong> {rutinaActiva.dificultadPromedio}
              </p>
            </div>

            {/* MÚSICA */}
            <div className="rutina-music-selector">
              <label>Música de fondo</label>

              <select
                value={musicaSeleccionada}
                onChange={(e) => setMusicaSeleccionada(e.target.value)}
              >
                <option value="">-- Elegir música --</option>
                {musicas.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.titulo}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  if (!audioRef.current) return
                  if (reproduciendo) audioRef.current.pause()
                  else audioRef.current.play()
                  setReproduciendo(!reproduciendo)
                }}
              >
                {reproduciendo ? 'Pausar' : 'Reproducir'}
              </button>
            </div>

            {!rutinaEnCurso && (
              <button className="rutina-play-btn" onClick={iniciarRutina}>
                ▶ Comenzar rutina
              </button>
            )}

            {/* POSTURAS */}
            <h3>Posturas</h3>
            <div className="rutina-posturas">
              {rutinaEnCurso ? (
                <>
                  <PosturaCard postura={rutinaActiva.posturas[indicePostura]} />
                  <p className="contador">⏱ {tiempoRestante}s</p>
                </>
              ) : (
                rutinaActiva.posturas.map((p) => (
                  <PosturaCard key={p._id} postura={p} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
