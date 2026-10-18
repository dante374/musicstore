import { useState } from "react";
import '../styles/Auth.css'

function Contacto(){
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [asunto, setAsunto] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState(false)
    const [cargando, setCargando] = useState(false)
    const [errorServidor, setErrorServidor] = useState('')

    const validar = () => {
        const nuevosErrores = {}
        if(!nombre) nuevosErrores.nombre = 'El nombre es requerido'
        if(!email) nuevosErrores.email = 'El email es requerido'
        else if(!/\S+@\S+\.\S+/.test(email)) nuevosErrores.email = 'El email no es válido'
        if(!asunto) nuevosErrores.asunto = 'El asunto es requerido'
        if(!mensaje) nuevosErrores.mensaje = 'El mensaje es requerido'
        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleSubmit = () => {
        setErrorServidor('')
        setExito(false)
        if(!validar()) return
        setCargando(true)

        setTimeout(() => {
            setExito(true)
            setNombre('')
            setEmail('')
            setAsunto('')
            setMensaje('')
            setCargando(false)
        }, 800)
    }

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ maxWidth: '560px' }}>
                <h1 className="auth-titulo">Contacto</h1>
                <p className="auth-subtitulo">Envianos tu consulta y te respondemos a la brevedad</p>

                {errorServidor && <div className="auth-error">{errorServidor}</div>}

                {exito && (
                    <div className="auth-exito">
                        ✅ ¡Mensaje enviado correctamente!
                    </div>
                )}

                <div className="auth-form">
                    <div className={`auth-campo ${errores.nombre ? 'auth-campo-error' : ''}`}>
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
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
                        />
                        {errores.email && <span className="auth-error-campo">{errores.email}</span>}
                    </div>

                    <div className={`auth-campo ${errores.asunto ? 'auth-campo-error' : ''}`}>
                        <label>Asunto</label>
                        <input
                            type="text"
                            placeholder="¿En qué podemos ayudarte?"
                            value={asunto}
                            onChange={e => setAsunto(e.target.value)}
                        />
                        {errores.asunto && <span className="auth-error-campo">{errores.asunto}</span>}
                    </div>

                    <div className={`auth-campo ${errores.mensaje ? 'auth-campo-error' : ''}`}>
                        <label>Mensaje</label>
                        <textarea
                            placeholder="Escribí tu mensaje..."
                            value={mensaje}
                            onChange={e => setMensaje(e.target.value)}
                            rows={5}
                        />
                        {errores.mensaje && <span className="auth-error-campo">{errores.mensaje}</span>}
                    </div>

                    <button
                        className="btn waves-effect waves-light btn-auth"
                        onClick={handleSubmit}
                        disabled={cargando}
                    >
                        {cargando ? 'Enviando...' : 'Enviar mensaje'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Contacto