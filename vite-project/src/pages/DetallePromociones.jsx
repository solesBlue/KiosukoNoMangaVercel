
import React from "react";
import { useParams, Link } from "react-router-dom";
import datosPromo from "../assets/promociones.json";
import "../assets/styles/detallePromocion.css";
import Breadcrumb from "../components/Breadcrumb";


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

  return (<>
    <Breadcrumb
      items={[
        { label: "Home", to: "/" },
        { label: "Detelle de Promociones" }
      ]}
    />
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
      <Link to="/" className="btn btn-secondary mt-3 p-secundario fw-bolder">
        ← Volver a promociones
      </Link>
    </div>
  </>

  );
}

export default DetallePromociones;