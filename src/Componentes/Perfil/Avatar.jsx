import { useEffect, useState } from 'react'
import { authFetch } from '../../helpers/authFetch'
import Ajustes from '../../assets/Ambientacion/ajustes.svg'

const SERVIDOR = import.meta.env.VITE_SERVIDOR_URL
const API = import.meta.env.VITE_API_URL

export default function Avatar() {
  const [perfil, setPerfil] = useState(null)
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    password: '',
  })
  const [archivo, setArchivo] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [cargando, setCargando] = useState(true)

  /* ---------- Obtener perfil ---------- */
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const res = await authFetch(`${API}/usuarios/perfil`)
        if (!res.ok) throw new Error('Error al obtener perfil')

        const data = await res.json()
        setPerfil(data)
        setDatos({
          nombre: data.nombre,
          email: data.email,
          password: '',
        })
      } catch (error) {
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    obtenerPerfil()
  }, [])

  /* ---------- Enviar actualización ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nombre', datos.nombre)
    formData.append('email', datos.email)
    if (datos.password) formData.append('password', datos.password)
    if (archivo) formData.append('avatar', archivo)

    try {
      const res = await authFetch(`${API}/usuarios/perfil`, {
        method: 'PUT',
        body: formData,
      })

      if (res.ok) {
        const usuarioActualizado = await res.json()
        setPerfil(usuarioActualizado)
        setMostrarFormulario(false)
      }
    } catch (error) {
      console.error('Error al actualizar:', error)
    }
  }

  if (cargando) return <p>Cargando perfil...</p>
  if (!perfil) return null

  return (
    <section className="perfil-user-card">
      {/* Avatar */}
      <div
        className="perfil-avatar-large"
        style={{
          backgroundImage: perfil.avatar
            ? `url(${SERVIDOR}/${perfil.avatar})`
            : 'none',
        }}
      >
        {!perfil.avatar && (
          <span className="perfil-avatar-placeholder">
            {perfil.nombre.charAt(0)}
          </span>
        )}
      </div>

      {/* Info usuario */}
      <div className="perfil-user-info">
        <h1 className="perfil-user-name">{perfil.nombre}</h1>
        <p className="perfil-user-email">{perfil.email}</p>
      </div>

      <div>
        <button
          className="perfil-edit-button"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <img
            src={Ajustes}
            alt="Editar perfil"
            className="perfil-edit-button-img"
          />
          <span className="material-symbols-outlined"></span>
          Editar perfil
        </button>

        {mostrarFormulario && (
          <div
            className="perfi-modal-overlay"
            onClick={() => setMostrarFormulario(false)}
          >
            <div className="perfi-modal" onClick={(e) => e.stopPropagation()}>
              <header className="perfi-modal-header">
                <h2>Editar perfil</h2>
                <button
                  className="perfi-modal-close"
                  onClick={() => setMostrarFormulario(false)}
                >
                  ×
                </button>
              </header>

              <form className="perfi-modal-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={datos.nombre}
                  onChange={(e) =>
                    setDatos({ ...datos, nombre: e.target.value })
                  }
                  placeholder="Nombre"
                />

                <input
                  type="email"
                  value={datos.email}
                  onChange={(e) =>
                    setDatos({ ...datos, email: e.target.value })
                  }
                  placeholder="Email"
                />

                <input
                  type="password"
                  value={datos.password}
                  onChange={(e) =>
                    setDatos({ ...datos, password: e.target.value })
                  }
                  placeholder="Nueva contraseña"
                />

                <div className="perfi-file-field">
                  <label className="perfi-file-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setArchivo(e.target.files[0])}
                      hidden
                    />
                    <span className="perfi-file-text">
                      Seleccionar imagen de perfil
                    </span>
                  </label>
                </div>

                <div className="perfi-modal-actions">
                  <button
                    type="button"
                    className="perfi-button-secondary"
                    onClick={() => setMostrarFormulario(false)}
                  >
                    Cancelar
                  </button>

                  <button type="submit" className="perfi-edit-button">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
