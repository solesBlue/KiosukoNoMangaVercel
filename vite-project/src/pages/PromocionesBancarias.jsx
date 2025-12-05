import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import datosPromo from "../assets/promociones.json";
// import promoBNA from "../assets/img/promoBNA.png";
// import promoCiudad from "../assets/img/promoCiudad.png";
// import promoICBC from "../assets/img/promoICBC.png";

function PromocionesBancarias() {
  const [promociones, setPromociones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const promos = datosPromo.promociones || [];
      setPromociones(promos);
      setCargando(false);
    } catch (err) {
      setError("¡Ups! No pudimos cargar las promociones en este momento. Intenta de nuevo más tarde."); setCargando(false);
    }
  }, []);

  if (cargando) {
    return (<p className="cargando">Cargando promos...</p>);
  }

  if (error) {
    return (<p className="error">{error}</p>);
  }

  return (
    <>


     <section className="promociones-bancarias py-5 bg-light">
      <div className="container">
        <h4 className="text-center mb-1 text-black  text-font">
          Promociones Bancarias
        </h4>

        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center ">
          {promociones.map((promo) => (
            <div key={promo.id} className="col">
              <div
                className="card h-100 shadow-sm border-0 hover-shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/promociones/detalle/${promo.banco}/${promo.id}`)}
                role="button"
                tabIndex={0}
                // onKeyDown={(e) => e.key === "Enter" && navigate(`/promociones/detalle/${encodeURIComponent(promo.banco)}/${promo.id}`)}
              >
                <div className="card-body text-center p-4">
                  <img
                    src={promo.avatar}
                    alt={`Promoción ${promo.banco}`}
                    className="img-fluid mb-3 "
                    style={{ maxHeight: "140px", objectFit: "contain" }}
                  />
                  <h5 className="card-title fw-bold  text-titulo">{promo.banco}</h5>
                  <p className="text-muted small mb-2">{promo.dias}</p>
                  <p className="card-text fw-medium">{promo.promocion}</p>
                </div>
                <div className="card-footer bg-white border-0 text-center">
                  <small className="color-tienda fw-bold p-secundario ">Ver detalle →</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </>
  );
}
export default PromocionesBancarias;

