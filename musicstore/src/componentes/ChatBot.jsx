import { useState, useRef, useEffect } from "react";
import '../styles/Chatbot.css'
const mensajeInicial = {
    role: 'assistant',
    content: '¡Hola! Soy el asistente de MusicStore 🎸 ¿En que puedo ayudarte?'
}
function ChatBot(){
    const [abierto, setAbierto] = useState(false)
    const [mensajes, setMensajes] = useState([mensajeInicial])
    const [input, setInput] = useState('');
    const [cargando, setCargando] = useState(false)
    const mensajeRef = useRef(null)

    useEffect(() => {
        if(mensajeRef.current){
            mensajeRef.current.scrollTop = mensajeRef.current.scrollHeight
        }
    }, [mensajes, cargando])

    const enviarMensaje = async () => {
        if(!input.trim() || cargando) return

        const nuevoMensaje = {role: 'user', content: input}
        const historialActualizado = [...mensajes, nuevoMensaje]

        setMensajes(historialActualizado);
        setInput('');
        setCargando(true);
        try{
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    mensaje: input,
                    historial: mensajes.map(m => ({
                        role: m.role === 'assistant' ? 'assistant' : 'user',
                        content: m.content
                    }))
                })
            })
            const data = await response.json();
            setMensajes(prev => [...prev, {role: 'assistant', content: data.respuesta,}])
        }catch(error){
            setMensajes(prev => [...prev, {
                role: 'assistant',
                content: 'Hubo un error con el asistente al conectar. Intente de nuevo'
            }])   
        } finally{
            setCargando(false)
        }
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') enviarMensaje()
    }
    return(
        <>
        <div className="todo">
          {abierto && (
            <div className="chatbot-panel">
                <div className="chatbot-header">
                    <div>
                        <h3>Asistente MusicStore</h3>
                        <span>● En línea</span>
                    </div>
                    <button className="btn-cerrar-chat" onClick={() => setAbierto(false)}>✕</button>
                </div>

                <div className="chatbot-mensajes" ref={mensajeRef}>
                    {
                        mensajes.map((msg, index) => (
                            <div key={index} className={`mensaje ${msg.role === 'assistant' ? 'mensaje-bot': 'mensaje-usuario'}`}>
                                {msg.content}
                            </div>
                        ))
                    }
                    {cargando && (
                        <div className="mensaje-cargando">
                            Escribiendo...
                        </div>
                    )}
                </div>
                <div className="chatbot-input">
                    <input type="text" placeholder="Escriba su consulta..." value = {input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={cargando} />
                    <button className="btn-enviar" onClick={enviarMensaje} disabled={cargando}>Enviar</button>
                </div>
            </div>
          )}
          <button className="chatbot-boton" onClick={() => setAbierto(!abierto)}>
            {abierto ? '✕' : '💬'}
          </button>
         </div>
        </>
    )
}

export default ChatBot