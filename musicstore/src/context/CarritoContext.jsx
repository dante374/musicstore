import { createContext, useContext, useState } from "react";
import M from 'materialize-css'

const CarritoContext = createContext();

export const MAX_POR_PRODUCTO = 5
export const MAX_TOTAL = 15

const avisar = (texto) => M.toast({ html: texto, displayLength: 2500 })

export function ProveedorDeCarrito({ children }){
    const [items, setItems] = useState([]);

    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const agregarProducto = (producto) => {
        const existente = items.find(item => item.id === producto.id)

        if(totalItems >= MAX_TOTAL){
            avisar(`El carrito no puede superar los ${MAX_TOTAL} artículos`)
            return
        }
        if(existente && existente.cantidad >= MAX_POR_PRODUCTO){
            avisar(`Máximo ${MAX_POR_PRODUCTO} unidades por producto`)
            return
        }

        setItems(prev => {
            const existe = prev.find(item => item.id === producto.id);
            if(existe){
                return prev.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
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
        const otrosItems = items
            .filter(item => item.id !== id)
            .reduce((acc, item) => acc + item.cantidad, 0)

        if(cantidad > MAX_POR_PRODUCTO){
            avisar(`Máximo ${MAX_POR_PRODUCTO} unidades por producto`)
            return
        }
        if(otrosItems + cantidad > MAX_TOTAL){
            avisar(`El carrito no puede superar los ${MAX_TOTAL} artículos`)
            return
        }

        setItems(prev =>
            prev.map(item => item.id === id ? { ...item, cantidad } : item)
        );
    };

    const vaciarCarrito = () => setItems([]);

    return (
        <CarritoContext.Provider value={{
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