import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/banner.css";
import banner from "../assets/img/BannerTienda.png";

function BannerTienda() {
  return (
    <>
      <section className="bannerContainer" aria-label="Banner Kiosuko no Manga">
        <img src={banner} alt="Banner Kiosuko no Manga" className="bannerTienda" />

        <div className="bannerOverlay d-flex align-items-center justify-content-center">
          <div className="bannerTexto text-center container">
            <p className="h2-banner">Comprá el manga que te falta y te lo enviamos al toque a tu casa</p>
            <p className="banner-texto-secundario mb-3">
              Si cliqueás de lunes a viernes antes de las 12:00 p.m., te llega hoy mismo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
} export default BannerTienda;
