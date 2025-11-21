// import React from "react";

// function Footer() {
//     return(
//         <>
//         <footer className="footer">
//             <div className="footer-container">
//                 <div className="footer-row">
//                     <p><strong>Medio de Pago</strong></p> 
//                     <div className="medioPago">
//                         <i className="fa-brands fa-cc-visa" title="Visa"></i>
//                         <i className="fa-brands fa-cc-mastercard" title="Mastercard"></i>
//                         <i className="fa-solid fa-landmark" title="Transferencia"></i>
//                         <i className="fa-solid fa-money-bill-1" title="Efectivo"></i>
//                     </div>
//                 </div>
//                 <div className="footer-row">
//                     <p><strong>Contacto</strong></p>     
//                     <div className="contacto">
//                         <p><i className="fa-solid fa-envelope"></i>   kiosukonomanga@gmail.com</p>
//                         <p><i className="fa-brands fa-whatsapp"></i>  +54 11 4567-8901</p>
//                         <p><i className="fa-solid fa-location-dot"></i>  Cerrito 628, Ciudad Autónoma de Buenos Aires, República Argentina</p>
//                     </div>   
//                 </div>
//                 <div className="footer-row">
//                     <p><strong>Nuestras Redes</strong></p>
//                     <div className="redesSociales">
//                         <i className="fa-brands fa-instagram" title="Instagram"></i>
//                         <i className="fa-brands fa-facebook" title="Facebook"></i>
//                         <i className="fa-brands fa-youtube" title="Youtube"></i>
//                     </div>
//                 </div>
//             </div>
//             <p>&copy; 2025 Kiosuko No Manga. Todos los derechos reservados.</p>

//         </footer>
       
//         </>
//     );

// }export default Footer;

// src/components/Footer.jsx
import React from "react";
import "../assets/styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Medios de Pago</h3>
          <div className="icon-group">
            <i className="fab fa-cc-visa" title="Visa"></i>
            <i className="fab fa-cc-mastercard" title="Mastercard"></i>
            <i className="fas fa-landmark" title="Transferencia"></i>
            <i className="fas fa-money-bill-1" title="Efectivo"></i>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>
          <div className="contact-info">
            <p>
              <i className="fas fa-envelope"></i>
              <a href="mailto:kiosukonomanga@gmail.com">kiosukonomanga@gmail.com</a>
            </p>
            <p>
              <i className="fab fa-whatsapp"></i>
              <a href="https://wa.me/541145678901" target="_blank" rel="noopener">
                +54 11 4567-8901
              </a>
            </p>
            <p>
              <i className="fas fa-location-dot"></i>
              Cerrito 628, CABA, Argentina
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Nuestras Redes</h3>
          <div className="icon-group social">
            <a href="#" target="_blank" rel="noopener" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Kiosuko No Manga. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}