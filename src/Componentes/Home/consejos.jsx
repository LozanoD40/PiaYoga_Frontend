import { useEffect, useState } from 'react'
import card from '../../assets/home/card.jpeg'
export default function Consejos() {
  const [consejos, setConsejos] = useState([])
  const API = import.meta.env.VITE_API_URL + '/consejos'

  useEffect(() => {
    const obtenerConsejos = async () => {
      try {
        const res = await fetch(API)
        const json = await res.json()

        // json.data ES EL ARRAY CORRECTO
        const lista = json.data || []

        // Solo activos
        const activos = lista.filter((c) => c.activo === true)

        setConsejos(activos)
      } catch (error) {
        console.error('Error al cargar consejos:', error)
      }
    }

    obtenerConsejos()
  }, [API])

  return (
    <div>
      <h2>Consejos</h2>

      {consejos.length === 0 ? (
        <p>No hay consejos activos.</p>
      ) : (
        <div className="carta-box">
          {consejos.map((c) => (
            <div key={c._id} className="carta">
              <div className="cara">
                <img src={c.imagen} alt="yoga" />
              </div>
              <div className="cara detras">
                <img src={card} alt="yoga" />
                <p>{c.texto}</p>
                <small>{c.categoria}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
