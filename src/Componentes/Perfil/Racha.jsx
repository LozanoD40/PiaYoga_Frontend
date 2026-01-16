import { useEffect, useState } from 'react'
import { authFetch } from '../../helpers/authFetch'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const API = import.meta.env.VITE_API_URL

export default function EstadisticasYoga() {
  const [chartData, setChartData] = useState([])
  const [rachaActual, setRachaActual] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await authFetch(`${API}/usuarios/rutina`)
      const rutinas = await res.json()

      const diasSet = new Set()

      rutinas.forEach((ur) => {
        ur.progreso.forEach((p) => {
          if (p.completado) {
            const fecha = new Date(p.fecha).toISOString().split('T')[0]
            diasSet.add(fecha)
          }
        })
      })

      const dias = Array.from(diasSet).sort()

      // BAR CHART (últimos 7 días)
      const data = dias.slice(-7).map((d) => ({
        dia: new Date(d).toLocaleDateString('es-ES', {
          weekday: 'short',
        }),
        valor: 1,
      }))

      setChartData(data)

      // RACHA
      let actual = 0
      let mejor = 0

      for (let i = 0; i < dias.length; i++) {
        if (i === 0) {
          actual = 1
        } else {
          const diff =
            (new Date(dias[i]) - new Date(dias[i - 1])) / (1000 * 60 * 60 * 24)

          if (diff === 1) {
            actual++
          } else {
            mejor = Math.max(mejor, actual)
            actual = 1
          }
        }
      }

      mejor = Math.max(mejor, actual)

      const hoy = new Date().toISOString().split('T')[0]
      setRachaActual(dias.includes(hoy) ? actual : 0)
      setMejorRacha(mejor)
    }

    cargarDatos()
  }, [])

  return (
    <section className="perfil-estadisticas">
      {/* GRAFICO */}
      <div className="stat-card">
        <h3>Días de Yoga</h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <XAxis dataKey="dia" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="valor" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RACHA */}
      <div className="stat-card racha-card">
        <p className="racha-label">Racha actual</p>
        <p className="racha-valor">🔥 {rachaActual} días</p>
        <p className="racha-mejor">Mejor racha: {mejorRacha} días</p>
      </div>
    </section>
  )
}
