import './../../styles/footer.css'
import Card from './LlinkFooter'

function Footer() {
  return (
    <footer className="footer">

        <div className="footer-seccion">
          <h4>Síguenos</h4>
          <Card />
        </div>

      <div className="footer-seccion">
        <p>© 2026 PiaYoga · Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer
