import { useEffect, useState } from 'react'

export default function Recompensa() {
  const [recompensas, setRecompensas] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('todas')
  const [rarezaActiva, setRarezaActiva] = useState('todas')

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

  const recompensasFiltradas = recompensas.filter((r) => {
    const filtraCategoria =
      categoriaActiva === 'todas' || r.categoria === categoriaActiva

    const filtraRareza = rarezaActiva === 'todas' || r.rareza === rarezaActiva

    return filtraCategoria && filtraRareza
  })

  return (
    <div className="filtros">
      {/* Categorías */}
      <div className="filtro-categorias">
        {[
          'todas',
          'personaje',
          'sombrero',
          'banda',
          'tapete',
          'ropa',
          'fondo',
        ].map((cat) => (
          <button
            key={cat}
            className={categoriaActiva === cat ? 'activo' : ''}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rareza */}
      <div className="filtro-rareza">
        <select
          value={rarezaActiva}
          onChange={(e) => setRarezaActiva(e.target.value)}
        >
          <option value="todas">Todas las rarezas</option>
          <option value="comun">Común</option>
          <option value="raro">Raro</option>
          <option value="epico">Épico</option>
          <option value="legendario">Legendario</option>
        </select>
      </div>

      {recompensasFiltradas.length === 0 ? (
        <p>No hay recompensas con esos filtros.</p>
      ) : (
        <div className="accesorio-grid">
          {recompensasFiltradas.map((a) => (
            <div key={a._id} className="card">
              <h2>{a.nombre}</h2>
              {a.imagen && <img src={a.imagen} alt={a.nombre} />}
              <div className="datos">
                <small className={`rareza-${a.rareza}`}>
                  <strong>Rareza:</strong> {a.rareza}
                </small>
                <small>
                  <strong>Precio:</strong> {a.precio} oro
                </small>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  )
}
