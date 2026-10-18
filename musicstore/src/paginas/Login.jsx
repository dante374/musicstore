import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

function Login(){
    const [email, setEmail] = useState('')
    const [errores, setErrores] = useState({})
    const [password, setPassword] = useState('')
    const [cargando, setCargando] = useState(false)
    const { login } = useAuth()
    const [errorServidor, setErrorServidor] = useState('')
    const navigate = useNavigate()

    const validar = () => {
        const nuevosErrores = {}
        if(!email) nuevosErrores.email = 'El email es requerido'
        else if(!/\S+@\S+\.\S+/.test(email)) nuevosErrores.email = 'El email no es válido'
        if(!password) nuevosErrores.password = 'La contraseña es requerida'
        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleSubmit = () => {
        setErrorServidor('')
        if(!validar()) return
        setCargando(true)

        try {
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
            const usuario = usuarios.find(u => u.email === email && u.password === password)

            if(!usuario){
                setErrorServidor('Email o contraseña incorrectos')
                return
            }

            login({ usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } })
            navigate('/')
        } catch(err) {
            setErrorServidor('Error al iniciar sesión')
        } finally {
            setCargando(false)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') handleSubmit()
    }

    return(
        <div className='auth-container'>
            <div className='auth-card'>
                <h1 className='auth-titulo'>Iniciar sesión</h1>
                <p className='auth-subtitulo'>Bienvenido de vuelta a MusicStore</p>
                {errorServidor && <div className='auth-error'>{errorServidor}</div>}

                <div className='auth-form'>
                    <div className={`auth-campo ${errores.email ? 'auth-campo-error' : ''}`}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder='tu@email.com' 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            onKeyDown={handleKeyDown} 
                        />
                        {errores.email && <span className='auth-error-campo'>{errores.email}</span>}
                    </div>

                    <div className={`auth-campo ${errores.password ? 'auth-campo-error' : ''}`}>
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            placeholder='Tu contraseña' 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            onKeyDown={handleKeyDown} 
                        />
                        {errores.password && <span className='auth-error-campo'>{errores.password}</span>}
                    </div>

                    <button 
                        className='btn waves-effect waves-light btn-auth' 
                        onClick={handleSubmit} 
                        disabled={cargando}
                    >
                        {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </div>
                <p className='auth-link'>¿No tenés cuenta? <Link to="/registro">Registrate</Link></p>
            </div>
        </div>
    )
}

export default Login