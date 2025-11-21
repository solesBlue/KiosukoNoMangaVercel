import React from 'react';
import { useNavigate } from "react-router-dom";
import {useAppContext} from "../context/AppContext";

export default function CarritoCompras() {
  
  const {carrito, vaciarCarrito, agregarCantidad, quitarCantidad, isAuthenticated} = useAppContext();
  const navigate = useNavigate();

  //Pasa a contecto
  // const vaciarCarrito = () => {
  //   setCarrito([]);
  // };

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.precio), 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id}>
              {item.name} - ${Number(item.precio).toFixed(3)}
              (Cantidad: {item.cantidad || 1})
              <button onClick={()=> quitarCantidad(item.id)}>-</button>
              <button onClick={()=> agregarCantidad(item.id)}>+</button>
            </div>
          ))}
          <div>
            <hr />
            Total: ${Number(total).toFixed(3)}
          </div>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <button onClick={irAPagar}>Pagar</button>
        </>
      )}
    </div>
  );
}