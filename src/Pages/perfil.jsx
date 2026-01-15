import '../Styles/perfil.css'
import Avatar from '../Componentes/Perfil/Avatar'
import Recompensa from '../Componentes/Perfil/recompensas'
import DatosPersonales from '../Componentes/Perfil/datosPersonales'

export default function Perfil() {
  return (
    <section className="perfil-container">
      <div className="perfil-avatar">
        <Avatar />
      </div>

      <div>
        <h2>Datos personales</h2>
        <DatosPersonales />
      </div>

      <div>
        <h2>Mis recompensas</h2>
        <Recompensa />
      </div>
    </section>
  )
}
