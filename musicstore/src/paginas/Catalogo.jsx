import { useState, useMemo } from "react"
import { productos, categorias, marcas} from  '../data/productos'
import ProductCard from '../componentes/ProductCard'
import '../styles/Catalogo.css'
function Catalogo(){
    const [busqueda, setBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('Todas');

    const productosFiltrados = useMemo(() =>{
        return productos.filter(p =>{
            const coincideBusqueda = p.nombre.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())
            const coincideCategoria = categoriaSeleccionada === 'Todos' || p.categoria === categoriaSeleccionada
            const coincideMarca = marcaSeleccionada === 'Todas' || p.marca === marcaSeleccionada
            return coincideBusqueda && coincideCategoria && coincideMarca        
        })
    }, [busqueda, categoriaSeleccionada, marcaSeleccionada])
    return(
        <>
          <div className="catalogo-container">
            <div className="catalogo-header">
                <h1>Catalogo</h1>
                <p>Explora nuestra seccion de instrumentos musicales</p>
            </div>

            <div className="filtros-container">
                <input 
                  type="text"
                  className="filtro-busqueda"
                  placeholder="Buscar instrumento"
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                />
                <select className="filtro-select" value={categoriaSeleccionada} onChange={e => setCategoriaSeleccionada(e.target.value)}>
                    {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}   
                </select>
                <select className="filtro-select" value={marcaSeleccionada} onChange={e => setMarcaSeleccionada(e.target.value)}>
                    {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                    ))}
                </select>
            </div>
            <p className="catalogo-resultados">
                {productosFiltrados.length} producto{productosFiltrados.length!==1 ? 's':''} encontrado{productosFiltrados.length !== 1? 's' : ''}
            </p>
            {productosFiltrados.length === 0 ? (
                <div className="sin-resultados">
                    <span>🎸</span>
                    <p>No se encontraron productos con esos filtros.</p>
                </div>
               ): (
                 <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {productosFiltrados.map(producto => (
                        <div className="col" key={producto.id}>
                            <ProductCard producto={producto} />
                        </div>
                    ))}
                 </div>
               )
            }
          </div>
        </>
    )    
}
export default Catalogo