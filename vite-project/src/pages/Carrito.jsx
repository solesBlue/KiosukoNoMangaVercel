import React from 'react'; 
import { useNavigate } from "react-router-dom";
import {useCarritoContext} from "../context/CarritoContext";
import Breadcrumb from "../components/Breadcrumb.jsx";

import "../assets/styles/carrito.css"

export default function CarritoCompras() {
  
  const {carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total,eliminarDelCarrito} = useCarritoContext();
  const navigate = useNavigate();

  const cargoEnvio = 5000; // Cargo fijo por envío

  // const formato = (num) => {
  // return Number(num).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");};

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <i className="fa-solid fa-cart-shopping fa-3x" style={{opacity: 0.3}}></i>
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos para continuar!</p>
        <button onClick={() => navigate("/productos")} className="btn btn-volver">
          Ver Productos
        </button>
      </div>
    );
  }

  return (
<>
          <Breadcrumb 
        items={[
          { label: "Home", to: "/" },
          { label: "Carrito de Compras" }
        ]} 
      />
    <div className="carrito-page">
      <div className="carrito-container">
        <h2 className="carrito-titulo">Carrito de compras</h2>
        {/* Lista de productos */}
        {/*  className="carrito-lista"  */}
        <div >
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              {/* Imagen (opcional, si tienes) */}
              {item.avatar && (
                <img src={item.avatar} alt={item.name} className="item-imagen" />
              )}

              <div className="item-detalles">
                <h3 className="item-nombre">{item.name}</h3>
                <p className="item-precio-unitario">
                  ${Number(item.precio).toFixed(2)} c/u
                </p>
              </div>

              <div className="item-cantidad">
                <button
                  onClick={() => quitarCantidad(item.id)}
                  aria-label="Disminuir cantidad"
                  className="btn-cantidad"
                > − </button>
                <span className="cantidad">{item.cantidad}</span>
                <button
                  onClick={() => agregarCantidad(item.id)}
                  aria-label="Aumentar cantidad"
                  className="btn-cantidad"
                > + </button>
              </div>

              <div className="item-subtotal">
                ${(item.precio * item.cantidad).toFixed(2)}
              </div>

              <button
                onClick={() => eliminarDelCarrito(item.id)}
                aria-label="Eliminar producto"
                className="btn-eliminar"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Resumen de compra */}
        <div className="carrito-resumen">
          <div className="resumen-linea">
            <span><strong>Subtotal</strong></span>
            <span>${Number(total).toFixed(2)}</span>
          </div>
          <div className="resumen-linea">
            <span><strong>Cargo por envío</strong></span>
            <span>${Number(cargoEnvio).toFixed(2)}</span>
          </div>
          <div className="resumen-linea total">
            <strong>Total a pagar</strong>
            <strong className="monto-final">${Number(total+cargoEnvio).toFixed(2)}</strong>
          </div>

          <div className="resumen-acciones">
            <button onClick={vaciarCarrito} className="btn-vaciar">Vaciar Carrito</button>
            {/* <Link to="/" className="btn btn-volver">← Continuar Comprando</Link> */}
            <button onClick={irAPagar} className="btn-pagar">Pagar</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}