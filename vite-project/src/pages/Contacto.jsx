import React from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { toast } from "react-toastify";

export default function Contacto() {


  const enviarMensaje = (e) => {
    e.preventDefault(); // evita que recargue la página

    toast.success(` ¡Mensaje enviado con éxito! Te responderemos a tu email.`, {
      position: "top-right",
      autoClose: 2800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <i className="fa-solid fa-cart-plus text-success fs-4"></i>,
    });

    e.target.reset();
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Contacto" }
        ]}
      />

      <div className="container py-3 ">
        <div className="row justify-content-center ">
          <div className="col-lg-8">

            <div className="text-center mb-5">
              <h1 className="text-titulo fw-bold">Formulario de Contacto</h1>
              <p className="text-muted p-carrito">Escribinos y te respondemos en el día</p>
            </div>

            <div className="bg-danger-subtle rounded-4 shadow-sm p-4 p-md-5">
              <form onSubmit={enviarMensaje}>
                <div className="mb-4">
                  <label className="form-label fw-medium">Apellido y Nombre:</label>
                  <input type="text" className="form-control" placeholder="Juan Pérez" required />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Email:</label>
                  <input type="email" className="form-control" placeholder="juan@knm.com"  required/>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Asunto:</label>
                  <input type="text" className="form-control" placeholder="Quiero hacer una consulta" required />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Mensaje</label>
                  <textarea  className="form-control" rows="3" placeholder="Hola, quería preguntar por..."required ></textarea>
                </div>

                <div className="text-center">
                  <button  type="submit" className="btn btn-principal fw-bold " >
                    Enviar mensaje
                  </button>
                </div>

              </form>
            </div>

            <div className="text-center mt-5">
              <p className="text-muted mb-2 p-secundario">También podés escribirnos por WhatsApp: </p>
              <p className="text-success p-secundario">+54 9 11 1234-5678 </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}