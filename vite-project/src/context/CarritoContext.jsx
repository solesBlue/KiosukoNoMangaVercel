import React, { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// Crear el contexto
export const CarritoContext = createContext();

// Proveedor del contexto
export function CarritoProvider({ children }) {

  // Estado del carrito
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });

    toast.success(` ${producto.name || producto.nombre} fue agregado al carrito!`, {
      position: "top-right",
      autoClose: 2800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <i className="fa-solid fa-cart-plus text-success fs-4"></i>,
    });

  }


  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const quitarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map(producto => {
      if (producto.id === idProducto) {
        const cantidadActual = producto.cantidad || 1;
        if (cantidadActual === 1) {
          return null;
        }
        return { ...producto, cantidad: cantidadActual - 1 };
      }
      return producto;
    }).filter(producto => producto !== null);


    setCarrito(carritoActualizado);
  };

  const agregarCantidad = (idProducto) => {
    const nuevoCarrito = carrito.map(producto => {
      if (producto.id === idProducto) {
        return {
          ...producto,
          cantidad: (producto.cantidad || 1) + 1
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, item) => {
    const cantidad = item.cantidad || 1;
    return sum + (Number(item.precio) * cantidad);
  }, 0);


  // Valor que se provee a todos los componentes
  const value = {
    // Carrito
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,

    //funciones de cantidad
    quitarCantidad,
    agregarCantidad,
    total
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarritoContext() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarritoContext debe usarse dentro de CarritoContext");
  }
  return context;
}