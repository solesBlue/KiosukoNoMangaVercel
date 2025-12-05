import React from "react";
import { useCarritoContext } from "../context/CarritoContext.jsx";

export default function DetalleModal({ visible, producto, onClose }) {
  if (!visible || !producto) return null;

  const getNombreCategoria = (codigo) => {
    const categorias = {
      '1': 'Shonen',
      '2': 'Shojo',
      '3': 'Seinen',
      '4': 'Josei',
      '5': 'Kodomo'
    };
    return categorias[codigo] || `Categoría ${codigo}`;
  };

  const { agregarAlCarrito } = useCarritoContext();


  return (
    <div className="modal fade show modal-producto" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()} >
        <div className="modal-content" >
          <div className="modal-header">
            <button
              type="button"
              className="btn-close btn-close-modal"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body" >
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-12 col-md-5 text-center mb-3">
                  <img
                    src={producto.avatar}
                    alt={producto.name}
                    className="img-fluid rounded shadow img-modal"
                  />
                </div>
                <div className="col-12 col-md-7">
                  <h4 className="modal-title producto-name text-start m-0">
                    {producto.name}
                  </h4>
                  <h5 className="text-black producto-fonts "> <strong> ${producto.precio}</strong></h5>
                  <p className="producto-fonts text-black">{producto.review}</p>
                  <p className="producto-fonts">
                    <span className="producto-item">Categoría: </span>
                    {getNombreCategoria(producto.categoria) || "Sin categoría"}
                  </p>
                  <p className="producto-fonts">
                    <span className="producto-item">Stock: </span>
                    {producto.stock} unidades
                  </p>
                  <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center">
                    <button className="btn btn-secondary fw-bolder" onClick={onClose}>
                      Volver
                    </button>
                    <button className="btn btn-principal"
                      onClick={() => {
                        agregarAlCarrito(producto);
                        onClose();
                      }}
                    >
                      Agregar al <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}