import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProovedorDeTema } from './context/ThemeContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './styles/variables.css'
import './styles/global.css'
import App from './App.jsx'
import { ProveedorDeCarrito } from './context/CarritoContext.jsx'
import { ProveedorDeAuth } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProovedorDeTema>
      <ProveedorDeAuth>
        <ProveedorDeCarrito>
         <App />
      </ProveedorDeCarrito>
      </ProveedorDeAuth>
    </ProovedorDeTema>
  </StrictMode>,
)
