import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { NavLink } from "react-router-dom";
import '../assets/styles/iniciar-sesion.css'
import Swal from 'sweetalert2';
import Breadcrumb from '../components/Breadcrumb.jsx';
import logo from "../assets/img/logoKNM.png";


export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  // const { setIsAuthenticated, setUsuario } = useAppContext();

  const [formulario, setFormulario] = useState({ nombre: '', email: '', pass: '' });

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (formulario.email === "admin@knm.com.ar" && formulario.pass === "123Admin") {
      // Guarda el email ingresado y pasa nombre para el token admin
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/dashboard");
    } else //verifico que no es usuario administrador
      if (formulario.email && formulario.pass && formulario.email !== "admin@knm.com.ar") { // si el string esta vacio, lo toma como false
        localStorage.setItem("authEmail", formulario.email);
        iniciarSesion(formulario.nombre);

        // Si venía del carrito, redirige a pagar
        if (ubicacion.state?.carrito) {
          navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
        } else {
          navigate('/productos');
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: `Completa los dato obligatorios para ingresar.`
        })
      }
  };
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Mi Cuenta" }
        ]}
      />

      <div className='login-container'>
        <div className="login-card">
          <NavLink to="/" className="navbar-brand p-0">
            <img src={logo} alt="Kiosuko no Manga" className="logo-navbar" />
          </NavLink>
          <form onSubmit={manejarEnvio} noValidate>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="E-mail"
                value={formulario.email}
                onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                autoComplete="current-email"
                required
              />
              <label htmlFor="floatingInput">E-mail</label>
            </div>
            <div className="form-floating text-start">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Contraseña"
                value={formulario.pass}
                onChange={(e) => setFormulario({ ...formulario, pass: e.target.value })}
                autoComplete="current-password"
                required
              />
              <label htmlFor="floatingPassword">Contraseña</label>
              <small><strong> <a href='/restablecer-password'>¿Has olvidado la contraseña?</a></strong> </small>

            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-principal">Iniciar Sesión</button>
            </div>
            <div className="mt-2">
              <small >¿No tenés cuenta? <strong> <a href='/registrar-usuario'>Crear cuenta</a></strong></small>
            </div>
          </form>

          <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
            <strong>Credenciales de prueba para Dashboard:</strong>
            <br />
            Usuario: admin@knm.com.ar
            <br />
            Pass: 123Admin
          </p>
        </div>
      </div>
    </>
  );
}