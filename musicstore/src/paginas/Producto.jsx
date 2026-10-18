import { useParams, useNavigate } from 'react-router-dom'
import { productos } from '../data/productos'
import { useCarrito } from '../context/CarritoContext'
import '../styles/Producto.css'

function Producto(){
    const { id } = useParams()
    const navigate = useNavigate()
    const { agregarProducto } = useCarrito()
    const producto = productos.find(p => p.id === parseInt(id))

    if(!producto){
        return (
            <div className="producto-notfound">
                <h2>Producto no encontrado</h2>
                <button className="btn waves-effect" onClick={() => navigate('/catalogo')}>
                    ← Volver al catálogo
                </button>
            </div>
        )
    }

    return (
        <div className="producto-detalle-container">
            <button className="btn-flat producto-volver" onClick={() => navigate('/catalogo')}>
                ← Volver al catálogo
            </button>

            <div className="row producto-detalle">
                <div className="col s12 m6">
                    <img 
                        src={producto.imagen_url} 
                        alt={producto.nombre}
                        className="producto-detalle-img"
                    />
                </div>

                <div className="col s12 m6 producto-detalle-info">
                    <span className="producto-detalle-marca">{producto.marca}</span>
                    <h1 className="producto-detalle-nombre">{producto.nombre}</h1>
                    <span className="producto-detalle-categoria">{producto.categoria}</span>
                    
                    <p className="producto-detalle-descripcion">
                        {producto.descripcion || 'Instrumento musical de alta calidad. Ideal para músicos de todos los niveles.'}
                    </p>

                    <p className="producto-detalle-precio">
                        ${producto.precio.toLocaleString('es-AR')}
                    </p>

                    <div className="producto-detalle-acciones">
                        <button 
                            className="btn waves-effect waves-light btn-agregar-detalle"
                            onClick={() => agregarProducto(producto)}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Producto