import { useState } from 'react'

export default function ModalAgregarHorario({ cerrar, onGuardado }) {
  const [dias, setDias] = useState([])
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFin, setHoraFin] = useState('')

  const diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo',
  ]

  const toggleDia = (dia) => {
    setDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    )
  }

  const guardar = async () => {
    if (dias.length === 0) return alert('Selecciona días')
    if (!horaInicio || !horaFin) return alert('Completa las horas')

    const body = { dias, horaInicio, horaFin }

    try {
      const res = await fetch('http://localhost:3000/api/horarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Error')

      onGuardado() // refresca calendario
      cerrar() // cierra modal
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      alert('Error al guardar horario')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Agregar horario</h2>

        <div className="modal-dias">
          {diasSemana.map((d) => (
            <button
              key={d}
              className={`dia-btn ${dias.includes(d) ? 'activo' : ''}`}
              onClick={() => toggleDia(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <label>Hora inicio</label>
        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />

        <label>Hora fin</label>
        <input
          type="time"
          value={horaFin}
          onChange={(e) => setHoraFin(e.target.value)}
        />

        <div className="modal-acciones">
          <button className="cancelar" onClick={cerrar}>
            Cancelar
          </button>
          <button className="guardar" onClick={guardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
