import { useState, useEffect } from "react";
import { useCarritoContext } from "../context/CarritoContext.jsx";
import DetalleModal from './DetalleModal.jsx';
import BannerTienda from "../components/BannerTienda.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";


export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  //Reemplazado por el apptextet
  // const [carrito, setCarrito] = useState([]);

  const { agregarAlCarrito } = useCarritoContext();

  // estado del modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);


  useEffect(() => {
    fetch("https://68e441ef8e116898997b635a.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        { console.error("Error!,", error) }
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  // const agregarAlCarrito = (producto) => {
  //   setCarrito(prev => [...prev, producto]);
  //   // alert(`Producto ${producto.name || producto.nombre} agregado al carrito`);
  //   Swal.fire({
  //     icon: 'success',
  //     title: '¡Éxito!',
  //     text: `El producto ${producto.name || producto.nombre} ha sido agregado al carrito.`})
  // }


  const abrirDetalle = (producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  }

  const cerrarDetalle = () => {
    setShowModal(false);
    setSelectedProducto(null);
  }

  // if (cargando) return <p>Cargando productos...</p>;


  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando productos...</p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  return (
    <>
      <BannerTienda />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Productos" }
        ]}
      />

      <ul id="lista-productos">
        {/* {productos.map((producto) => ( */}
        {productos.map((producto, index) => (
          // <li key={producto.id}>
          <li key={`${producto.id}-${index}`}>
            <h3 className="producto-name">{producto.name}</h3>
            <img src={producto.avatar} alt={producto.nombre} className="img-producto" />
            <p className="producto-fonts text-black">{producto.review}</p>
            <p className="producto-fonts text-black">Precio:  <strong className="producto-precio"> ${producto.precio}</strong> </p>
            <div className="producto_botones">
              <button type="button" className="btn btn-informacion" onClick={() => abrirDetalle(producto)}>+ Info</button>
              {/*comento esta linea que lleva a una pagina para el detalle de producto reemplazado por el modal*/}
              {/* <Link to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{producto}}>
                    <button className="btn btnDetalle">Más detalles</button>
                  </Link> */}
              <button type="button" className="btn btn-principal" onClick={() => agregarAlCarrito(producto)}>Agregar al <i className="fa-solid fa-cart-shopping"></i></button>
            </div>
          </li>
        ))}
      </ul>
      <DetalleModal visible={showModal} producto={selectedProducto} onClose={cerrarDetalle} />
    </>
  );
}