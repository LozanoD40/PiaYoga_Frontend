import './../../styles/login.css'
import { useState } from 'react'
//import { authFetch } from '../../helpers/authFetch'

import {
  eventoAuth,
  eventoActualizarHeader,
} from '../../Global/globalEvents'

function Login({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL 

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const endpoint = isLogin ? '/usuarios/login' : '/usuarios/registrar'

      // LOGIN o REGISTRO
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || 'Error en el proceso')
        return
      }

      // Guardar token SI es login
      if (isLogin && data.token) {
        localStorage.setItem('token', data.token)
      }

      // Guardar usuario
      const userData = data.user || data
      localStorage.setItem('user', JSON.stringify(userData))

      // CAMBIO: emitir evento de login y actualización global
      eventoAuth.emitir(true)
      eventoActualizarHeader.emitir()
    
      onClose()
    } catch {
      setError('Error de conexión con el servidor')
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2 className="Title">
          {isLogin ? 'Bienvenido de vuelta' : 'Comienza a mejorar tu vida'}
        </h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="Form">
          {!isLogin && (
            <input
              className="inpunt"
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          )}

          <input
            className="inpunt"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            className="inpunt"
            type="password"
            name="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btn-registro">
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="btn-switch">
          {isLogin
            ? '¿No tienes cuenta? Únetenos'
            : '¿Ya tienes cuenta? Ingresa'}
        </button>
      </div>
    </div>
  )
}

export default Login
