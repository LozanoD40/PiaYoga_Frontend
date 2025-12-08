export default function Testimonio() {
  return (
    <section className="testimonios">
      <h2 className="section-title">Testimonios</h2>

      <div className="testimonios-container">
        <div className="testimonio-card">
          <p className="testimonio-text">
            “Antes vivía estresada. Ahora siento paz cada vez que practico. Las
            rutinas son súper guiadas.”
          </p>
          <span className="testimonio-user">— Sofía A.</span>
        </div>

        <div className="testimonio-card">
          <p className="testimonio-text">
            “Me encanta cómo explican cada postura. Todo es claro y fácil,
            incluso para principiantes como yo.”
          </p>
          <span className="testimonio-user">— Carlos M.</span>
        </div>

        <div className="testimonio-card">
          <p className="testimonio-text">
            “Los retos de yoga me ayudaron a ser constante. Mi flexibilidad ha
            mejorado muchísimo.”
          </p>
          <span className="testimonio-user">— Elena R.</span>
        </div>
      </div>
    </section>
  )
}
