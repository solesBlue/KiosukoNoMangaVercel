import React from "react";
import Carousel from "../components/Carrusel.jsx";
import PromocionesBancarias from "./PromocionesBancarias";
import { Link } from "react-router-dom";
import BannerTienda from "../components/BannerTienda.jsx";  

function Inicio() {
    return(
        <>
            <main className="mainInicio">   
                <BannerTienda/>
                <PromocionesBancarias />
                <Carousel />
            </main> 
            
        </>
    );
}export default Inicio;