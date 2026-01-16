import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { authFetch } from '../../helpers/authFetch'

const API = import.meta.env.VITE_API_URL

export default function DatosPersonales() {
  const [perfil, setPerfil] = useState({
    pesoKg: '',
    alturaCm: '',
    edad: '',
    estiloVida: 'sedentario',
  })

  const [cargando, setCargando] = useState(true)

  /* ===== Obtener datos desde backend ===== */
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await authFetch(`${API}/usuarios/datos`)
        if (!res.ok) throw new Error('Error al obtener perfil')

        const json = await res.json()

        if (json.data) {
          setPerfil({
            pesoKg: json.data.pesoKg ?? '',
            alturaCm: json.data.alturaCm ?? '',
            edad: json.data.edad ?? '',
            estiloVida: json.data.estiloVida ?? 'sedentario',
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])

  /* ===== Guardar datos en backend ===== */
  const handleSubmit = async () => {
    try {
      const res = await authFetch(`${API}/usuarios/datos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pesoKg: perfil.pesoKg,
          alturaCm: perfil.alturaCm,
          edad: perfil.edad,
          estiloVida: perfil.estiloVida,
        }),
      })

      if (!res.ok) throw new Error('Error al guardar datos')

      alert('Datos físicos actualizados correctamente')
    } catch (error) {
      console.error(error)
      alert('Error al guardar los datos')
    }
  }

  if (cargando) {
    return <p>Cargando datos físicos...</p>
  }

  return (
    <section className="perfil-stats">
      <div className="perfil-stats-data">
        <div className="perfil-stat-card">
          <p className="perfil-stat-label">Peso</p>
          <input
            type="number"
            className="perfil-stat-input"
            value={perfil.pesoKg}
            onChange={(e) => setPerfil({ ...perfil, pesoKg: e.target.value })}
            placeholder="Kg"
            min={20}
            max={300}
          />
        </div>

        <div className="perfil-stat-card">
          <p className="perfil-stat-label">Altura</p>
          <input
            type="number"
            className="perfil-stat-input"
            value={perfil.alturaCm}
            onChange={(e) => setPerfil({ ...perfil, alturaCm: e.target.value })}
            placeholder="Cm"
            min={80}
            max={250}
          />
        </div>

        <div className="perfil-stat-card">
          <p className="perfil-stat-label">Edad</p>
          <input
            type="number"
            className="perfil-stat-input"
            value={perfil.edad}
            onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
            placeholder="Años"
            min={5}
            max={120}
          />
        </div>

        <div className="perfil-stat-card">
          <p className="perfil-stat-label">Estilo de Vida</p>
          <select
            className="perfil-stat-select"
            value={perfil.estiloVida}
            onChange={(e) =>
              setPerfil({ ...perfil, estiloVida: e.target.value })
            }
          >
            <option value="sedentario">Sedentario</option>
            <option value="ligeramente_activo">Ligeramente Activo</option>
            <option value="activo">Activo</option>
            <option value="muy_activo">Muy Activo</option>
          </select>
        </div>
      </div>
      <div className="perfil-stat-card perfil-stat-action">
        <button className="perfi-edit-button" onClick={handleSubmit}>
          <Save size={18} />
          Guardar datos
        </button>
      </div>
    </section>
  )
}
