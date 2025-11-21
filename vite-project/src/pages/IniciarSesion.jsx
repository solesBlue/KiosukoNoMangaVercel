import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import '../assets/styles/iniciar-sesion.css'
import Swal from 'sweetalert2';

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();
 
// const { setIsAuthenticated, setUsuario } = useAppContext();

  const [formulario, setFormulario] = useState({ nombre: '', email: '', pass:'' });

  const manejarEnvio = (e) => {
    e.preventDefault();

    //Verifico si es el administrador
    if (formulario.nombre === "admin" && formulario.pass === "123Admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin");
      navigate("/dashboard");
    } else //verifico que no es usuario administrador
      if (formulario.nombre && formulario.pass && formulario.nombre !== "admin") { // si el string esta vacio, lo toma como false
       localStorage.setItem("authEmail", formulario.email);
       iniciarSesion(formulario.nombre);

      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate('/productos');
      }
    } else {
      // alert('Completa todos los datos');
      Swal.fire({
            icon: 'error',
            // title: '¡Éxito!',
            text: `Completa los dato obligatorios para ingresar.`})
    }
  };
  return (
    <div className='login-container'>
      <div className="login-card">
        <h1 className="login-title"> Iniciar Sesión</h1>
        <h4 className="login-subtitle">Continuá con la compra</h4>
        <form className="login-form" onSubmit={manejarEnvio} >
          <div className="input-group">
            <input 
                type="text"
                placeholder="Usuario"
                value={formulario.nombre}
                onChange={(e) => setFormulario({...formulario, nombre: e.target.value})}
                required
              />
              <input 
                type="password"
                placeholder="Contraseña"
                value={formulario.pass}
                onChange={(e) => setFormulario({...formulario, pass: e.target.value})}
                required
              />
          </div> 
          <div className="button-group">
            <button className="btn btn-primario" type="submit">Iniciar Sesión</button>
            <button className="btn btn-secondario" 
                    type="button" 
                    onClick={() => navigate('/productos')}>Cancelar
            </button>
          </div>
        </form>
              <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <strong>Credenciales de prueba para Dashboard:</strong>
        <br />
        Nombre: admin
        <br />
        Email: 1234@admin
      </p>
      </div>      
    </div>
  );
}