import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from 'react-router-dom'
import '../styles/Carrito.css'

function Carrito({ onCerrar }){
    const { items, quitarProducto, cambiarCantidad, vaciarCarrito, totalPrecio } = useCarrito();
    const navigate = useNavigate()
    return(
        <>
          <div className="carrito-overlay" onClick={onCerrar}/>
            <div className="carrito-panel">
                <div className="carrito-header">
                    <h2>Tu carrito</h2>
                    <button className="btn-cerrar btn-flat" onClick={onCerrar}>✕</button>
                </div>
                {items.length === 0 ? (
                    <div className="carrito-vacio"> 
                        <span>🛒</span>
                        <p>Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <div className="carrito-items">
                            {items.map(item => (
                                <div className="carrito-item" key={item.id}>
                                    <img src={item.imagen_url} alt={item.nombre}/>
                                    <div className="carrito-item-info">
                                        <span className="carrito-item-nombre">{item.nombre}</span>
                                        <span className="carrito-item-precio">${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                                        <div className="carrito-item-acciones">
                                            <button className="btn-cantidad btn-flat" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>
                                                -
                                            </button>
                                            <span className="carrito-item-cantidad">{item.cantidad}</span>
                                            <button className="btn-cantidad btn-flat" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>
                                                +
                                            </button>
                                            <button className="btn-eliminar btn-flat" onClick={() => quitarProducto(item.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="carrito-footer">
                            <div className="carrito-total">
                                <span>Total</span>
                                <strong>${totalPrecio.toLocaleString('es-AR')}</strong>
                            </div>
                            <button className="btn waves-effect waves-light btn-checkout" onClick={() => { onCerrar(); navigate('/checkout') }}>Finalizar Compra</button>
                            <button className="btn-flat btn-vaciar" onClick={vaciarCarrito}>
                                Vaciar Carrito
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Carrito