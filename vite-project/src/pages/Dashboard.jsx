import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();

  const navigate = useNavigate();

  // Obtener el token actual
  const tokenActual = localStorage.getItem('authToken');

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

  useEffect(() => {
    fetch("https://68e441ef8e116898997b635a.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        { console.error("Error!,", error) }
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }
  if (error) return <p>{error}</p>;


  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard" }
        ]}
      />

      <div style={{ padding: '20px', minHeight: '60vh' }}>
        {/* <h1>Dashboard Administrativo</h1> */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          {/* <p><strong>Sesión iniciada como: </strong> {usuario.nombre}</p> */}


          {/* SECCIÓN DEL TOKEN */}
          <div style={{
            background: '#e9ecef',
            padding: '10px',
            borderRadius: '4px',
            margin: '10px 0',
            fontSize: '14px',
          }}>
            <strong>Token de autenticación:</strong>
            <br />
            <code>{tokenActual}</code>
          </div>


          {/* SECCIÓN DE ACCIONES ADMIN */}
          <div>
            <h3>Acciones:</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              <Link
                to="/gestionar-producto/agregar-producto"
                className='btn btn-primary fw-bold'
              >
                Nuevo Producto
              </Link>

              <Link
                to="/productos"
                className='btn btn-primary fw-bold'
              >
                Todos los Productos
              </Link>
            </div>
          </div>
          <hr className="border border-2 opacity-75"></hr>

          <div className="container mt-5">
            <h4 className="mb-1">Lista de Productos</h4>

            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm align-middle"></table>
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th className="text-center">Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>
                        <img
                          src={producto.avatar}
                          alt={producto.title}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td className='fw-bold'>{producto.name}</td>
                      <td>${producto.precio}.-</td>
                      <td className="text-center">
                        {producto.stock != null && (
                          <>
                            {producto.stock < 200 && <span className="badge bg-danger">Bajo stock</span>}
                            <small className="d-block text-muted mt-1">
                              ({producto.stock} unds.)
                            </small>
                          </>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className="btn btn-primary"
                            title="Gestionar"
                            // onClick={() => alert(`Editar ${producto.id}`)}
                            onClick={() => navigate(`/gestionar-producto/editar-producto/${producto.id}`)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            title="Eliminar"
                            // onClick={() => manejarEliminar(producto.id)}
                            onClick={() => navigate(`/gestionar-producto/eliminar-producto/${producto.id}`)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}