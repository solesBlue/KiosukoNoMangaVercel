import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb.jsx';
import { toast } from 'react-toastify';


function GestionarProducto() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [modo, setModo] = useState('agregar');

  // Estados iniciales
  const [producto, setProducto] = useState({
    name: '',
    avatar: '',
    review: '',
    precio: '',
    categoria: '',
    stock: '',
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (id && id !== 'nuevo-producto') {
      cargarProducto();
    } else {
      setModo('agregar');
    }
  }, [id]);

  const cargarProducto = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(`https://68e441ef8e116898997b635a.mockapi.io/productos/${id}`);
      if (!respuesta.ok) throw new Error('Producto no encontrado');

      const productoEncontrado = await respuesta.json();
      setProducto(productoEncontrado);
      setModo('editar');
    } catch (error) {
      toast.error(`Error al cargar producto`, {
        position: "top-right",
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/dashboard');
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setProducto({
      name: '',
      precio: '',
      review: '',
      categoria: '',
      avatar: '',
      stock: ''
    });
    setErrores({});
  };

  // Validaciones de campos del formulario
  const validarProducto = (name, value) => {
    let errorMsg = '';
    if (name === 'name') {
      if (value.length > 0 && value.length < 3) {
        errorMsg = 'El nombre debe tener al menos 3 caracteres.';
      } else if (value.length > 100) {
        errorMsg = 'El nombre no puede exceder los 100 caracteres.';
      }
    }

    if (name === 'review') {
      if (value.length > 0 && value.length < 3) {
        errorMsg = 'La reseña debe tener al menos 3 caracteres.';
      } else if (value.length > 200) {
        errorMsg = 'La reseña no puede exceder los 200 caracteres.';
      }
    }

    if (name === 'precio') {
      const numValue = parseFloat(value);
      if (value !== '' && numValue < 1) {
        errorMsg = 'El precio debe ser un número positivo (mínimo $1).';
      } else if (value !== '' && numValue > 999999) {
        errorMsg = 'El precio es demasiado alto (máximo $999.999).';
      }
    }

    if (name === 'stock') {
      const numValue = parseInt(value, 10);
      if (value !== '' && numValue < 1) {
        errorMsg = 'El stock inicial debe ser al menos 1 unidad.';
      } else if (value !== '' && numValue > 99999) {
        errorMsg = 'El stock máximo permitido es 99.999. unidades';
      }
    }
    return errorMsg;
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setProducto({ ...producto, [name]: value });

    const errorMsg = validarProducto(name, value);
    setErrores({
      ...errores,
      [name]: errorMsg,
    });
  };

  //obtengo el nuevo ID para el producto basandome en la cantidad actual de productos
  const obtenerNuevoId = async () => {
    try {
      const respuesta = await fetch("https://68e441ef8e116898997b635a.mockapi.io/productos");
      if (!respuesta.ok) throw new Error('Error al obtener la lista de productos.');

      const productosActuales = await respuesta.json();
      return productosActuales.length + 1; // Nuevo ID basado en la cantidad actual de productos      

    } catch (error) {
      toast.error(` Error al obtener el ID del nuevo producto.`, {
        position: "top-right",
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      throw error;
    }
  };

  const agregarProducto = async (producto) => {
    try {
      const productoEnviar = {
        ...producto,
      };

      const respuesta = await fetch("https://68e441ef8e116898997b635a.mockapi.io/productos", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEnviar),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto.');

      const data = await respuesta.json();
      toast.success(`Se agrego el producto con ID: ${data.id}`, {
        position: "top-right",
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return data;

    } catch (error) {
      toast.error(` No se puedo agregar el producto.`, {
        position: "top-right",
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      throw error;
    }
  };

  const actualizarProducto = async () => {
    try {
      setCargando(true);
      const productoEnviar = {
        ...producto,
        precio: parseFloat(producto.precio)
      };

      const respuesta = await fetch(`https://68e441ef8e116898997b635a.mockapi.io/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEnviar)
      });

      if (!respuesta.ok) throw new Error('Error al actualizar');

      toast.success('Producto actualizado correctamente');
      navigate('/dashboard');
    } catch (error) {
      toast.error(` Error al actualizar producto.`, {
        position: "top-right",
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } finally {
      setCargando(false);
    }
  };

  const validarFormulario = () => {
    const errorDeCarga = {};
    let esValido = true;

    const camposRequeridos = ['name', 'review', 'precio', 'categoria', 'avatar', 'stock'];
    camposRequeridos.forEach(field => {
      if (!producto[field] || producto[field].toString().trim() === '') {
        // errorDeCarga[field] = 'Este campo es obligatorio.';
        esValido = false;
      }
    });
    for (const name in producto) {
      const errorMsg = validarProducto(name, producto[name]);
      if (errorMsg) {
        errorDeCarga[name] = errorMsg;
        esValido = false;
      }
    }

    setErrores(errorDeCarga);
    return esValido;
  };


  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toast.error(` Verifique los campos obligatorio`, {
        position: "top-right",
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    setCargando(true);
    try {
      if (modo === 'agregar') {
        const nuevoId = await obtenerNuevoId();
        const productoEnviar = { ...producto, id: String(nuevoId), precio: parseFloat(producto.precio) };
        await agregarProducto(productoEnviar);
        limpiarFormulario();
      } else if (modo === 'editar') {
        await actualizarProducto();
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard" },
          { label: modo === 'agregar' ? "Agregar Producto" : "Editar Producto" }
        ]}
      />
      <div className='container py-4 py-md-5'>
        <h4 id='ABM_Producto'>
          {modo === 'agregar' ? 'Agregar ' : 'Editar '} Producto
        </h4>
        <small className="text-body-secondary">
          {modo === 'agregar'
            ? 'Complete los campos para añadir un nuevo artículo al catálogo de la tienda.'
            : 'Edite los campos del producto seleccionado.'
          }
        </small>

        <form className="was-validated mt-3 me-5 p-30"
          onSubmit={manejarEnvio}
          noValidate>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="validationInputNombre" className="form-label fw-bold">Nombre:</label>
              <input type="text"
                name="name"
                className={`form-control ${errores.name ? 'is-invalid' : ''}`}
                value={producto.name}
                onChange={manejarCambio}
                id="validationInputNombre"
                placeholder="Nombre del producto"
                disabled={cargando}
                minLength={3}
                maxLength={100}
                required></input>
              <div className="invalid-feedback">
                {errores.name || 'Ingrese el nombre del producto.'}
              </div>
            </div>
            <div className="col">
              <label htmlFor="validationSelectcCategoria" className="form-label fw-bold">Categoría:</label>
              <select name="categoria"
                className="form-select"
                value={producto.categoria}
                onChange={(e) => setProducto({ ...producto, categoria: e.target.value })}
                disabled={cargando}
                required
                aria-label="Seleccione una opción:"
                id="validationSelectcCategoria">
                <option value="">Selecciones una categoría:</option>
                <option value="1">Shonen</option>
                <option value="2">Shojo</option>
                <option value="3">Seinen</option>
                <option value="4">Josei</option>
                <option value="5">Kodomo</option>
              </select>
              <div className="invalid-feedback">Seleccione una categoria</div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationTextarea" className="form-label fw-bold">Reseña:</label>
            <textarea name="review"
              className={`form-control ${errores.review ? 'is-invalid' : ''}`}
              value={producto.review}
              onChange={manejarCambio}
              disabled={cargando}
              rows="2"
              maxLength={200}
              minLength={3}
              placeholder="Reseña del producto"
              id="validationTextarea"
              required></textarea>
            <div className="invalid-feedback">
              {errores.review || 'Ingrese el reseña del producto.'}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="validationInputImagen" className="form-label fw-bold">Imagen:</label>
            <input type="url"
              name="avatar"
              className={`form-control ${errores.avatar ? 'is-invalid' : ''}`}
              value={producto.avatar}
              onChange={manejarCambio}
              disabled={cargando}
              id="validationInputImagen"
              placeholder="Imagen del producto"
              required></input>
            <div className="invalid-feedback">
              {errores.avatar || 'Ingrese el link de la imagen del producto.'}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="validationInputPrecio" className="form-label fw-bold">Precio por Unidad:</label>
              <input type="number"
                name="precio"
                className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                value={producto.precio}
                onChange={manejarCambio}
                disabled={cargando}
                id="validationInputPrecio"
                placeholder="Precio del producto por unidad"
                min={1}
                max={999999}
                step="0.01"
                required></input>
              <div className="invalid-feedback">
                {errores.precio || 'Ingrese el precio por unidad.'}
              </div>
            </div>
            <div className="col">
              <label htmlFor="validationInputStock" className="form-label fw-bold">Stock Inicial:</label>
              <input type="number"
                name="stock"
                className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                value={producto.stock}
                onChange={manejarCambio}
                disabled={cargando}
                id="validationInputStock"
                placeholder="Stock del producto"
                // min={1}
                // max={99999}
                required></input>
              <div className="invalid-feedback">
                {errores.stock || 'Ingrese el stock del producto.'}
              </div>
            </div>
          </div>

          <div className="d-grid d-md-flex gap-3 justify-content-md-end">

            <button
              type="button"
              className="btn btn-secondary btn-lg px-4 fw-bold"
              onClick={() => navigate('/dashboard')}
              disabled={cargando}
            > Cancelar
            </button>
            {modo === 'agregar' && (
              <button
                type="button"
                className="btn btn-secondary btn-lg px-4 fw-bold"
                onClick={limpiarFormulario}
                disabled={cargando}
              >Limpiar
              </button>
            )}


            <button type="submit" className="btn btn-success btn-lg px-4 fw-bold" disabled={cargando}>
              {cargando ? `${modo === 'editar' ? 'Actualizando...' : 'Agregando...'}` :
                `${modo === 'agregar' ? 'Agregar' : 'Actualizar'}`}
            </button>
          </div>

        </form >
      </div >

    </>

  );
} export default GestionarProducto;