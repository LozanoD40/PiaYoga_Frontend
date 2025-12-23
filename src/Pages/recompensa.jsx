import { useEffect, useState } from 'react'
import '../Styles/recompensa.css'

export default function Accesorios() {
  const [recompensas, setRecompensas] = useState([])
  const API = import.meta.env.VITE_API_URL + '/accesorios'

  useEffect(() => {
    const obtenerAccesorios = async () => {
      try {
        const res = await fetch(API)
        const json = await res.json()

        const lista = json.data || [] // <- tu backend devuelve json.data
        setRecompensas(lista)
      } catch (error) {
        console.error('Error al cargar accesorios:', error)
      }
    }

    obtenerAccesorios()
  }, [API])

  return (
    <div>
      {recompensas.length === 0 ? (
        <p>No hay accesorios disponibles.</p>
      ) : (
        <div className="accesorio-grid">
          {recompensas.map((a) => (
            <div key={a._id} className="card">
              <h2>{a.nombre}</h2>
              {a.imagen && <img src={a.imagen} alt={a.nombre} />}
              <div className='datos'>
                <small className={`rareza-${a.rareza}`}>
                  <strong>Rareza:</strong> {a.rareza}
                </small>
                <small>
                  <strong>Precio:</strong> {a.precio} oro
                </small>
              </div>
              <p>
                <strong>Descripción:</strong> {a.descripcion}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
