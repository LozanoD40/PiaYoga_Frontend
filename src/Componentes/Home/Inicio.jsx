import { Link } from 'react-router-dom'
import horario from '../../assets/Ambientacion/horario.svg'
import postura from '../../assets/Ambientacion/postura.svg'
import rutina from '../../assets/Ambientacion/rutina.svg'
import recompensa from '../../assets/Ambientacion/recompensa.svg'

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
  {
    label: 'Recompensas',
    path: '/Recompensa',
    icon: recompensa,
    desc: 'Celebra cada avance personal',
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
              <div className='card-img'>
                <img
                  src={icon}
                  alt={icon}
                  aria-hidden="true"
                  className="card-icon"
                />
              </div>
              <div className='card-text'>
                <span className="card-label">{label}</span>
                <span className="card-desc">{desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
