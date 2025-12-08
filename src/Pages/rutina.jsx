import { useEffect, useState } from 'react'
//import PosturaCard from '../Componentes/Postura/posturaCard.jsx'

export default function Rutinas() {
  const [rutina, setRutina] = useState([])
  const API = import.meta.env.VITE_API_URL + '/rutinas'
  useEffect(() => {
    const obtenerRutinas = async () => {
      try {
        const res = await fetch(API)
        const json = await res.json()

        // json.data ES EL ARRAY CORRECTO
        const lista = json.data || []

        // Solo activos
        const activos = lista.filter((c) => c.estado === 'publicado')

        setRutina(activos)
      } catch (error) {
        console.error('Error al cargar posturas:', error)
      }
    }

    obtenerRutinas()
  }, [API])

  return (
    <div>
      <h2>Posturas</h2>
      {rutina.length === 0 ? (
        <p>No hay rutina disponible.</p>
      ) : (
        <div className="cartaRutina">
          
        </div>
      )}
    </div>
  )
}
