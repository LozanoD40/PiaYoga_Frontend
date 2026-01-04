import testimonio1 from '../../assets/home/testimonio1.jpeg'
import testimonio2 from '../../assets/home/testimonio2.jpeg'
import testimonio3 from '../../assets/home/testimonio3.jpeg'

export default function Testimonio() {
  return (
    <section className="testimonios">
      <h2 className="section-title">Testimonios</h2>
      <div className="testimonios-container">
        <div className="testimonio-card">
          <div className="testimonio-bubble">
            <p className="testimonio-text">
              Antes vivía estresada. Ahora siento paz cada vez que practico. Las
              rutinas son súper guiadas.
            </p>
            <span className="testimonio-arrow"></span>
          </div>

          <div className="testimonio-info">
            <img className="testimonio-avatar" src={testimonio1} alt="" />
            <span className="testimonio-user">— Sofía A.</span>
          </div>
        </div>

        <div className="testimonio-card">
          <div className="testimonio-bubble">
            <p className="testimonio-text">
              Me encanta cómo explican cada postura. Todo es claro y fácil,
              incluso para principiantes como yo.
            </p>
            <span className="testimonio-arrow"></span>
          </div>
          <div className="testimonio-info">
            <img className="testimonio-avatar" src={testimonio2} alt="" />
            <span className="testimonio-user">— Carlos M.</span>
          </div>
        </div>

        <div className="testimonio-card">
          <div className="testimonio-bubble">
            <p className="testimonio-text">
              Los retos de yoga me ayudaron a ser constante. Mi flexibilidad ha
              mejorado muchísimo.
            </p>
            <span className="testimonio-arrow"></span>
          </div>
          <div className="testimonio-info">
            <img className="testimonio-avatar" src={testimonio3} alt="" />
            <span className="testimonio-user">— Elena R.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
