import React from "react";
import "../assets/styles/footer.css";
import MPlogo from "../assets/img/mercado-pago-logo.png";

export default function Footer() {
  return (
    <footer className="pt-5 pb-4 footer-bg-color" >
      <div className="container">
        <div className="row gy-4">

          <div className="col-lg-4 col-md-6">
            <h2 className="fw-bold mb-3">
              Kiosuko no Manga
            </h2>
            <p className="small text-white p-fonts-footer">
              ¡Tu cueva otaku de confianza en Argentina! Encontrá todo el manga, las figuras que te vuelven loco, dakimakuras, merchandising y mucho más. Hacemos envíos rapidísimos y seguros a todo el país. ¡Dale, que te esperamos!
            </p>


            <div className="d-flex gap-4 mt-5">
              <a href="https://www.instagram.com" className="social-icon text-white" aria-label="Instagram" target="_blank" rel="noopener">
                <i className="bi bi-instagram fs-3"></i>
              </a>
              <a href="https://x.com/?lang=es" className="social-icon text-white" aria-label="Twitter" target="_blank" rel="noopener">
                <i className="bi bi-twitter-x fs-3"></i>
              </a>
              <a href="https://www.tiktok.com/es-419/" className="social-icon text-white" aria-label="TikTok" target="_blank" rel="noopener">
                <i className="bi bi-tiktok fs-3"></i>
              </a>
              <a href="https://discord.com/" className="social-icon text-white" aria-label="Discord" target="_blank" rel="noopener">
                <i className="bi bi-discord fs-3"></i>
              </a>
              <a href="https://www.whatsapp.com/?lang=es" className="social-icon text-white" aria-label="WhatsApp" target="_blank" rel="noopener">
                <i className="bi bi-whatsapp fs-3"></i>
              </a>
            </div>
          </div>

          {/* <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3">Info Otaku</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/novedades" className="text-white">Novedades</a></li>
              <li className="mb-2"><a href="/preventas" className="text-white">Preventas</a></li>
              <li className="mb-2"><a href="/mas-vendidos" className="text-white">Más vendidos</a></li>
              <li className="mb-2"><a href="/colecciones" className="text-white">Colecciones</a></li>
              <li className="mb-2"><a href="/ofertas" className="text-white">Promociones Bancarias</a></li>
            </ul>
          </div> */}

          <div className="col-lg-3 col-md-3 col-6">
            <h5 className="fw-bold mb-3">Nuestra Tienda</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/envios" className="text-white">Quiénes Somos</a></li>
              <li className="mb-2"><a href="/contacto" className="text-white">Contacto</a></li>
            </ul>
            <p className="text-white p-fonts-footer fs-6"><strong>Cerrito 628, CABA, Argentina</strong></p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold mb-3 text-center">Formas de pago</h5>
            <div className="d-flex flex-column gap-3 align-items-start">
              <img src={MPlogo} alt="Mercado Pago" style={{ height: "26px" }} className="img-fluid" />
              <img src="https://tienda.starware.com.ar/wp-content/uploads/2024/05/modo.png" alt="Modo" style={{ height: "24px" }} className="img-fluid" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/128px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: "20px" }} className="img-fluid" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/128px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: "20px" }} className="img-fluid" />
            </div>
          </div>

        </div>

        <hr className="border-secondary mt-5 mb-4" />
        <div className="text-center">
          <p className="mb-0 small text-white-50">
            © 2025 <strong className="text-white">Kiosuko no Manga</strong> • Todos los derechos reservados • Diseñado por Natalia Coronel
          </p>
        </div>
      </div>
    </footer>


  );
}