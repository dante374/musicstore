import '../styles/ProductCard.css'
import { useCarrito } from '../context/CarritoContext'
import { useNavigate } from 'react-router-dom'

function ProductCard({ producto }) {
    const { agregarProducto } = useCarrito();
    const navigate = useNavigate();

    return (
        <div className="card producto-card">
            <div className="card-image" onClick={() => navigate(`/producto/${producto.id}`)}>
                <img src={producto.imagen_url} alt={producto.nombre} />
            </div>
            <div className="card-content">
                <span className="producto-marca">{producto.marca}</span>
                <p className="card-title producto-nombre">{producto.nombre}</p>
                <span className="producto-categoria">{producto.categoria}</span>
                <p className="producto-precio">
                    ${producto.precio.toLocaleString('es-AR')}
                </p>
            </div>
            <div className="card-action">
                <button 
                    className="btn waves-effect waves-light btn-agregar" 
                    onClick={() => agregarProducto(producto)}
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}

export default ProductCard