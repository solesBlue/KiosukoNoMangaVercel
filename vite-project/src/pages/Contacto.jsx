import React from "react";
import {FormularioContacto} from "../App";

function Contacto() {
    return(
        <>
            <h2>Contacto</h2>
            <p style={{ fontFamily: "Montserrat, sans-serif", marginLeft: 15 }}>Podes escribirnos a nuestro mail: <strong>kiosukonomanga@gmail.com</strong> </p>  
            <FormularioContacto/>
        </>
    );
}export default Contacto;