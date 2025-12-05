import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCarritoContext } from "../context/CarritoContext";
import Breadcrumb from "../components/Breadcrumb.jsx";


export default function CarritoCompras() {

  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total, eliminarDelCarrito } = useCarritoContext();
  const navigate = useNavigate();

  const cargoEnvio = 5000; // Cargo fijo por envío

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  if (carrito.length === 0) {
    return (
      <>
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Carrito de Compras" }
          ]}
        />
        <div className="carrito-vacio">
          <i className="fa-solid fa-cart-shopping fa-3x" style={{ opacity: 0.3 }}></i>
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos para continuar!</p>
          <button onClick={() => navigate("/productos")} className="btn btn-outline-secondary">
            Ir a Productos
          </button>
        </div>
      </>
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
      <div className="py-3" >
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="rounded-4 shadow-sm overflow-hidden bg-prod-carrito" >
                {carrito.map((item) => (
                  <div key={item.id} className="d-flex align-items-center p-4 border-bottom">
                    <img src={item.avatar} alt={item.name} className="rounded-3 me-4 flex-shrink-0 img-carrito" />
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-medium text-titulo" > <strong>{item.name}</strong></h5>
                      <p className="text-muted small mb-0 p-carrito">Precio Unitario: ${Number(item.precio).toFixed(2)} c/u</p>
                    </div>

                    <div className="d-flex align-items-center ms-auto flex-shrink-0" style={{ width: '300px' }}>
                      <div className="input-group input-group-sm me-4" style={{ width: '120px' }}>
                        <button className="btn btn-outline-secondary txt-btn-minus" onClick={() => quitarCantidad(item.id)} type="button">
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="form-control text-center fw-bold cant-carrito">
                          {item.cantidad}
                        </span>
                        <button className="btn btn-outline-secondary txt-btn-minus" onClick={() => agregarCantidad(item.id)} type="button">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <div className="text-end me-4 p-carrito" style={{ width: '100px' }}>
                        <strong className="producto-precio">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </strong>
                      </div>

                      <button className="btn btn-link text-danger p-0" onClick={() => eliminarDelCarrito(item.id)} style={{ width: '20px' }}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow-sm p-4 resumen-cuenta">
                <h4 className="fw-medium mb-4 text-titulo text-center">Resumen de Compra</h4>
                <div className="d-flex  mb-3 justify-content-between text-muted p-carrito text-end">
                  <span>Subtotal</span>
                  <span>${Number(total).toFixed(2)}</span>
                </div>
                <div className="d-flex  mb-4 justify-content-between text-muted p-carrito text-end">
                  <span>Envío</span>
                  <span>${cargoEnvio.toFixed(2)}</span>
                </div>
                <hr className='resumen-cuenta' />
                <div className="d-flex justify-content-between align-items-center mb-5 p-carrito text-black">
                  <h5 className="fw-bold mb-0" >Total</h5>
                  <h4 className="fw-bold mb-0 producto-precio">
                    ${(total + cargoEnvio).toFixed(2)}
                  </h4>
                </div>
                <div className="d-grid gap-3">
                  <button onClick={irAPagar} className="btn btn-principal fw-bold">
                    Finalizar Compra
                  </button>
                  <button className="btn btn-secondary btn-sm p-carrito" onClick={() => navigate('/productos')} >
                    Seguir Comprando
                  </button>
                  <button onClick={vaciarCarrito} className="btn btn-outline-secondary btn-sm p-carrito">
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}