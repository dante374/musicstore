import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Footer from './componentes/Footer'
import Home from './paginas/Home'
import Catalogo from './paginas/Catalogo'
import Producto from './paginas/Producto'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Contacto from './paginas/Contacto'
import Encuesta from './paginas/Encuesta'
import Checkout from './paginas/Checkout'

function App(){
  return(
    <BrowserRouter>
  <Navbar/>
  <main>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalogo" element={<Catalogo/>}/>
      <Route path='/producto/:id' element={<Producto/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/registro' element={<Registro/>}/>
      <Route path='/contacto' element={<Contacto/>}/>
      <Route path='/encuesta' element={<Encuesta/>}/>
    </Routes>
  </main>
  <Footer/>
  </BrowserRouter>
  )
}
export default App
