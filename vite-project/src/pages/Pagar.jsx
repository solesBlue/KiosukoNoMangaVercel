import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCarritoContext } from "../context/CarritoContext";
import Swal from 'sweetalert2';

export default function Pagar() {

  const { carrito, total, vaciarCarrito } = useCarritoContext();
  const { usuario, cerrarSesion } = useAuthContext();
  // const location = useLocation();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem("authToken");

  // Función para finalizar compra
  const comprar = () => {
    // alert("¡Compra realizada con éxito!");
        Swal.fire({
            icon: 'success',
            // title: '¡Éxito!',
            text: `¡Compra realizada con éxito!`})
    navigate("/productos");
  };

    return (
    <div>
      {/* Info del usuario */}
      <div>
        <h2>Hola {usuario.nombre}</h2>
        <p>Email: {usuario.email}</p>
       
        {/* Estilo para el Token */}
        <div style={{
          background: '#f0f0f0',
          padding: '8px',
          borderRadius: '4px',
          margin: '10px 0',
          fontSize: '12px',
          wordBreak: 'break-all'
        }}>
          <strong>Token:</strong> {tokenActual}
        </div>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <hr />
      </div>

      {/* Carrito */}
      <div>
        <h2>Tu compra:</h2>

        {carrito.length > 0 ? (
          <>
            {carrito.map((producto) => {
              const cantidad = Number(producto.cantidad || 1);
              const precioUnitario = Number(producto.precio || 0);
              const subtotal = cantidad * precioUnitario;
              return (
                <div key={producto.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={producto.avatar} alt={producto.nombre} width="60" />
                  <div>
                    <div>{producto.nombre}</div>
                    <div>Precio unidad: ${Number(precioUnitario).toFixed(3)}</div>
                    <div>Cantidad: {cantidad}</div>
                    <div><strong>Subtotal: ${Number(subtotal).toFixed(3)}</strong></div>
                  </div>
                </div>
              );
            })}
            <h3>Total a pagar: ${Number(total).toFixed(3)}</h3>
          </>

        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </div>
      
      <div>
        {carrito.length > 0 && (
          <button onClick={comprar}>Confirmar y Pagar</button>
        )}
        <button onClick={() => navigate("/productos")}>
          {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
        </button>
      </div>
    </div>
  );


  // return (
  //   <div>
  //     <div>
  //       <h2>Tu compra:</h2>
  //       {carrito.map((producto) => (
  //         <div key={producto.id}>
  //           <img src={producto.avatar} alt={producto.nombre} width="60" />
  //           <span>{producto.nombre}</span>
  //           <strong>${producto.precio}</strong>
  //         </div>
  //       ))}

  //       <h3>Total a pagar: ${total}</h3>
  //     </div>

  //     <div>
  //       <button onClick={comprar}>Confirmar y Pagar</button>
  //       <button onClick={() => navigate("/productos")}>Cancelar</button>
  //     </div>
  //   </div>
  // );
}