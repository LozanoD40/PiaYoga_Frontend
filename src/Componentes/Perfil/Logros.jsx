import { useEffect, useState } from 'react'
import { authFetch } from '../../helpers/authFetch'

const API = import.meta.env.VITE_API_URL

export default function Logros() {
  const [logros, setLogros] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerLogros = async () => {
      try {
        const res = await authFetch(`${API}/logros`)
        if (!res.ok) throw new Error('Error al obtener logros')

        const json = await res.json()
        setLogros(json.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setCargando(false)
      }
    }
    obtenerLogros()
  }, [])

  if (cargando) {
    return <p>Cargando logros...</p>
  }

  return (
    <section className="logros-section">
      <h2 className="logros-title">Logros</h2>

      {logros.length === 0 ? (
        <p className="logros-empty">Aún no hay logros disponibles</p>
      ) : (
        <div className="logros-grid">
          {logros.map((logro) => (
            <div key={logro._id} className="logro-card">
              <img
                className="logro-icon"
                src={logro.imagen || '🏅'}
                alt="icono de logro"
              />
              <h3 className="logro-nombre">{logro.nombre}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
