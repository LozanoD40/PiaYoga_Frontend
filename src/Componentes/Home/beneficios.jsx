export default function Beneficios() {
  return (
    <section className="que-es-yoga">
      <h2 className="section-title">¿Qué es el Yoga?</h2>
      <p className="section-description">
        El yoga es una práctica que combina movimiento, respiración y
        consciencia plena. Su objetivo es crear armonía entre cuerpo, mente y
        emociones, permitiéndote vivir con claridad y equilibrio.
      </p>

      <div className="beneficios-container">
        <div className="beneficio-card">
          <h3>Beneficios Físicos</h3>
          <p>
            Mejora la flexibilidad, fortalece los músculos, aumenta la energía y
            ayuda a corregir la postura.
          </p>
        </div>

        <div className="beneficio-card">
          <h3>Beneficios Mentales</h3>
          <p>
            Reduce el estrés, mejora la concentración, calma la mente y promueve
            claridad mental.
          </p>
        </div>

        <div className="beneficio-card">
          <h3>Beneficios Emocionales</h3>
          <p>
            Ayuda a gestionar emociones, aumenta la estabilidad interna y
            fomenta una sensación de paz interior.
          </p>
        </div>
      </div>
    </section>
  )
}
