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
        alert('Perfil actualizado correctamente')
      }
    } catch (error) {
      console.error('Error al actualizar:', error)
    }
  }

  if (cargando) return <p>Cargando perfil...</p>
  if (!perfil) return null

  return (
    <section className="avatar-card">
      <div className="Avatar-img">
        <div className="avatar-header">
          {perfil.avatar ? (
            <img src={`${SERVIDOR}${perfil.avatar}`} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">{perfil.nombre.charAt(0)}</div>
          )}
        </div>
      </div>
      <div className="Avatar-informacion">
        <div className="avatar-info">
          <h2>{perfil.nombre}</h2>
          <p>{perfil.email}</p>
        </div>

        <h3
          className={`toggle-title ${mostrarFormulario ? 'active' : ''}`}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <img
            src={Ajustes}
            alt="Actualizar perfil"
            className="avatar-ajustes"
          />
          Actualizar perfil
        </h3>

        <div className={`form-container ${mostrarFormulario ? 'show' : ''}`}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={datos.nombre}
              onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
              placeholder="Nombre"
            />

            <input
              type="email"
              value={datos.email}
              onChange={(e) => setDatos({ ...datos, email: e.target.value })}
              placeholder="Email"
            />

            <input
              type="password"
              placeholder="Nueva contraseña"
              value={datos.password}
              onChange={(e) => setDatos({ ...datos, password: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setArchivo(e.target.files[0])}
            />

            <button type="submit">Guardar cambios</button>
          </form>
        </div>
      </div>
    </section>
  )
}
