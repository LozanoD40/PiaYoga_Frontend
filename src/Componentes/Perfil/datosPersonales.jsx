import { useState } from 'react'
import { Activity, Save } from 'lucide-react'

export default function DatosPersonales() {
  const [perfil, setPerfil] = useState({
    pesoKg: '',
    alturaCm: '',
    edad: '',
    estiloVida: 'sedentario',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos listos para enviar:', perfil)
    alert('Simulación de guardado exitosa')
  }

  return (
    <section className="avatar-card">
      <div className="section-header">
        <Activity size={20} color="var(--color-bg-accent)" />
        <h3>Mi Perfil Físico</h3>
      </div>
      - - - - -
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="input-group">
          <label>Peso (Kg)</label>
          <input
            type="number"
            value={perfil.pesoKg}
            onChange={(e) => setPerfil({ ...perfil, pesoKg: e.target.value })}
            placeholder="0"
          />
        </div>
        <div className="input-group">
          <label>Altura (Cm)</label>
          <input
            type="number"
            value={perfil.alturaCm}
            onChange={(e) => setPerfil({ ...perfil, alturaCm: e.target.value })}
            placeholder="0"
          />
        </div>
        - - - - -
        <div className="input-group">
          <label>Edad</label>
          <input
            type="number"
            value={perfil.edad}
            onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
            placeholder="0"
          />
        </div>
        <div className="input-group">
          <label>Estilo de Vida</label>
          <select
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
        - - - - -
        <button type="submit" className="btn-save">
          <Save size={18} /> Guardar Datos (Local)
        </button>
      </form>
    </section>
  )
}
