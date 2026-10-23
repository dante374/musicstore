import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useNavigate } from 'react-router-dom'
import '../styles/Checkout.css'

function Checkout(){
    const { items, totalPrecio, vaciarCarrito } = useCarrito()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [direccion, setDireccion] = useState('')
    const [tarjeta, setTarjeta] = useState('')
    const [vencimiento, setVencimiento] = useState('')
    const [cvv, setCvv] = useState('')
    const [errores, setErrores] = useState({})
    const [exito, setExito] = useState(false)
    const [cargando, setCargando] = useState(false)

    const validar = () => {
        const nuevosErrores = {}
        if(!nombre) nuevosErrores.nombre = 'El nombre es requerido'

        if(!email) nuevosErrores.email = 'El email es requerido'

        else if(!/\S+@\S+\.\S+/.test(email)) nuevosErrores.email = 'El email no es válido'

        if(!direccion) nuevosErrores.direccion = 'La dirección es requerida'

        if(direccion.length<20) nuevosErrores.direccion = 'Ingrese una direccion completa'

        if(!tarjeta) nuevosErrores.tarjeta = 'El número de tarjeta es requerido'

        else if(!/^\d{16}$/.test(tarjeta.replace(/\s/g, ''))) nuevosErrores.tarjeta = 'La tarjeta debe tener 16 dígitos'

        if(!vencimiento) nuevosErrores.vencimiento = 'El vencimiento es requerido'

        else if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento)) nuevosErrores.vencimiento = 'Formato inválido (MM/AA)'

        if(!cvv) nuevosErrores.cvv = 'El CVV es requerido'

        else if(!/^\d{3,4}$/.test(cvv)) nuevosErrores.cvv = 'El CVV debe tener 3 o 4 dígitos'

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleSubmit = () => {
        if(!validar()) return
        setCargando(true)
        setTimeout(() => {
            setCargando(false)
            setExito(true)
            vaciarCarrito()
        }, 1500)
    }

    if(items.length === 0 && !exito){
        return (
            <div className="checkout-vacio">
                <h2>Tu carrito está vacío</h2>
                <button className="btn waves-effect" onClick={() => navigate('/catalogo')}>
                    Ver catálogo
                </button>
            </div>
        )
    }

    if(exito){
        return (
            <div className="checkout-exito">
                <i className="material-icons checkout-exito-icono">check_circle</i>
                <h2>¡Compra realizada!</h2>
                <p>Tu pedido fue procesado correctamente. Recibirás un email de confirmación.</p>
                <button className="btn waves-effect" onClick={() => navigate('/')}>
                    Volver al inicio
                </button>
            </div>
        )
    }

    return (
        <div className="checkout-container">
            <h1 className="checkout-titulo">Finalizar compra</h1>

            <div className="row">
                <div className="col s12 m7">
                    <div className="checkout-seccion">
                        <h2 className="checkout-subtitulo">Datos personales</h2>
                        <div className={`auth-campo ${errores.nombre ? 'auth-campo-error' : ''}`}>
                            <label>Nombre completo</label>
                            <input type="text" className="browser-default" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                            {errores.nombre && <span className="auth-error-campo">{errores.nombre}</span>}
                        </div>
                        <div className={`auth-campo ${errores.email ? 'auth-campo-error' : ''}`}>
                            <label>Email</label>
                            <input type="email" className="browser-default" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                            {errores.email && <span className="auth-error-campo">{errores.email}</span>}
                        </div>
                        <div className={`auth-campo ${errores.direccion ? 'auth-campo-error' : ''}`}>
                            <label>Dirección de envío</label>
                            <input type="text" className="browser-default" placeholder="Calle, número, ciudad" value={direccion} onChange={e => setDireccion(e.target.value)} />
                            {errores.direccion && <span className="auth-error-campo">{errores.direccion}</span>}
                        </div>
                    </div>

                    <div className="checkout-seccion">
                        <h2 className="checkout-subtitulo">Datos de pago</h2>
                        <div className={`auth-campo ${errores.tarjeta ? 'auth-campo-error' : ''}`}>
                            <label>Número de tarjeta</label>
                            <input type="text" className="browser-default" placeholder="1234 5678 9012 3456" maxLength={19} value={tarjeta} onChange={e => setTarjeta(e.target.value)} />
                            {errores.tarjeta && <span className="auth-error-campo">{errores.tarjeta}</span>}
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <div className={`auth-campo ${errores.vencimiento ? 'auth-campo-error' : ''}`}>
                                    <label>Vencimiento</label>
                                    <input type="text" className="browser-default" placeholder="MM/AA" maxLength={5} value={vencimiento} onChange={e => setVencimiento(e.target.value)} />
                                    {errores.vencimiento && <span className="auth-error-campo">{errores.vencimiento}</span>}
                                </div>
                            </div>
                            <div className="col s6">
                                <div className={`auth-campo ${errores.cvv ? 'auth-campo-error' : ''}`}>
                                    <label>CVV</label>
                                    <input type="text" className="browser-default" placeholder="123" maxLength={4} value={cvv} onChange={e => setCvv(e.target.value)} />
                                    {errores.cvv && <span className="auth-error-campo">{errores.cvv}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col s12 m5">
                    <div className="checkout-resumen">
                        <h2 className="checkout-subtitulo">Resumen del pedido</h2>
                        {items.map(item => (
                            <div className="checkout-item" key={item.id}>
                                <span>{item.nombre} x{item.cantidad}</span>
                                <span>${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
                            </div>
                        ))}
                        <div className="checkout-total">
                            <strong>Total</strong>
                            <strong>${totalPrecio.toLocaleString('es-AR')}</strong>
                        </div>
                        <button
                            className="btn waves-effect waves-light checkout-btn"
                            onClick={handleSubmit}
                            disabled={cargando}
                        >
                            {cargando ? 'Procesando...' : 'Confirmar compra'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout