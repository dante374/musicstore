import { Link } from 'react-router-dom'

function NoEncontrada() {
    return (
        <section style={{ textAlign: 'center', padding: '80px 16px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Página no encontrada</h1>
            <p style={{ margin: '16px 0 24px' }}>
                La dirección que ingresaste no existe.
            </p>
            <Link to="/" className="btn waves-effect">Volver al inicio</Link>
        </section>
    )
}

export default NoEncontrada