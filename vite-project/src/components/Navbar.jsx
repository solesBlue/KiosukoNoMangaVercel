import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logoKNM.png"
import { useAppContext } from '../context/AppContext';
import "../assets/styles/navbar.css"

function Navbar() {
    const { isAuthenticated, usuario, carrito, cerrarSesion } = useAppContext();
    const totalItems = carrito.length;

    return(
        <>
            <header className="header">
                <NavLink to="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo" />
                </NavLink>
                <nav className="Navbar">
                    <ul className="nav-links">
                        <li><NavLink  to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><i className="fa-solid fa-house"></i> Inicio</NavLink ></li>
                        <li><NavLink  to="/productos" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><i className="fa-solid fa-cube"></i> Productos</NavLink ></li>
                        <li><NavLink  to="/contacto" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><i className="fa-solid fa-envelope"></i> Contacto</NavLink ></li>
                        {/* <li><NavLink  to="/carritocompras" className={({ isActive }) => isActive ? "active" : ""}><i className="fa-solid fa-cart-shopping"></i> Carrito</NavLink ></li> */}
                        {/* <li><NavLink to="/iniciar-sesion" className={({ isActive }) => isActive ? "active" : ""}><i className="fa-regular fa-circle-user"></i> Log In</NavLink> </li> */}
                        {/* <li className="user-section">
                            {isAuthenticated ? (
                                <div >
                                <span>Hola, {usuario.nombre} </span>
                                <span>Carrito: ({carrito.length})  </span>
                                <button onClick={cerrarSesion}><i className="fa-solid fa-right-from-bracket"></i> Salir</button>
                                </div>
                            ) : (
                                <NavLink to="/iniciar-sesion" className={({ isActive }) => isActive ? "active" : ""}><i className="fa-regular fa-circle-user"></i> Mi Cuenta</NavLink>
                            )}
                        </li> */}
                        <li className="user-section">
            {isAuthenticated ? (
              <div className="user-info">
                <div className="user-avatar">
                  {usuario.nombre.charAt(0).toUpperCase()}
                </div>

                <span className="user-name">
                  {usuario.nombre.split(" ")[0]}
                </span>

                <span className="cart-count">
                  <i className="fa-solid fa-cart-shopping"></i> {totalItems}
                </span>

                <button onClick={cerrarSesion} className="btn-logout">
                  <i className="fa-solid fa-right-from-bracket"></i> Salir
                </button>
              </div>
            ) : (
              <NavLink
                to="/iniciar-sesion"
                className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
              >
                <i className="fa-regular fa-circle-user"></i> Mi Cuenta
              </NavLink>
            )}
          </li>
                    </ul>
                </nav>
            </header>

        </>
    );

} export default Navbar;