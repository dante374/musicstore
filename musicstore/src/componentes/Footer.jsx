import { useState } from 'react'
import '../styles/Footer.css'
function Footer(){
    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const handleSuscripcion  = async () =>{
        setError('')
        setMensaje('')
        if(!email){
            setError('El email es requerido')
            return
        }
        if(!/\S+@\S+\.\S+/.test(email)){
            setError('El email no es valido')
            return
        }
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            })
            const data = await response.json()
            if(!response.ok){
                setError(data.error)
                return
            }
            setMensaje(data.mensaje)
            setEmail('')
        }catch(err){
            setError('Error al conectar con el servidor')
        }finally{
        }
    }
    return(
        <footer className="footer">
         <div className='footer-suscripcion'>
            <p className='footer-suscripcion-titulo'>Novedades y promociones</p>
            <div className='footer-suscripcion-form'>
                <input type="email" value={email} placeholder='tu@email.com' onChange={e => setEmail(e.target.value)} className='footer-input'/>
                <button className='footer-btn-suscribir' onClick={handleSuscripcion}>Suscribirse</button>
            </div>
            {error && <span className='footer-error'>{error}</span>}
            {mensaje && <span className='footer-exito'>{mensaje}</span>}
         </div>
         <ul className="footer-links">
            <li><a href="">Contacto</a></li>
            <li><a href="">Novedades</a></li>
            <li><a href="">Sobre nosotros</a></li>
         </ul>
         <p>© 2026 MusicStore. Todos los derechos reservados.</p>
        </footer>
    )
}
export default Footer