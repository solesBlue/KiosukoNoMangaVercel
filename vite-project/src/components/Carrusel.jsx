// import React, { useState } from "react";
// import dragon from "../assets/img/gokuVsVegeta.png";
// import onePiece from "../assets/img/onePiece.png";
// import sailorMoon from "../assets/img/sailorMoon.png";
// import naruto from "../assets/img/naruto.png";

// export default function Carousel() {
//   const images = [dragon, onePiece, sailorMoon,naruto];
//   const [index, setIndex] = useState(0);

//   const nextSlide = () => setIndex((index + 1) % images.length);
//   const prevSlide = () =>
//     setIndex((index - 1 + images.length) % images.length);

//   return (
//     <div style={{ width: "20%", margin: "0 auto", textAlign: "center" }}>
      
//       <img
//         src={images[index]}
//         alt={`Slide ${index}`}
//         style={{ width: "100%", height: "auto" , marginTop: "20px"  }}
//       />
//       {/* <button onClick={prevSlide}>{"<"}</button> */}
//       <button onClick={prevSlide}>{<i className="fa-solid fa-backward"></i>}</button>
//       <button onClick={nextSlide}>{<i className="fa-solid fa-forward"></i>}</button>  
//     </div>
//   );
// }

// src/components/Carousel.jsx
import React, { useState, useEffect, useRef } from "react";
import dragon from "../assets/img/gokuVsVegeta.png";
import onePiece from "../assets/img/onePiece.png";
import sailorMoon from "../assets/img/sailorMoon.png";
import naruto from "../assets/img/naruto.png";
import "../assets/styles/carousel.css"

const images = [
  { src: dragon, alt: "Goku vs Vegeta" },
  { src: onePiece, alt: "One Piece" },
  { src: sailorMoon, alt: "Sailor Moon" },
  { src: naruto, alt: "Naruto" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (i) => {
    setIndex(i);
  };

  // Auto-play (opcional)
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 4000); // 4 segundos
    return () => resetTimeout();
  }, [index]);

  // Navegación con teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="carousel-container">
      <div><p>Los más vendidos</p></div>
      <div className="carousel"> 
        <button className="nav-btn prev" onClick={prevSlide} aria-label="Anterior">
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((img, i) => (
            <div
              key={i}
              className="slide"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>

        <button className="nav-btn next" onClick={nextSlide} aria-label="Siguiente">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => goToSlide(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}