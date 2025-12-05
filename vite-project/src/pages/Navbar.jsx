import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logoKNM.png";
import { useAuthContext } from '../context/AuthContext';
import { useCarritoContext } from '../context/CarritoContext';

import '../assets/styles/navbar.css';

function Navbar() {
  const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();
  const { carrito } = useCarritoContext();

  const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
  const esAdmin = isAuthenticated && usuario?.nombre === "admin";

  return (
    <nav className="navbar navbar-expand-lg bg-menu shadow-sm sticky-top">
      <div className="container-fluid px-4 py-2 ">
        <NavLink to="/" className="navbar-brand p-0">
          <img src={logo} alt="Kiosuko no Manga" className="logo-navbar" />
        </NavLink>


        <button
          className="navbar-toggler border-0 ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center gap-4 mt-3 mt-lg-0 pe-4">

            {esAdmin ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-menu fw-bold fs-5 active-item"
                        : "nav-link text-menu fw-bold fs-5"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-menu fw-bold text-black">
                      Hola, {usuario.nombre.split(" ")[0]}
                    </span>
                    <button
                      onClick={cerrarSesion}
                      className="btn btn-rojo btn-sm rounded-pill px-4"
                      style={{ fontFamily: "'Permanent Marker', cursive" }}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i>
                      Salir
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/productos"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-menu fw-bold fs-5 active-item"  // ← ACTIVO
                        : "nav-link text-menu fw-bold fs-5"
                    }
                  >
                    Productos
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink
                    to="/carrito"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-menu active-item"
                        : "nav-link text-menu"
                    }
                  >
                    <i className="bi bi-cart-fill fs-3"></i>
                    {totalItems > 0 && (
                      <span className="badge-carrito">{totalItems}</span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item d-flex align-items-center gap-3">
                  {isAuthenticated ? (
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-menu fw-bold text-black">
                        Hola, {usuario.email.split(" ")[0]}
                      </span>
                      <button
                        onClick={cerrarSesion}
                        className="btn btn-rojo btn-sm rounded-pill px-4"
                        style={{ fontFamily: "'Permanent Marker', cursive" }}

                      >
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Salir
                      </button>
                    </div>
                  ) : (
                    <NavLink to="/iniciar-sesion" className="nav-link text-menu fw-bold fs-5">
                      Ingresá
                    </NavLink>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

} export default Navbar;