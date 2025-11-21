import { Link, useParams, useLocation } from "react-router-dom";

const ProductoDetalle = () => {
 
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;
 
if (!producto) {
    return (
      <div>
        <p>No se pudo cargar el producto</p>
        <Link to="/carrito">
          <button>Volver a Productos</button>
        </Link>
      </div>
    );
  }
 
  return(
    <>
    <h2>Detalles del Producto</h2>
    <ul  id="detalle-productos">
        <li key={producto.id}>
            <h3>{producto.name}</h3>
            <img src={producto.avatar} alt={producto.nombre} width="20%" />
            <p>{producto.review}</p>
            <p><strong>Categoria:</strong> {producto.categoria}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Precio: </strong>${producto.precio}</p>
        </li>
        <Link to={`/productos`}><button className="btn btnCancelar"> Volver</button></Link>
    </ul>
    </>
  );
}; export default ProductoDetalle;