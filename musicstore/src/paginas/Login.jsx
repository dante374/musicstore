import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

function Login(){
    const [email, setEmail] = useState('')
    const [error, setErrores] = useState('')
    const [password, setPassword] = useState('')
    const [cargando, setCargando] = useState(false);
    const { login } = useAuth()
    const [errorServidor, setErrorServidor] = useState('')
    const navigate = useNavigate()

    const validar = () => {
        const nuevosErrores = {}
        if(!email) {
            nuevosErrores.email = 'El email es requerido';
        }else if(!/\S+@\S+\.\S+/.test(email)){
            nuevosErrores.email = 'El email no es valido'
        }
        if(!password){
            nuevosErrores.password = 'La contraseña es requerida';
        }
        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length ===0
    }
    const handleSubmit = async () =>{
        setErrorServidor('')
        if(!validar()){
            return
        }
        setCargando(true)
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password})
            })
            const data = await response.json()

            if(!response.ok){
                setErrorServidor(data.error)
                return
            }

            login(data)
            navigate('/')
        }catch(err){
            setErrorServidor('Error al conectar con el servidor')
        } finally {
            setCargando(false)
        }
    }

    const handleKeyDown = (e) =>{
        if(e.key == 'Enter'){
            handleSubmit()
        }
    }

    return(
        <div className='auth-container'>
            <div className='auth-card'>
                <h1 className='auth-titulo'>Iniciar sesion</h1>
                <p className='auth-subtitulo'>Bienvenido de vuelta a MusicStore</p>
                {errorServidor && <div className='auth-error'>{errorServidor}</div>}

                <div className='auth-form'>
                    <div className={`auth-campo ${error.email ? 'auth-campo-error':''}`}>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='tu@email.com' value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
                        {error.email && <span className='auth-error-campo'>{error.email}</span>}
                    </div>

                    <div className={`auth-campo ${error.password ? 'auth-campo-error':''}`}>
                        <label htmlFor="">Contraseña</label>
                        <input type="password" placeholder='Tu contraseña' value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
                        {error.password && <span className='auth-error-campo'>{error.password}</span>}
                    </div>
                    <button className='btn-auth' onClick={handleSubmit} disabled={cargando}>{cargando ? 'iniciando sesion...': 'iniciar sesion'}</button>
                </div>
                <p className='auth-link'>¿No tenes cuenta? <Link to="/registro">Registrate</Link></p>
            </div>
        </div>
    )
}

export default Login