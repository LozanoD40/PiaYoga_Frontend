import fisico from '../../assets/home/fisico.png'
import mental from '../../assets/home/mental.png'
import emocional from '../../assets/home/emocional.png'

export default function Beneficios() {
  return (
    <section className="beneficios">
      <h2 className="section-title">Beneficios</h2>

      <div className="beneficios-grid">
        <div className="beneficio-card">
          <div className="beneficio-front">
            <h3>Físicos</h3>
            <img src={fisico} alt="" aria-hidden="true" />
          </div>

          <div className="beneficio-back">
            <p>
              Mejora la flexibilidad, fortalece los músculos, aumenta la energía
              y ayuda a corregir la postura de forma consciente y progresiva.
            </p>
          </div>
        </div>

        <div className="beneficio-card">
          <div className="beneficio-front">
            <h3>Mentales</h3>
            <img src={mental} alt="" aria-hidden="true" />
          </div>

          <div className="beneficio-back">
            <p>
              Reduce el estrés, mejora la concentración y te ayuda a mantener
              una mente clara y enfocada en el presente.
            </p>
          </div>
        </div>

        <div className="beneficio-card">
          <div className="beneficio-front">
            <h3>Emocionales</h3>
            <img src={emocional} alt="" aria-hidden="true" />
          </div>

          <div className="beneficio-back">
            <p>
              Favorece la gestión emocional, fortalece la estabilidad interna y
              fomenta una sensación de paz y bienestar.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
