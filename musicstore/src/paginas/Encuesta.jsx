import { useState } from "react";
import '../styles/Encuesta.css'

const niveles = ['Principiante', 'Intermedio', 'Avanzado']
const tipos = ['Guitarras', 'Bajos', 'Teclados', 'Baterías', 'Micrófonos', 'Sin preferencia']
const generos = ['Rock', 'Jazz', 'Clásico', 'Pop', 'Metal', 'Folklore', 'Sin preferencia']
const marcas = ['Fender', 'Gibson', 'Yamaha', 'Roland', 'Pearl', 'Shure', 'Sin preferencia']
const presupuestos = [
    'Hasta $100.000',
    'Hasta $300.000',
    'Hasta $500.000',
    'Hasta $800.000',
    'Sin límite'
]

function Encuesta(){
    const [nivel, setNivel] = useState('')
    const [tipo, setTipo] = useState('')
    const [genero, setGenero] = useState('')
    const [marca, setMarca] = useState('')
    const [presupuesto, setPresupuesto] = useState('')
    const [resultado, setResultado] = useState('')
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')

    const validar = () =>{
        if(!nivel || !tipo || !genero || !marca || !presupuesto){
            setError('Todos los campos deben estar completados')
            return false
        }
        return true
    }
    const handleSubmit = async () =>{
        setError('')
        setResultado('')
        if(!validar()) return
        setCargando(true)
    
    const prompt = `Un usuario completó una encuesta con las siguientes preferencias:
    - Nivel musical: ${nivel}
    - Tipo de instrumento: ${tipo}
    - Género musical que toca: ${genero}
    - Marca preferida: ${marca}
    - Presupuesto: ${presupuesto}

    Basándote en el catálogo de MusicStore, recomendá el instrumento más adecuado para este usuario. Explicá brevemente por qué es la mejor opción para su nivel y estilo musical. Si hay más de una opción que encaje, mencioná las alternativas.`
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mensaje: prompt, historial: []})
        })

        const data  = await response.json()
        if(!response.ok){
            setError('Error al obtener su recomendacion')
        }
        setResultado(data.respuesta)
    }catch(err){
        setError('Error al conectarse con el servidor')
    }finally{
        setCargando(false)
    }
  }
    const Opciones = ({ opciones, valor, onChange}) => (
        <div className="encuesta-opciones">
           { opciones.map(op =>(
             <button key={op} className={`encuesta-opcion ${valor === op ? 'seleccionado' : ''}`} onClick={() => onChange(op)}>{op}</button>
            ))}
        </div>
    )

    return (
        <div className="encuesta-container">
            <div className="encuesta-header">
                <h1>Encontrá tu instrumento ideal</h1>
                <p>Respondé estas preguntas y te recomendamos el instrumento perfecto para vos.</p>
            </div>

            <div className="encuesta-form">
                <div className="encuesta-campo">
                    <label>¿Cuál es tu nivel musical?</label>
                    <Opciones opciones={niveles} valor={nivel} onChange={setNivel} />
                </div>

                <div className="encuesta-campo">
                    <label>¿Qué tipo de instrumento buscás?</label>
                    <Opciones opciones={tipos} valor={tipo} onChange={setTipo} />
                </div>

                <div className="encuesta-campo">
                    <label>¿Qué género musical tocás?</label>
                    <Opciones opciones={generos} valor={genero} onChange={setGenero} />
                </div>

                <div className="encuesta-campo">
                    <label>¿Tenés preferencia de marca?</label>
                    <Opciones opciones={marcas} valor={marca} onChange={setMarca} />
                </div>

                <div className="encuesta-campo">
                    <label>¿Cuál es tu presupuesto?</label>
                    <Opciones opciones={presupuestos} valor={presupuesto} onChange={setPresupuesto} />
                </div>

                {error && <div className="encuesta-error">{error}</div>}

                <button
                    className="btn-encuesta"
                    onClick={handleSubmit}
                    disabled={cargando}
                >
                    {cargando ? 'Analizando tus preferencias...' : 'Ver recomendación'}
                </button>
            </div>

            {cargando && (
                <div className="encuesta-cargando">
                    Consultando al asistente...
                </div>
            )}

            {resultado && (
                <div className="encuesta-resultado">
                    <h2>Nuestra recomendación para vos</h2>
                    <p>{resultado}</p>
                </div>
            )}
        </div>
    )
}

export default Encuesta
