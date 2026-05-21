import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Footer from './componentes/Footer'
import Home from './paginas/Home'
import Catalogo from './paginas/Catalogo'
import ChatBot from './componentes/ChatBot'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Contacto from './paginas/Contacto'
import Encuesta from './paginas/Encuesta'

function App(){
  return(
    <BrowserRouter>
  <Navbar/>
  <main>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalogo" element={<Catalogo/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/registro' element={<Registro/>}/>
      <Route path='/contacto' element={<Contacto/>}/>
      <Route path='/encuesta' element={<Encuesta/>}/>
    </Routes>
  </main>
  <Footer/>
  <ChatBot/>
  </BrowserRouter>
  )
}
export default App
