import { useEffect, useState } from 'react'
import TypewriterText from '../Home/escritura.jsx'

export default function Consejos() {
  const [todos, setTodos] = useState([])
  const [consejos, setConsejos] = useState([])
  const API = import.meta.env.VITE_API_URL + '/consejos'

  // Obtiene un consejo fijo por categoría (para el primer render)
  const obtenerUnoPorCategoria = (lista) => {
    const resultado = {}
    lista.forEach((c) => {
      if (!resultado[c.categoria]) {
        resultado[c.categoria] = c
      }
    })
    return Object.values(resultado)
  }

  // Obtiene uno aleatorio por categoría (puede repetirse)
  const obtenerAleatorioPorCategoria = (lista) => {
    const grupos = {}

    lista.forEach((c) => {
      if (!grupos[c.categoria]) {
        grupos[c.categoria] = []
      }
      grupos[c.categoria].push(c)
    })

    return Object.values(grupos).map((grupo) => {
      const randomIndex = Math.floor(Math.random() * grupo.length)
      return grupo[randomIndex]
    })
  } 

  const cambiarConsejoIndividual = (index) => {
    setConsejos((prev) => {
      const categoria = prev[index].categoria

      // filtra todos los consejos de esa categoría
      const opciones = todos.filter(
        (c) => c.categoria === categoria && c._id !== prev[index]._id
      )

      if (opciones.length === 0) return prev

      const nuevo = opciones[Math.floor(Math.random() * opciones.length)]

      const copia = [...prev]
      copia[index] = nuevo
      return copia
    })
  }


  useEffect(() => {
    const obtenerConsejos = async () => {
      try {
        const res = await fetch(API)
        const json = await res.json()

        const lista = json.data ?? []
        const activos = lista.filter((c) => c.activo === true)

        setTodos(activos)
        setConsejos(obtenerUnoPorCategoria(activos))
      } catch (error) {
        console.error('Error al cargar consejos:', error)
      }
    }

    obtenerConsejos()
  }, [API])

  const cambiarConsejos = () => {
    if (todos.length === 0) return
    setConsejos(obtenerAleatorioPorCategoria(todos))
  }

  return (
    <section className="consejos-section">
      <h2 className="consejos-title">Consejos para tu práctica</h2>

      {consejos.length === 0 ? (
        <p>No hay consejos activos.</p>
      ) : (
        <div className="consejo-card" tabIndex="0">
          <div className="carta-box">
            {consejos.map((c, index) => (
              <div
                key={c._id}
                className={`carta carta-${c.categoria}`}
                onClick={() => cambiarConsejoIndividual(index)}
              >
                <img src={c.imagen} alt={c.categoria} />

                <div className="content">
                  <p>
                    <TypewriterText text={c.texto} />
                  </p>
                  <small>{c.categoria}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        className="consejos-btn"
        onClick={cambiarConsejos}
        disabled={todos.length < 6}
      >
        Ver otros consejos
      </button>
    </section>
  )
}
