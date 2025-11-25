import React from "react";
import dragon from "../assets/img/gokuVsVegeta.png";
import onePiece from "../assets/img/onePiece.png";
import sailorMoon from "../assets/img/sailorMoon.png";
import naruto from "../assets/img/naruto.png";

import "../assets/styles/carousel.css";

export default function Carrusel() {
  const images = [
    { src: dragon, alt: "Goku vs Vegeta - Dragon Ball Z" },
    { src: onePiece, alt: "One Piece - Los Mugiwara" },
    { src: sailorMoon, alt: "Sailor Moon - Edición Especial" },
    { src: naruto, alt: "Naruto Shippuden - Colección Completa" },
  ];

  return (
    <div className="container-fluid px-0 my-4">
      <h4 className="text-center mb-1 text-black text-carrusel" >
        Los más vendidos
      </h4>

      <div id="carruselDestacados" className="carousel slide shadow-lg" data-bs-ride="carousel">
        
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carruselDestacados"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner rounded-3 overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="4000"
            >
              <img
                src={img.src}
                className="d-block w-100"
                alt={img.alt}
                style={{ 
                  height: "200px", 
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                <h5 className="fw-bold text-warning">{img.alt}</h5>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carruselDestacados"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carruselDestacados"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
  );
}