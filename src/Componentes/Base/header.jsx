import './../../styles/header.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import noUsuario from '../../assets/Ambientacion/noUsuario.svg'
import usuario from '../../assets/Ambientacion/usuario.svg'
import home from '../../assets/Ambientacion/home.svg'
import horario from '../../assets/Ambientacion/horario.svg'
import postura from '../../assets/Ambientacion/postura.svg'
import rutina from '../../assets/Ambientacion/rutina.svg'
import recompensa from '../../assets/Ambientacion/recompensa.svg'
import florYoga from '../../assets/Ambientacion/flor_yoga_icon.png'
import Login from './login'

// IMPORTAMOS EVENTOS
import {
  escucharEvento,
  dejarDeEscuchar,
  eventoAuth,
  eventoActualizarHeader,
} from '../../Global/globalEvents'

function Headers() {
  const [open, setOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navRef = useRef(null)

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  })

  useEffect(() => {
    const handleAuthChange = (e) => {
      const { logueado } = e.detail
      if (!logueado) {
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return
      }
      const userData = localStorage.getItem('user')
      setUser(userData ? JSON.parse(userData) : null)
    }

    escucharEvento(eventoAuth.nombre, handleAuthChange)

    return () => {
      dejarDeEscuchar(eventoAuth.nombre, handleAuthChange)
    }
  }, [])

  const cerrarSesion = () => {
    setIsLoginOpen(false) || eventoAuth.emitir(false)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    confirm('¿Estás seguro de que deseas cerrar sesión?')
  }

  // EVENTO GLOBAL: refrescar header
  useEffect(() => {
    const handleHeaderUpdate = () => {
      const userData = localStorage.getItem('user')
      setUser(userData ? JSON.parse(userData) : null)
    }

    escucharEvento(eventoActualizarHeader.nombre, handleHeaderUpdate)

    return () => {
      dejarDeEscuchar(eventoActualizarHeader.nombre, handleHeaderUpdate)
    }
  }, [])

  useEffect(() => {
    const abrirModalLogin = () => {
      setIsLoginOpen(true)
    }

    window.addEventListener('openLoginModal', abrirModalLogin)

    return () => {
      window.removeEventListener('openLoginModal', abrirModalLogin)
    }
  }, [])

  // cerrar el menú hamburguesa con ESC o click fuera
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onClickOutside(e) {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  return (
    <div ref={navRef}>
      <nav className={`navbar ${open ? 'nav-open' : ''}`}>
        <div className="logo">
          <Link to="/" id="Logo" onClick={() => setOpen(false)}>
            PiaYoga
            <img src={florYoga} alt={florYoga} className="iconLogo" />
          </Link>
        </div>

        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul
          id="primary-navigation"
          className={`nav-links ${open ? 'open' : ''}`}
        >
          <li>
            <Link to="/" className="btn-header" onClick={() => setOpen(false)}>
              <img src={home} alt="Inicio" className="img-Icon" />
              <span className="nav-text">Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Horario"
              className="btn-header"
              onClick={() => setOpen(false)}
            >
              <img src={horario} alt={horario} className="img-Icon" />
              <span className="nav-text">Horario</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Posturas"
              className="btn-header"
              onClick={() => setOpen(false)}
            >
              <img src={postura} alt={postura} className="img-Icon" />
              <span className="nav-text">Posturas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Rutina"
              className="btn-header"
              onClick={() => setOpen(false)}
            >
              <img src={rutina} alt={rutina} className="img-Icon" />
              <span className="nav-text">Rutinas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Recompensa"
              className="btn-header"
              onClick={() => setOpen(false)}
            >
              <img src={recompensa} alt={recompensa} className="img-Icon" />
              <span className="nav-text">Recompensa</span>
            </Link>
          </li>
          <li>
            {!user ? (
              <button
                className="btn-header"
                onClick={() => setIsLoginOpen(true)}
                id="login"
              >
                <img src={noUsuario} alt="registrarte" className="img-Icon" />
                <span className="nav-text">Incia sesion</span>
              </button>
            ) : (
              <button className="btn-header" onClick={cerrarSesion} id="login">
                <img src={usuario} alt="cerrar sesion" className="img-Icon" />
                <span className="nav-text">Cierra sesion</span>
              </button>
            )}
          </li>
        </ul>
      </nav>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}

export default Headers
