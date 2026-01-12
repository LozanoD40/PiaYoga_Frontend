import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home.jsx'
import Headers from './Componentes/Base/header.jsx'
import Footer from './Componentes/Base/footer.jsx'
import Login from './Componentes/Base/login.jsx'
import HorariosDisponibles from './Pages/horario.jsx'
import Posturas from './Pages/posturas.jsx'
import Rutina from './Pages/rutina.jsx'
import Perfil from './Pages/perfil.jsx'
function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Horario" element={<HorariosDisponibles />} />
        <Route path="/Posturas" element={<Posturas />} />
        <Route path="/Rutina" element={<Rutina />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
