import { Link } from 'react-router-dom'
import horario from '../../assets/Ambientacion/horario.svg'
import postura from '../../assets/Ambientacion/postura.svg'
import rutina from '../../assets/Ambientacion/rutina.svg'

const cards = [
  {
    label: 'Horario',
    path: '/Horario',
    icon: horario,
    desc: 'Organiza tu práctica con calma',
  },
  {
    label: 'Posturas',
    path: '/Posturas',
    icon: postura,
    desc: 'Descubre posturas a tu ritmo',
  },
  {
    label: 'Rutinas',
    path: '/Rutina',
    icon: rutina,
    desc: 'Fluye con secuencias guiadas',
  },
]

export default function Inicio() {
  return (
    <section className="home-inicio">
      <div className="inicio-content">
        <h2 className="title">Encuentra tu equilibrio</h2>

        <p className="inicio-subtitle">
          Explora prácticas, rutinas y bienestar consciente
        </p>

        <div className="content-card">
          {cards.map(({ label, path, icon, desc }) => (
            <Link
              key={path}
              to={path}
              className="card-home"
              aria-label={`Ir a ${label}`}
            >
              <span className="card-border"></span>

              <div className="card-content">
                <div className="card-img">
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    className="card-icon"
                  />
                </div>

                <div className="card-text">
                  <span className="card-label">{label}</span>
                  <span className="card-desc">{desc}</span>
                </div>
              </div>

              <span className="card-bottom-text">
                Explorar →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
