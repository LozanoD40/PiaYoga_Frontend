import '../Styles/perfil.css'
import Avatar from '../Componentes/Perfil/Avatar'
import DatosPersonales from '../Componentes/Perfil/datosPersonales'
import EstadisticasYoga from '../Componentes/Perfil/Racha'
import Logros from '../Componentes/Perfil/Logros'

export default function Perfil() {
  return (
    <section className="perfil-container">
      <main className="perfil-main">
        <Avatar />

        <DatosPersonales />

        <EstadisticasYoga />

        <Logros />
      </main>
    </section>
  )
}
