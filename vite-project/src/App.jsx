import './App.css'
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from './pages/Navbar.jsx'
import Inicio from './pages/Inicio'
import Footer from './pages/Footer.jsx'
import Contacto from './pages/Contacto.jsx'
import Productos from './pages/Productos.jsx';
import DetallePromociones from "./pages/DetallePromociones"; import notFoundImage from './assets/img/Error404.png'
import CarritoCompras from './pages/Carrito.jsx'
import Error404 from './components/Error404.jsx'
import PromocionesBancarias from "./pages/PromocionesBancarias";
import Pagar from "./pages/Pagar.jsx"
import RutasProtegidas from "./pages/RutaProtegida.jsx"
import IniciarSesion from './pages/IniciarSesion.jsx'
import Dashboard from "./pages/Dashboard.jsx";
import GestionarProducto from './components/GestionarProducto.jsx';
import EliminarProducto from './components/EliminarProducto.jsx';
import RegistrarUsuario from './pages/RegistrarUsuario.jsx'
import RestablecerPassword from './pages/RestablecerPassword.jsx'
import QuienesSomos from  './pages/QuienesSomos.jsx'

function App() {

  //propierties
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [usuario,setUsuario] = useState({nombre:"", email:""});

  return (
    <AuthProvider>
      <CarritoProvider>

        <Navbar />

        <ToastContainer
          position="top-right"
          autoClose={2800}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          toastStyle={{ borderRadius: "14px" }}
          toastClassName="rounded-3 shadow-lg border-0"
        />

        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/productos/:id' element={<Productos />} />
          <Route path='/productos/:categoria/:id' element={<Productos />} />
          <Route path='/quienes-somos' element={<QuienesSomos />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path="/carrito" element={<CarritoCompras />} />
          <Route path='/iniciar-sesion' element={<IniciarSesion />} />
          <Route path='/registrar-usuario' element={<RegistrarUsuario />} />
          <Route path='/restablecer-password' element={<RestablecerPassword />} />

          <Route path="/pagar" element={<RutasProtegidas> <Pagar /></RutasProtegidas>} />
          <Route path="/dashboard" element={<RutasProtegidas soloAdmin={true}><Dashboard /></RutasProtegidas>} />

          {/* RUTA PROTEGIDA - Admin */}
          <Route path="/gestionar-producto/agregar-producto" element={<RutasProtegidas soloAdmin={true}><GestionarProducto /></RutasProtegidas>} />
          <Route path="/gestionar-producto/editar-producto/:id" element={<RutasProtegidas soloAdmin={true}><GestionarProducto /></RutasProtegidas>} />
          <Route path="/gestionar-producto/eliminar-producto/:id" element={<RutasProtegidas soloAdmin={true}><EliminarProducto /></RutasProtegidas>} />
          {/* Deja de ir  las propities en el componente, se reemplaza por el AppContext */}

          <Route path="/promociones" element={<PromocionesBancarias />} />
          <Route path="/promociones/detalle/:banco/:id" element={<DetallePromociones />} />
          <Route path="/" element={<PromocionesBancarias />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
        <Footer />

      </CarritoProvider>
    </AuthProvider>
  )
}
export default App



// function FormularioContacto() {

//   const [formulario, setFormulario] = useState({
//     nombre: '',
//     correo: '',
//     celular: ''
//   });

//   const manejarCambio = (evento) => {
//     setFormulario({
//       ...formulario, 
//       [evento.target.name]: evento.target.value, 
//     });
//   };

//   const manejarEnvio = (evento) => {
//     evento.preventDefault();
//     console.log('Datos enviados:', formulario);

//     setFormulario({
//       nombre: '',
//       correo: '',
//       celular: ''
//     });
//   }

//   return (
//     <>
//       <form onSubmit={manejarEnvio} className='formularioContacto'>
//         <div className='form-grupo'>
//           <label>Apellido y Nombre:</label>
//           <input
//             type="text"
//             name="nombre"
//             value={formulario.nombre}
//             onChange={manejarCambio}
//             placeholder='Ingrese su Apellido y Nombre'
//           />
//         </div>
//         <div className='form-grupo'>
//           <label>Correo:</label>
//           <input
//             type="email"
//             name="correo"
//             value={formulario.correo}
//             onChange={manejarCambio}
//             placeholder='Ingrese su correo'
//           />
//         </div>
//         <div className='form-grupo'>
//           <label>Teléfono Celular:</label>
//           <input
//             type="text"
//             name="celular"
//             value={formulario.celular}
//             onChange={manejarCambio}
//             placeholder='Ingrese su teléfono celular'
//           />
//         </div>
//         <hr />
//         <div className='form-grupo-botones'>
//           <button type="submit" className='btn btnEnviar'>Enviar</button>
//           <button type="button" onClick={() => setFormulario({ nombre: '', correo: '', celular: '' })} className='btn btnCancelar'>Limpiar</button>
//         </div>
//       </form>

//     </>
//   );
// } export { FormularioContacto };


