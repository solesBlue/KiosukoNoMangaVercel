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

  // const imagenes = {
  //   "../img/promoBNA.png": promoBNA,
  //   "../img/promoCiudad.png": promoCiudad,
  //   "../img/promoICBC.png": promoICBC
  // };

  const imagenes = {
    "BNA": promoBNA,      // Asume que promo.banco en el JSON es "BNA"
    "Ciudad": promoCiudad, // Asume que promo.banco en el JSON es "Ciudad"
    "ICBC": promoICBC     // Asume que promo.banco en el JSON es "ICBC"
  };


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
    return (<p className="cargando">Cargando promociones...</p>);
  }

  if (error) {
    return (<p className="error">{error}</p>);
  }

  return ( <>
    <section className="promociones-bancarias">
      <h4 className="text-center mb-4 fw-bold text-promo">Promociones Bancarias</h4>
      <ul className="lista-promos">
        {promociones.map((promo) => (
          <li key={promo.id} className="promo-item">
            <div
              onClick={() => navigate(`/promociones/detalle/${promo.banco}/${promo.id}`)}
              style={{ cursor: "pointer" }}>
              <img src={imagenes[promo.avatar]} alt={promo.banco} />
            </div>
          </li>
        ))}
      </ul>
    </section>

   </>
  );
}
export default PromocionesBancarias;

