import { useState } from 'react';
import '../../Styles/postura.css'; 
import VerMenos from '../../assets/Posturas/verMenos.svg'
import VerMas from '../../assets/Posturas/verMas.svg'

function PosturaCard({ postura }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className="postura-card"
      onClick={toggleExpand} // El contenedor completo es clickeable
    >
      {/* 1. ESTADO RESUMEN: Imagen y Descripción Corta */}
      {!isExpanded && (
        <div className="card-resumen">
          <img
            src={postura.imagenPrincipal}
            alt={postura.nombre}
            className="card-image"
          />
          <div className="card-info">
            <h3 className="card-title">{postura.nombre}</h3>
            <small className="card-category">
              Dificultad: {postura.dificultad}/5 | Tiempo:{' '}
              {postura.tiempoMinutos} min
            </small>

            <p className="card-short-desc">{postura.descripcionCorta}</p>
          </div>
          <button className="expand-button" aria-expanded={isExpanded}>
            <img src={VerMas} alt={VerMas} />
          </button>
        </div>
      )}

      {/* 2. ESTADO DETALLE: Video y Descripción Larga */}
      {isExpanded && (
        <div className="card-detalle">
          {postura.video && (
            <div className="card-video-container">
              <iframe
                src={postura.video}
                title={postura.nombre}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          <div className="detalle-header">
            <h3 className="card-title">{postura.nombre}</h3>
          </div>
          <small className="card-category">
            Categoría: {postura.categoria}
          </small>
          <p className="card-long-desc">{postura.descripcionLarga}</p>
          <button className="expand-button" aria-expanded={isExpanded}>
            <img src={VerMenos} alt={VerMenos} />
          </button>
        </div>
      )}
    </div>
  )
}

export default PosturaCard