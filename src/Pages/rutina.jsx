import { useEffect, useState } from 'react'
import PosturaCard from '../Componentes/Postura/posturaCard'
const API = import.meta.env.VITE_API_URL

export default function Rutina() {
  const [rutinas, setRutinas] = useState([])
  const [tipoSeleccionado, setTipoSeleccionado] = useState('')
  const [rutinasFiltradas, setRutinasFiltradas] = useState([])
  const [rutinaActiva, setRutinaActiva] = useState(null)

  // CARGAR TODAS LAS RUTINAS
  useEffect(() => {
    fetch(`${API}/rutinas?populate=posturas`)
      .then((res) => res.json())
      .then((data) => setRutinas(data))
      .catch((err) => console.error('Error cargando rutinas', err))
  }, [])

  // FILTRADO POR TIPO
  useEffect(() => {
    if (tipoSeleccionado === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRutinasFiltradas([])
      return
    }

    // Filtrar SOLO rutinas
    setRutinasFiltradas(rutinas.filter((r) => r.tipo === tipoSeleccionado))
  }, [tipoSeleccionado, rutinas])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Selecciona el tipo de Rutina</h1>

      {/* SELECTOR PRINCIPAL */}
      <select
        value={tipoSeleccionado}
        onChange={(e) => setTipoSeleccionado(e.target.value)}
        style={{ padding: '10px', marginTop: '10px' }}
      >
        <option value="">-- Seleccionar --</option>
        <option value="predefinido">Rutinas Predefinidas</option>
        <option value="personalizado">Rutinas Personalizadas</option>
      </select>

      {/* LISTA DE RUTINAS */}
      {tipoSeleccionado !== '' && (
        <div style={{ marginTop: '20px' }}>
          <h2>{tipoSeleccionado.toUpperCase()}</h2>

          {rutinasFiltradas.length === 0 && <p>No hay rutinas disponibles.</p>}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {rutinasFiltradas.map((r) => (
              <li
                key={r._id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <strong>{r.nombre}</strong>

                <br />

                <button
                  onClick={() => setRutinaActiva(r)}
                  style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    border: '1px solid black',
                    background: 'white',
                  }}
                >
                  Ver detalles
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* DETALLES DE LA RUTINA */}
      {rutinaActiva && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            border: '2px solid #444',
            borderRadius: '8px',
            background: '#f7f7f7',
          }}
        >
          <h2>Detalles de la Rutina</h2>

          <p>
            <strong>Nombre:</strong> {rutinaActiva.nombre}
          </p>

          <p>
            <strong>Tipo:</strong> {rutinaActiva.tipo}
          </p>

          <p>
            <strong>Energía Total:</strong> {rutinaActiva.energiaTotal}
          </p>

          <p>
            <strong>Tiempo Total:</strong> {rutinaActiva.tiempoTotal} min
          </p>

          <p>
            <strong>Dificultad:</strong> {rutinaActiva.dificultadPromedio}
          </p>

          <h3>Posturas:</h3>
          <div className="cartaPosturas">
            {' '}
            {rutinaActiva.posturas?.map((c) => (
              <PosturaCard key={c._id} postura={c} />
            ))}{' '}
          </div>
        </div>
      )}
    </div>
  )
}
