import { useState } from 'react'
import '../../Styles/postura.css'
import VerMenos from '../../assets/Posturas/verMenos.svg'
import VerMas from '../../assets/Posturas/verMas.svg'
import BodyMapSVG from './svgBody'

function PosturaCard({ postura , activa}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div className="postura-card" onClick={toggleExpand}>
      {/* RESUMEN */}
      {!isExpanded && (
        <div className="card-resumen">
          <img
            src={postura.imagenPrincipal}
            alt={postura.nombre}
            className="card-image"
          />

          <div className="card-info">
            <h3 className="card-title">{postura.nombre}</h3>

            <div className="stats-row">
              <span className="stats-data">
                Dificultad: {postura.dificultad}/5
              </span>
              <div className={`stast-card ${activa ? 'activa' : ''}`}>
                <span className="stats-data">
                  ⏱ {postura.tiempoMinutos} min
                </span>
              </div>
              <span className="stats-data">
                🔥 {postura.energiaGastada || 25} kcal
              </span>
            </div>

            <p className="card-short-desc">{postura.descripcionCorta}</p>

            <button className="expand-button">
              <img src={VerMas} alt="Ver más" />
            </button>
          </div>
        </div>
      )}

      {/* DETALLE */}
      {isExpanded && (
        <div className="card-detalle">
          <div className="card-detalle-info">
            <h3 className="card-title detalle-title">{postura.nombre}</h3>

            <div className="stats-row detalle-stats">
              <span className="stats-data">
                Dificultad: {postura.dificultad}/5
              </span>
              <span className="stats-data">⏱ {postura.tiempoMinutos} min</span>
              <span className="stats-data">
                🔥 {postura.energiaGastada || 25} kcal
              </span>
            </div>

            <p className="card-long-desc">{postura.descripcionLarga}</p>

            <div className="body-title">Zonas del cuerpo trabajadas</div>

            <div className="body-map-container">
              <BodyMapSVG zonas={postura.categoria} />
            </div>

            <button className="expand-button">
              <img src={VerMenos} alt="Ver menos" />
            </button>
          </div>
          {/* VIDEO */}
          {postura.video && (
            <div className="card-video-container">
              <iframe
                src={postura.video}
                title={postura.nombre}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PosturaCard
