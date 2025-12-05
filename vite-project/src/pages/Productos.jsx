import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  //seo
  useEffect(() => {
    document.title = "Kiosuko no Mangas | Tienda de mangas";

    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag('description', 'Encontra los mejores mangas en Argentina directo desde Japón.');
    updateMetaTag('keywords', 'mangas, japon, anime, japon');
    updateMetaTag('author', '@KiosukoNoManga');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Kiosuko No Manga', 'property');
    updateMetaTag('og:description', 'Encontra los mejores mangas en Argentina directo desde Japón.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://kiosukonomanga/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);

  //Filtro y Paginacion
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  // const productosFiltrados = productos.filter(
  //   (producto) =>
  //     producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  //     (producto.categoria &&
  //       producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  // );

  const productosFiltrados = productos.filter(
    (producto) => {
      // Usamos ?? '' para asegurar que si la propiedad es null/undefined,
      // usamos una cadena vacía en su lugar, lo que permite llamar a .toLowerCase() de forma segura.
      const nombreValido = producto.name ?? '';
      const categoriaValida = producto.categoria ?? '';

      return (
        nombreValido.toLowerCase().includes(busqueda.toLowerCase()) ||
        categoriaValida.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };


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
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Productos" }
        ]}
      />

      <BannerTienda />

      <div className="container my-4">

        <div className="row mb-4">
          <div className="col-12 col-md-6">
 

            <div className="input-group">
              <input
                type="text"
                placeholder="Buscar por nombre o categoría..."
                className="form-control"
                value={busqueda}
                onChange={manejarBusqueda}
              />
              <span className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>

            {busqueda && (
              <small className="text-muted p-secundario">
                Mostrando {productosFiltrados.length} de {productos.length} productos
              </small>
            )}
          </div>
        </div>


        <div className="row justify-content-center g-4">
          {productosActuales.map((producto, index) => (
            <div
              key={`${producto.id}-${index}`}
              className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
            >
              <div className="card shadow-sm d-flex flex-column h-80 card-producto">
                <div className="text-center p-2">
                  <img
                    src={producto.avatar}
                    className="img-fluid img-producto"
                    alt={producto.name}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title producto-name">{producto.name}</h5>
                  <p className="card-text producto-fonts">{producto.review}</p>
                  <p className="producto-fonts">Precio: <strong className="producto-precio">${producto.precio}</strong></p>

                  <div className="mt-auto d-flex flex-column gap-2 pt-3">
                    <button className="btn btn-detalle" onClick={() => abrirDetalle(producto)}>
                      Detalle del producto
                    </button>
                    <button className="btn btn-principal" onClick={() => agregarAlCarrito(producto)} >
                      Agregar al <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          ))}

          {/* Paginador - Estilo simplificado */}
          {productosFiltrados.length > productosPorPagina && (
            <div className="d-flex justify-content-center my-4 p-secundario">
              {Array.from({ length: totalPaginas }, (_, index) => (
                <button
                  key={index + 1}
                  className={`btn mx-1 ${paginaActual === index + 1 ? "btn-principal" : "btn-outline-danger"}`}
                  onClick={() => cambiarPagina(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}

          {/* Información de la página actual */}
          {productosFiltrados.length > 0 && (
            <div className="text-center text-muted mt-2 p-secundario">
              <small>
                Mostrando {productosActuales.length} productos
                (página {paginaActual} de {totalPaginas})
              </small>
            </div>
          )}

        </div>
      </div>

      <DetalleModal
        visible={showModal}
        producto={selectedProducto}
        onClose={cerrarDetalle}
        agregarAlCarrito={agregarAlCarrito}
      />

    </>
  );
}