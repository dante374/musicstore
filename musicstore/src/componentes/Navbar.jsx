import { Link, useNavigate } from "react-router-dom"
import { useTema } from "../context/ThemeContext"
import '../styles/Navbar.css'
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import Carrito from "./Carrito";

function Navbar() {
    const { darkMode, toggleTema } = useTema();
    const { totalItems } = useCarrito();
    const { usuario, logout } = useAuth();
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <nav className={`navbar ${menuAbierto ? 'navbar-mobile-abierto' : ''}`}>
                <div className="nav-wrapper">
                    <Link to="/" className="navbar-logo brand-logo">MusicStore</Link>

                    <a
                        href="#"
                        className="sidenav-trigger"
                        onClick={(e) => { e.preventDefault(); setMenuAbierto(!menuAbierto) }}
                    >
                        <i className="material-icons">{menuAbierto ? 'close' : 'menu'}</i>
                    </a>

                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/catalogo">Catálogo</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/encuesta">Recomendaciones</Link></li>
                        <li>
                            <button className="btn-tema btn-flat" onClick={toggleTema}>
                                {darkMode ? '☀️' : '🌙'}
                            </button>
                        </li>
                        {usuario ? (
                            <>
                                <li><span className="usuario-nombre">Hola, {usuario.nombre}</span></li>
                                <li>
                                    <button className="btn-flat btn-logout" onClick={handleLogout}>
                                        Salir
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="btn-nav-login">Iniciar Sesión</Link></li>
                                <li><Link to="/registro" className="btn-nav-registro btn waves-effect">Registrarse</Link></li>
                            </>
                        )}
                        <li>
                            <div className="btn-carrito-wrapper">
                                <button className="btn-flat btn-carrito" onClick={() => setCarritoAbierto(true)}>🛒</button>
                                {totalItems > 0 && (
                                    <span className="carrito-contador">{totalItems}</span>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
                {menuAbierto && (
                    <div className="menu-movil">
                        <Link to="/catalogo" onClick={() => setMenuAbierto(false)}>Catálogo</Link>
                        <Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>
                        <Link to="/encuesta" onClick={() => setMenuAbierto(false)}>Recomendaciones</Link>

                        {usuario ? (
                            <>
                                <span className="menu-movil-saludo">Hola, {usuario.nombre}</span>
                                <button onClick={() => { handleLogout(); setMenuAbierto(false) }}>Salir</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuAbierto(false)}>Iniciar Sesión</Link>
                                <Link to="/registro" onClick={() => setMenuAbierto(false)}>Registrarse</Link>
                            </>
                        )}

                        <button onClick={toggleTema}>{darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}</button>
                        <button onClick={() => { setMenuAbierto(false); setCarritoAbierto(true) }}>
                            🛒 Carrito{totalItems > 0 && ` (${totalItems})`}
                        </button>
                    </div>
                )}
            </nav>
            {carritoAbierto && (<Carrito onCerrar={() => setCarritoAbierto(false)} />)}
        </>
    )
}
export default Navbar