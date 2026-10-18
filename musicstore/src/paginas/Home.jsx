import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { productos } from '../data/productos'
import '../styles/Home.css'
import M from 'materialize-css'

function Home(){
    useEffect(() => {
        const elems = document.querySelectorAll('.carousel')
        M.Carousel.init(elems, {
            fullWidth: false,
            indicators: true
        })
    }, [])

    return(
        <>
            <section className='hero'>
                <div className='hero-contenido'>
                    <span className='hero-tag'>Bienvenido a MusicStore</span>
                    <h1 className='hero-titulo'><span>Melodías</span> para todas las <span>emociones</span></h1>
                    <p className='hero-subtitulo'>Explorá nuestra selección de instrumentos musicales.</p>
                </div>
                <div className='hero-acciones'>
                    <Link to="/catalogo" className='btn waves-effect btn-hero-primary'>Ver catálogo</Link>
                    <Link to="/contacto" className='btn-flat btn-hero-secondary'>Contactanos</Link>
                </div>
            </section>

            <section className='home-carousel-section'>
                <h2 className='home-carousel-titulo'>Productos destacados</h2>
                <div className="carousel">
                    {productos.slice(0, 6).map(producto => (
                        <div className="carousel-item" key={producto.id}>
                            <Link to={`/producto/${producto.id}`}>
                                <img src={producto.imagen_url} alt={producto.nombre} />
                                <div className='carousel-info'>
                                    <p className='carousel-nombre'>{producto.nombre}</p>
                                    <p className='carousel-precio'>${producto.precio.toLocaleString('es-AR')}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home