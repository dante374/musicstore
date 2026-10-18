import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

function Footer(){
    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const handleSuscripcion = () => {
    setError('')
    setMensaje('')
    if(!email){
        setError('El email es requerido')
        return
    }
    if(!/\S+@\S+\.\S+/.test(email)){
        setError('El email no es válido')
        return
    }

    const suscriptores = JSON.parse(localStorage.getItem('suscriptores') || '[]')
    const existe = suscriptores.find(s => s === email)
    if(existe){
        setError('Este email ya está suscripto')
        return
    }

    suscriptores.push(email)
    localStorage.setItem('suscriptores', JSON.stringify(suscriptores))
    setMensaje('¡Te suscribiste correctamente!')
    setEmail('')
}

    return(
        <footer className="footer">
            <div className='footer-suscripcion'>
                <p className='footer-suscripcion-titulo'>Novedades y promociones</p>
                <div className='footer-suscripcion-form'>
                    <input 
                        type="email" 
                        value={email} 
                        placeholder='tu@email.com' 
                        onChange={e => setEmail(e.target.value)} 
                        className='browser-default footer-input'
                    />
                    <button className='btn waves-effect footer-btn-suscribir' onClick={handleSuscripcion}>
                        Suscribirse
                    </button>
                </div>
                {error && <span className='footer-error'>{error}</span>}
                {mensaje && <span className='footer-exito'>{mensaje}</span>}
            </div>
            <div className="footer-links">
                <Link to="/contacto">Contacto</Link>
                <a href="#">Novedades</a>
                <a href="#">Sobre nosotros</a>
            </div>
            <p>© 2026 MusicStore. Todos los derechos reservados.</p>
        </footer>
    )
}
export default Footer