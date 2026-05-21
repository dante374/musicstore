import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function ProveedorDeCarrito({ children }){
    const [items, setItems] = useState([]);
    const agregarProducto = (producto) =>{
        setItems(prev => {
            const existe = prev.find(item => item.id === producto.id);
            if(existe){
                return prev.map(item =>
                    item.id === producto.id ? {...item, cantidad: item.cantidad +1}:item
                );
            }
            return [...prev, {...producto, cantidad: 1}];
        });
    };

    const quitarProducto = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };
    const cambiarCantidad = (id, cantidad) => {
        if(cantidad <= 0){
            quitarProducto(id);
            return;
        }
        setItems(prev => 
            prev.map(item => item.id === id ? {...item, cantidad } : item)
        );
    };

    const vaciarCarrito = () => setItems([]);

    const totalItems = items.reduce((acc, item) => acc+ item.cantidad, 0);
    const totalPrecio = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    return (
        <CarritoContext.Provider value = {{
            items,
            agregarProducto,
            quitarProducto,
            cambiarCantidad,
            vaciarCarrito,
            totalItems,
            totalPrecio
        }}>
            {children}
        </CarritoContext.Provider>
    )
}

export const useCarrito = () => useContext(CarritoContext);