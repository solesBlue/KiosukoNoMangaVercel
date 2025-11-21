import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import datosPromo from "../assets/promociones.json";
import promoBNA from "../assets/img/promoBNA.png";
import promoCiudad from "../assets/img/promoCiudad.png";
import promoICBC from "../assets/img/promoICBC.png";

function PromocionesBancarias() {
  const [promociones, setPromociones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const imagenes = {
  "/img/promoBNA.png": promoBNA,
  "/img/promoCiudad.png": promoCiudad,
  "/img/promoICBC.png": promoICBC
};

  useEffect(() => {
    try {
      const promos = datosPromo.promociones || [];
      setPromociones(promos);
      setCargando(false);
    } catch (err) {
        setError("¡Ups! No pudimos cargar las promociones en este momento. Intenta de nuevo más tarde.");      setCargando(false);
    }
  }, []);

  if (cargando) return <p className="cargando">Cargando promociones...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="promociones-bancarias">
      <ul className="lista-promos">
        {promociones.map((promo) => (
          <li key={promo.id} className="promo-item">
            {/* <Link to="/detallepromociones" onClick={() => DetallePromociones(promo)}>
                <img src={imagenes[promo.avatar]} alt={promo.banco} />
            </Link> */}
            {/* <div onClick={() => navigate("/detallepromociones", { state: promo })} style={{ cursor: "pointer" }}>
              <img src={imagenes[promo.avatar]} alt={promo.banco} />
            </div> */}
            <div
            onClick={() => navigate(`/promociones/detalle/${promo.banco}/${promo.id}`)}
            style={{ cursor: "pointer" }}>
            <img src={imagenes[promo.avatar]} alt={promo.banco} />
          </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PromocionesBancarias;

