import { useEffect, useState } from 'react'
import PosturaCard from '../Componentes/Postura/posturaCard.jsx'

export default function Posturas() {
  const [posturas, setPosturas] = useState([])

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
  const [ordenDificultad, setOrdenDificultad] = useState('desc') // mayor → menor

  const API = import.meta.env.VITE_API_URL + '/posturas'

  useEffect(() => {
    const obtenerPostura = async () => {
      try {
        const res = await fetch(API)
        const json = await res.json()

        const lista = json.data || []
        const activos = lista.filter((p) => p.estado === 'publicado')

        setPosturas(activos)
      } catch (error) {
        console.error('Error al cargar posturas:', error)
      }
    }

    obtenerPostura()
  }, [API])

  // 🔹 FILTRO POR CATEGORÍA
  const posturasFiltradas = posturas
    .filter((p) => {
      const categoriaOK =
        categoriaSeleccionada === 'todas' ||
        p.categoria.includes(categoriaSeleccionada)

      return categoriaOK 
    })
    .sort((a, b) => {
      if (ordenDificultad === 'desc') {
        return b.dificultad - a.dificultad // MAYOR → MENOR
      }
      return a.dificultad - b.dificultad
    })

  return (
    <div>
      <h2>Posturas</h2>

      <div className="postura-filtro-contenedor">
        <div className="postura-filtro-item">
          <label>Categoría</label>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="espalda">Espalda</option>
            <option value="lumbar">Lumbar</option>
            <option value="cuello">Cuello</option>
            <option value="hombros">Hombros</option>
            <option value="brazos">Brazos</option>
            <option value="pecho">Pecho</option>
            <option value="core">Core</option>
            <option value="caderas">Caderas</option>
            <option value="piernas">Piernas</option>
            <option value="equilibrio">Equilibrio</option>
            <option value="respiración">Respiración</option>
          </select>
        </div>

        <div className="postura-filtro-item">
          <label>Dificultad</label>
          <select
            value={ordenDificultad}
            onChange={(e) => setOrdenDificultad(e.target.value)}
          >
            <option value="desc">Mayor a menor</option>
            <option value="asc">Menor a mayor</option>
          </select>
        </div>
      </div>

      {posturasFiltradas.length === 0 ? (
        <p>No hay posturas disponibles.</p>
      ) : (
        <div className="cartaPosturas">
          {posturasFiltradas.map((p) => (
            <PosturaCard key={p._id} postura={p} />
          ))}
        </div>
      )}
    </div>
  )
}
