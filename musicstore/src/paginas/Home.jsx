import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home(){
    return(
        <section className='hero'>
            <div className='hero-contenido'>
                <span className='hero-tag'>Bienvenido a MusicStore</span>
                <h1 className='hero-titulo'><span>Melodias</span> para todas</h1>
                <h1 className='hero-titulo'> las <span>emociones</span></h1>
                <p className='hero-subtitulo'>Explora nuestra seleccion de instrumentos musicales.</p>
            </div>
            <div className='hero-acciones'>
                <Link to="/catalogo" className='btn-hero-primary'>Ver catálogo</Link>
                <Link to="/contacto" className='btn-hero-secondary'>Contactanos</Link>
            </div>
        </section>
    )
}

export default Home