import React from "react";

export default function DetalleModal({ visible, producto, onClose }) {
  if (!visible || !producto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>

        <div className="modal-content">
          <div className="detalle-productos">
            <h1>{producto.name}</h1>
            <img src={producto.avatar} alt={producto.name} />
            <p>{producto.review}</p>
            {/* <p>Precio: <strong>${producto.precio}</strong></p> */}
            <p><span className="producto-item">Categoría:</span> {producto.categoria || 'Sin categoría'}</p>
            <p><span className="producto-item">Stock:</span> {producto.stock} unidades</p>
            <p><span className="producto-item">Precio:</span>  <strong> $ {producto.precio}</strong></p>
            {/* <p>Categoría: {producto.categoria || 'Sin categoría'}</p> */}
            {/* agrega aquí más campos si los tiene el objeto producto */}
          </div>
        </div>
      </div>
    </div>
  );
}