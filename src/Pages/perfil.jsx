import '../Styles/perfil.css'
import Recompensa from '../Componentes/Perfil/recompensaCard'
import avatar from '../assets/home/testimonio1.jpeg' // opcional

export default function Perfil() {
  return (
    <section className="perfil-container">
      <div className="perfil-card">
        <img src={avatar} alt="Foto de perfil" className="perfil-avatar" />

        <h1 className="perfil-nombre">Mi Perfil</h1>
        <p className="perfil-email">usuario@email.com</p>
      </div>

      <div className="estadisticas">
        <h2>Mi progreso</h2>

        {/* Gráfico de barras: días */}
        <div className="grafico-card">
          <h3>Días de práctica</h3>

          <div className="grafico-barras">
            <div className="barra-dia">
              <span></span>
              <small>L</small>
            </div>
            <div className="barra-dia">
              <span></span>
              <small>M</small>
            </div>
            <div className="barra-dia">
              <span></span>
              <small>X</small>
            </div>
            <div className="barra-dia">
              <span></span>
              <small>J</small>
            </div>
            <div className="barra-dia">
              <span></span>
              <small>V</small>
            </div>
            <div className="barra-dia">
              <span></span>
              <small>S</small>
            </div>
            <div className="barra-dia">
              <span></span>
              <small>D</small>
            </div>
          </div>

          <small className="grafico-info">
            Aún no hay sesiones registradas
          </small>
        </div>

        {/* Gráfico de línea: calorías */}
        <div className="grafico-card">
          <h3>Calorías quemadas</h3>

          <div className="grafico-linea">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
              <polyline
                points="0,35 100,35"
                fill="none"
                stroke="var(--color-bg-alt)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <small className="grafico-info">0 kcal registradas</small>
        </div>
      </div>

      <section>
        <h2>Mis recompensas</h2>
        <Recompensa />
      </section>
    </section>
  )
}
