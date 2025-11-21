// import React from "react";
// import { useLocation, Link } from "react-router-dom";

// function DetallePromociones() {
//   const { state } = useLocation(); 

//   if (!state) {
//     return (
//       <div className="error-card">
//         <h2>Error</h2>
//         <p>No se encontraron detalles de la promoción.</p>
//         <Link to="/" className="btn btn-volver">Volver</Link>
//       </div>
//     );
//   }

//   const { banco, dias, promocion, tipoTarjeta, legales, finPromo } = state;

//   return (
//     <section className="detalle-container">
//         <div className="promo-card">
//             <div className="card-header">
//                 <h2>Promociones</h2>
//             </div>
//             <div className="card-body">
//                 <h2 className="card-title">{banco}</h2>
//                 <p className="card-dias">{dias}</p>
//                 <p className="card-oferta">{promocion}</p>
//                 <p className="card-tarjeta">{tipoTarjeta}</p>
//                 <p className="card-legales">{legales}</p>
//                 <p className="card-validez">
//                     Válida hasta: <strong>{new Date(finPromo).toLocaleDateString("es-AR")}</strong>
//                 </p>
//             </div>
//       </div>
//       <Link to="/" className="btn btn-volver">
//         ← Volver a Inicio
//       </Link>
//     </section>
//   );
// }

// export default DetallePromociones;


import React from "react";
import { useParams, Link } from "react-router-dom";
import datosPromo from "../assets/promociones.json"; 
import "../assets/styles/detallePromocion.css";

function DetallePromociones() {
  const { id } = useParams(); 
  const promo = datosPromo.promociones.find(p => p.id === parseInt(id));

  if (!promo) {
    return (
      <div className="error-card">
        <h2>Promoción no encontrada</h2>
        <Link to="/promociones" className="btn btn-volver">
          ← Volver
        </Link>
      </div>
    );
  }

  const {
    banco,
    dias,
    promocion,
    tipoTarjeta,
    legales,
    finPromo,
    avatar
  } = promo;

  return (
    <div className="detalle-container">
       <div className="promo-card">
            <div className="card-header">
                <h2>Promociones</h2>
            </div>
            <div className="card-body">
                <h2 className="card-title">{banco}</h2>
                <p className="card-dias">{dias}</p>
                <p className="card-oferta">{promocion}</p>
                <p className="card-tarjeta">{tipoTarjeta}</p>
                <p className="card-legales">{legales}</p>
                <p className="card-validez">
                    Válida hasta: <strong>{new Date(finPromo).toLocaleDateString("es-AR")}</strong>
                </p>
            </div>
      </div>
      <Link to="/" className="btn btn-volver">
        ← Volver a promociones
      </Link>
    </div>
  );
}

export default DetallePromociones;