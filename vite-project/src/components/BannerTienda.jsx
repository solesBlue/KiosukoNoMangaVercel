import React from "react";
import banner from "../assets/img/BannerTienda.png";
import "../assets/styles/banner.css"

function BannerTienda (){
    return(
        <>  
            <div className="bannerContainer">
                <img src={banner} alt="Banner" className="bannerTienda" />
                <div className="bannerTexto">
                    <h2>Elegí, pagá y recibí tu pedido sin moverte de tu casa.</h2>
                    <p>Hacé tu compra de lunes a viernes antes de las 12:00 p.m. y recibí tu pedido el mismo día.</p>
                </div>
            </div>    
        </>
    )} export default BannerTienda;