import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

export const ProductoContext = createContext();

export function ProductoProvider({ children }) {
    //   const [productos, setProductos] = useState([]);
    //   const [productoActual, setProductoActual] = useState(null);
    //   const [cargando, setCargando] = useState(false);
    //   const [error, setError] = useState(null);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    const obtenerNuevoId = async () => {
        try {
            const respuesta = await fetch("https://68e441ef8e116898997b635a.mockapi.io/productos");
            if (!respuesta.ok) throw new Error('Error al obtener la lista de productos.');

            const productosActuales = await respuesta.json();
            return productosActuales.length + 1; // Nuevo ID basado en la cantidad actual de productos      

        } catch (error) {
            toast.error(` Error al obtener el ID del nuevo producto.`, {
                position: "top-right",
                autoClose: 2800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            throw error;
        }
    };

    const agregarProducto = async (producto) => {
        try {
            const idNuevo = await obtenerNuevoId();
            const productoEnviar = { ...nuevoProducto, id: String(idNuevo), precio: parseFloat(nuevoProducto.precio) };
            const respuesta = await fetch("https://68e441ef8e116898997b635a.mockapi.io/productos", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoEnviar),
            });

            if (!respuesta.ok) throw new Error('Error al agregar el producto.');

            const data = await respuesta.json();
            setProductos([...productos, data]);

            toast.success(`Se agrego el producto con ID: ${data.id}`, {
                position: "top-right",
                autoClose: 2800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            return data;

        } catch (error) {
            toast.error(` No se puedo agregar el producto.`, {
                position: "top-right",
                autoClose: 2800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        finally {
            setCargando(false);
        }
    };

    return (
        <ProductoContext.Provider
            value={{
                productos,
                cargando,
                error,
                agregarProducto,
                editarProducto,
                validarProducto,
                validar
            }}>
            {children}
        </ProductoContext.Provider>
    );

};
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
    }
    return context;
};