import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCarritoContext } from "../context/CarritoContext";
import Breadcrumb from "../components/Breadcrumb";
import Swal from 'sweetalert2';

export default function Pagar() {

  const { carrito, total, vaciarCarrito } = useCarritoContext();
  const { usuario } = useAuthContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem("authToken");

  const comprar = () => {
    Swal.fire({
      icon: 'success',
      // title: '¡Éxito!',
      text: `¡Compra realizada con éxito!`
    })
    vaciarCarrito();
    navigate("/productos");
  };

  const cargoEnvio = 5000;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Carrito", to: "/carrito" },
          { label: "Finalizar Compra" }
        ]}
      />

      <div className="py-3">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                <h4 className="fw-medium mb-3 text-titulo">
                  <i className="fa-solid fa-user me-2"></i>
                  Datos del cliente
                </h4>
                <div className=" rounded p-1">
                  <p className="mb-1">
                    <strong>{usuario?.nombre || "Cliente"}</strong>
                  </p>
                  <p className="text-muted mb-0">
                    {usuario?.email || "email@ejemplo.com"}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                <h4 className="fw-medium mb-3 text-titulo">
                  <i className="fa-solid fa-truck me-2"></i>
                  Dirección de envío
                </h4>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-medium">Domicilio:</label>
                    <input
                      type="text"
                      name="domicilio"
                      className="form-control"
                      placeholder="Calle, número, piso/depto"
                      required
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label fw-medium">Provincia:</label>
                    <input
                      type="text"
                      name="provincia"
                      className="form-control"
                      placeholder="Ingresa la provincia de entraga"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-medium">Código Postal:</label>
                    <input
                      type="text"
                      name="codigoPostal"
                      className="form-control"
                      placeholder="Ingresa el CP"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                <h4 className="fw-medium mb-3 text-titulo">
                  <i className="fa-solid fa-note-sticky me-2"></i>
                  Notas adicionales (opcional)
                </h4>
                <textarea
                  name="notas"
                  className="form-control"
                  rows="3"
                  placeholder="Ej: Tocar timbre, etc."

                ></textarea>
              </div>
              <h4 className="fw-medium mb-3 text-titulo p-3">
                <i className="fa-solid fa-cart-shopping"></i> Listado de Productos
              </h4>
              <div className="bg-prod-carrito rounded-4 shadow-sm overflow-hidden">

                {carrito.map((item) => (
                  <div key={item.id} className="d-flex align-items-center p-4 border-bottom">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="rounded-3 me-4 flex-shrink-0 img-carrito"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium text-titulo">{item.name}</h6>
                      <small className="text-muted">
                        {item.cantidad} × ${Number(item.precio).toFixed(2)} c/u
                      </small>
                    </div>
                    <strong className="producto-precio">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow-sm p-4 resumen-cuenta">
                <h4 className="fw-medium mb-4 text-titulo text-center">Resumen del Pedido</h4>
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
                  <button className="btn btn-principal fw-bold" onClick={comprar}>
                    Pagar
                  </button>
                  <button className="btn btn-secondary btn-sm p-carrito" onClick={() => navigate('/productos')} >
                    Seguir Comprando
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