import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../assets/styles/iniciar-sesion.css'

export default function IniciarSesion() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
 
const { setIsAuthenticated, setUsuario } = useAppContext();

  const [formulario, setFormulario] = useState({ nombre: '', email: '', pass:'' });

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.nombre && formulario.pass) { // si el string esta vacio, lo toma como false
      //esto me guarda el usuario y autentica
      setIsAuthenticated(true);
      setUsuario(formulario);
     
      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate('/productos');
      }
    } else {
      alert('Completa todos los datos');
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
      </div>      
    </div>
  );
}