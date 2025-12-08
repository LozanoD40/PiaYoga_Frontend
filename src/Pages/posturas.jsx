import { useEffect, useState } from 'react'
import PosturaCard from '../Componentes/Postura/posturaCard.jsx'
export default function Posturas() {
  const [posturas, setPosturas] = useState([])
  const API = import.meta.env.VITE_API_URL + '/posturas'
  useEffect(() => {
    const obtenerPostura = async () => {
      try {
        const res = await fetch(API)
        const json = await res.json()

        // json.data ES EL ARRAY CORRECTO
        const lista = json.data || []

        // Solo activos
        const activos = lista.filter((c) => c.estado === 'publicado')

        setPosturas(activos)
      } catch (error) {
        console.error('Error al cargar posturas:', error)
      }
    }

    obtenerPostura()
  }, [API])

  return (
    <div>
      <h2>Posturas</h2>
      {posturas.length === 0 ? (
        <p>No hay posturas disponible.</p>
      ) : (
        <div className="cartaPosturas">
          {' '}
          {posturas.map((c) => (
            <PosturaCard key={c._id} postura={c} />
          ))}{' '}
        </div>
      )}
    </div>
  )
}
