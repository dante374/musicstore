import { Link } from "react-router-dom"
import { useTema } from "../context/ThemeContext"
import '../styles/Navbar.css'
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import Carrito from "./Carrito";
function Navbar(){
    const  { darkMode, toggleTema} = useTema();
    const { totalItems } = useCarrito();
    const { usuario, logout} = useAuth()
    const [ carritoAbierto, setCarritoAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return(
        <>
          <nav className={`navbar ${menuAbierto ? 'navbar-mobile-abierto' : ''}`}>
            <Link to="/" className="navbar-logo">MusicStore</Link>
            <ul className="navbar-links">
                <li><Link to="/catalogo" onClick={()=>setMenuAbierto(false)}>Catalogos</Link></li>
                <li><Link to="/contacto" onClick={()=>setMenuAbierto(false)}>Contacto</Link></li>
                <li><Link to="/encuesta">Recomendaciones</Link></li>
            </ul>
            <div className="navbar-acciones">
                <button className="btn-tema" onClick={toggleTema}>
                    {darkMode ? '☀️' : '🌙'}
                </button>
                {usuario ? (
                    <div className="navbar-usuario">
                        <span className="usuario-nombre">Hola, {usuario.nombre}</span>
                        <button className="btn-logout" onClick={handleLogout}>Salir</button>
                    </div>
                    ):(
                        <div className="navbar-auth">
                            <Link to="/login" className="btn-nav-login" onClick={() =>setMenuAbierto(false)}>Iniciar Sesion</Link>
                            <Link to="/registro" className="btn-nav-registro" onClick={()=>setMenuAbierto(false)}>Registrarse</Link>
                        </div>
                    )
                }
                <div className="btn-carrito-wrapper">
                    <button className="btn-carrito" onClick={() => setCarritoAbierto(true)}>🛒</button>
                    {
                        totalItems > 0 && (
                            <span className="carrito-contador">{totalItems}</span>
                        )
                    }
                </div>
                <button className="navbar-menu-btn" onClick={() => setMenuAbierto(!menuAbierto)}>{menuAbierto ? '✕' : '☰' }</button>
            </div>
        </nav>
        {carritoAbierto && (<Carrito onCerrar={() => setCarritoAbierto(false)} />)}
        </>

    )
}
export default Navbar