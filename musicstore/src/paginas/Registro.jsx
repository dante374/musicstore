import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/Auth.css'

function Registro(){
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [errores, setErrores] = useState({})
    const [errorServidor, setErrorServidor] = useState('')
    const [cargando, setCargando] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const validar = () => {
        const nuevosErrores = {}
        if(!nombre) nuevosErrores.nombre = 'El nombre es requerido'
        if(!email) nuevosErrores.email = 'El email es requerido'
        else if(!/\S+@\S+\.\S+/.test(email)) nuevosErrores.email = 'El email no es válido'
        if(!password) nuevosErrores.password = 'La contraseña es requerida'
        else if(password.length < 6) nuevosErrores.password = 'Mínimo 6 caracteres'
        if(!confirmar) nuevosErrores.confirmar = 'Confirmá tu contraseña'
        else if(password !== confirmar) nuevosErrores.confirmar = 'Las contraseñas no son iguales'
        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleSubmit = () => {
        setErrorServidor('')
        if(!validar()) return
        setCargando(true)

        try {
            // Verificar si el email ya está registrado
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
            const existe = usuarios.find(u => u.email === email)
            if(existe){
                setErrorServidor('El email ya está registrado')
                return
            }

            // Guardar usuario
            const nuevoUsuario = { id: Date.now(), nombre, email, password }
            usuarios.push(nuevoUsuario)
            localStorage.setItem('usuarios', JSON.stringify(usuarios))

            // Loguear automáticamente
            login({ usuario: { id: nuevoUsuario.id, nombre, email } })
            navigate('/')
        } catch(err) {
            setErrorServidor('Error al registrar usuario')
        } finally {
            setCargando(false)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') handleSubmit()
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-titulo">Crear cuenta</h1>
                <p className="auth-subtitulo">Unite a MusicStore</p>

                {errorServidor && <div className="auth-error">{errorServidor}</div>}

                <div className="auth-form">
                    <div className={`auth-campo ${errores.nombre ? 'auth-campo-error' : ''}`}>
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errores.nombre && <span className="auth-error-campo">{errores.nombre}</span>}
                    </div>

                    <div className={`auth-campo ${errores.email ? 'auth-campo-error' : ''}`}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errores.email && <span className="auth-error-campo">{errores.email}</span>}
                    </div>

                    <div className={`auth-campo ${errores.password ? 'auth-campo-error' : ''}`}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errores.password && <span className="auth-error-campo">{errores.password}</span>}
                    </div>

                    <div className={`auth-campo ${errores.confirmar ? 'auth-campo-error' : ''}`}>
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            placeholder="Repetí tu contraseña"
                            value={confirmar}
                            onChange={e => setConfirmar(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {errores.confirmar && <span className="auth-error-campo">{errores.confirmar}</span>}
                    </div>

                    <button
                        className="btn waves-effect waves-light btn-auth"
                        onClick={handleSubmit}
                        disabled={cargando}
                    >
                        {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>
                </div>

                <p className="auth-link">
                    ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default Registro