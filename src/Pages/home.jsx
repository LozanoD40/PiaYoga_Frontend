import '../Styles/home.css'
import Inicio from '../Componentes/Home/Inicio'
import Beneficio from '../Componentes/Home/beneficios'
import Consejos from '../Componentes/Home/consejos'
import Testimonio from '../Componentes/Home/testimonio'
export default function Home() {
  return (
    <div>
      <Inicio />
      <Beneficio />
      <Consejos />
      <Testimonio />
    </div>
  )
}