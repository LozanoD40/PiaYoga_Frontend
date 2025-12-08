import { useEffect, useState } from 'react'
import ModalAgregarHorario from '../Componentes/Horario/modalHorario.jsx'
import '../Styles/horario.css'

export default function Horario() {
  const [horarios, setHorarios] = useState([])

  const diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
  ]
  
  useEffect(() => {
    const fetchHorarios = async () => {
      const res = await fetch('http://localhost:3000/api/horarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await res.json()
      setHorarios(data)
    }
    fetchHorarios()
  }, [])

  // Calcula altura de cada bloque según rango horario
  const calcularAltura = (inicio, fin) => {
    const [h1, m1] = inicio.split(':').map(Number)
    const [h2, m2] = fin.split(':').map(Number)

    const minutos = h2 * 60 + m2 - (h1 * 60 + m1)
    return (minutos / 60) * 60 // 1h = 60px en la grilla
  }

  const calcularOffset = (horaInicio) => {
    const [h, m] = horaInicio.split(':').map(Number)
    return (h - 6) * 60 + (m / 60) * 60 // desde 06:00
  }

  // Color único por ID
  const colorFromId = (id) => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash)
    }
    return `hsl(${hash % 360}, 70%, 55%)`
  }

  const horas = []
  for (let h = 6; h <= 22; h++) {
    horas.push(`${String(h).padStart(2, '0')}:00`)
  }

  return (
    <div className="horario-container">
      <h2 className="titulo">Horario semanal</h2>

      <div className="horario-grid">
        <div className="cell-hours"></div>

        {/* Cabecera de días */}
        {diasSemana.map((d) => (
          <div key={d} className="day-header">
            {d.toUpperCase()}
          </div>
        ))}

        {/* Filas de horas */}
        {horas.map((h) => (
          <>
            <div className="hour-label" key={h}>
              {h}
            </div>
            {diasSemana.map((dia) => (
              <div className="grid-cell" key={`${dia}-${h}`}></div>
            ))}
          </>
        ))}

        {/* Dibujar horarios */}
        {horarios.map((h) =>
          h.dias.map((dia) => (
            <div
              key={h._id + dia}
              className="bloque-horario"
              style={{
                gridColumn: diasSemana.indexOf(dia) + 2,
                top: calcularOffset(h.horaInicio) + 'px',
                height: calcularAltura(h.horaInicio, h.horaFin) + 'px',
                background: colorFromId(h._id),
              }}
            >
              <strong>{h.horaInicio}</strong> — {h.horaFin}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
