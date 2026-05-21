import '../styles/ProductCard.css'
import { useCarrito} from '../context/CarritoContext'
function ProductCard({ producto }) {
    const {agregarProducto} = useCarrito();
  return (
    <div className="producto-card">
      <img src={producto.imagen_url} alt={producto.nombre} />
      <div className="producto-card-body">
        <span className="producto-marca">{producto.marca}</span>
        <span className="producto-nombre">{producto.nombre}</span>
        <span className="producto-categoria">{producto.categoria}</span>
        <span className="producto-precio">
          ${producto.precio.toLocaleString('es-AR')}
        </span>
      </div>
      <div className="producto-footer">
        <button className="btn-agregar" onClick={() => agregarProducto(producto)}>Agregar al carrito</button>
      </div>
    </div>
  )
}

export default ProductCard