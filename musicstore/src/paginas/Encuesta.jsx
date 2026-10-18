import { useState } from "react";
import { productos } from '../data/productos'
import '../styles/Encuesta.css'

const niveles = ['Principiante', 'Intermedio', 'Avanzado']
const tipos = ['Guitarras', 'Bajos', 'Teclados', 'Baterías', 'Micrófonos', 'Sin preferencia']
const generos = ['Rock', 'Jazz', 'Clásico', 'Pop', 'Metal', 'Folklore', 'Sin preferencia']
const marcas = ['Fender', 'Gibson', 'Yamaha', 'Roland', 'Pearl', 'Shure', 'Sin preferencia']
const presupuestos = [
    { label: 'Hasta $100.000', valor: 100000 },
    { label: 'Hasta $300.000', valor: 300000 },
    { label: 'Hasta $500.000', valor: 500000 },
    { label: 'Hasta $800.000', valor: 800000 },
    { label: 'Sin límite', valor: Infinity }
]

function Encuesta(){
    const [nivel, setNivel] = useState('')
    const [tipo, setTipo] = useState('')
    const [genero, setGenero] = useState('')
    const [marca, setMarca] = useState('')
    const [presupuesto, setPresupuesto] = useState(null)
    const [presupuestoLabel, setPresupuestoLabel] = useState('')
    const [resultado, setResultado] = useState([])
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState('')

    const validar = () => {
        if(!nivel || !tipo || !genero || !marca || !presupuesto){
            setError('Todos los campos deben estar completados')
            return false
        }
        return true
    }

    const handleSubmit = () => {
        setError('')
        setResultado([])
        if(!validar()) return
        setCargando(true)

        setTimeout(() => {
            let filtrados = productos.filter(p => p.precio <= presupuesto)

            if(tipo !== 'Sin preferencia'){
                filtrados = filtrados.filter(p => p.categoria === tipo)
            }
            if(marca !== 'Sin preferencia'){
                const porMarca = filtrados.filter(p => p.marca === marca)
                filtrados = porMarca.length > 0 ? porMarca : filtrados
            }

            setResultado(filtrados.slice(0, 3))
            setCargando(false)
        }, 800)
    }

    const Opciones = ({ opciones, valor, onChange, esPresupuesto }) => (
        <div className="encuesta-opciones">
            {opciones.map(op => {
                const label = esPresupuesto ? op.label : op
                const val = esPresupuesto ? op.valor : op
                return (
                    <button
                        key={label}
                        className={`encuesta-opcion ${(esPresupuesto ? presupuestoLabel : valor) === label ? 'seleccionado' : ''}`}
                        onClick={() => {
                            if(esPresupuesto){
                                setPresupuesto(val)
                                setPresupuestoLabel(label)
                            } else {
                                onChange(label)
                            }
                        }}
                    >
                        {label}
                    </button>
                )
            })}
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
                    <Opciones opciones={presupuestos} valor={presupuestoLabel} onChange={() => {}} esPresupuesto={true} />
                </div>

                {error && <div className="encuesta-error">{error}</div>}

                <button
                    className="btn waves-effect waves-light btn-encuesta"
                    onClick={handleSubmit}
                    disabled={cargando}
                >
                    {cargando ? 'Analizando tus preferencias...' : 'Ver recomendación'}
                </button>
            </div>

            {cargando && (
                <div className="encuesta-cargando">
                    Buscando productos...
                </div>
            )}

            {resultado.length > 0 && (
                <div className="encuesta-resultado">
                    <h2>Nuestra recomendación para vos</h2>
                    <div className="row">
                        {resultado.map(p => (
                            <div className="col s12 m4" key={p.id}>
                                <div className="card">
                                    <div className="card-image">
                                        <img src={p.imagen_url} alt={p.nombre} />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">{p.nombre}</span>
                                        <p>{p.marca} — {p.categoria}</p>
                                        <p><strong>${p.precio.toLocaleString('es-AR')}</strong></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {resultado.length === 0 && (
                        <p>No encontramos productos que coincidan con tus preferencias.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default Encuesta