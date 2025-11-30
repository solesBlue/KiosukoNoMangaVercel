import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from './Breadcrumb.jsx';
import Swal from 'sweetalert2';


function EliminarProducto() {

    const [producto, setProducto] = useState({
        name: '',
        avatar: '',
        review: '',
        precio: '',
        categoria: '',
        stock: '',
        id: '',
    });
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        cargarProducto();
    }, [id]);

    const cargarProducto = async () => {
        try {
            setCargando(true);
            const respuesta = await fetch(`https://68e441ef8e116898997b635a.mockapi.io/productos/${id}`);
            if (!respuesta.ok) throw new Error('Producto no encontrado');

            const productoEncontrado = await respuesta.json();
            setProducto(productoEncontrado);
        } catch (error) {
            toast.error(`Error al cargar producto`, {
                position: "top-right",
                autoClose: 2800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            navigate('/dashboard');
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">Cargando productos...</p>
            </div>
        );
    }

    const getNombreCategoria = (codigo) => {
        const categorias = {
            '1': 'Shonen',
            '2': 'Shojo',
            '3': 'Seinen',
            '4': 'Josei',
            '5': 'Kodomo'
        };
        return categorias[codigo] || `Categoría ${codigo}`;
    };

    const eliminarProducto = async () => {

        const resultado = await Swal.fire({
            title: 'Confirmar eliminación',
            text: ` ¿Esta seguro de eliminar permanentemente a  "${producto.name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-danger px-4 fw-bold ',
                cancelButton: 'btn btn-secondary px-4 me-2 fw-bold '
            },
            reverseButtons: true,
            allowOutsideClick: false,
            allowEscapeKey: false
        });
        if (!resultado.isConfirmed) return;

        try {
            setCargando(true);
            const respuesta = await
                fetch(`https://68e441ef8e116898997b635a.mockapi.io/productos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', }
                });

            // console.log({ id });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar el producto.');
            }

            await Swal.fire({
                title: '¡Eliminado correctamente!',
                icon: 'success',
                confirmButtonText: 'Volver al Dashboard',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-secondary px-4 fw-bold'
                },
                width: '500px'
            });

            navigate('/dashboard');


        } catch (error) {

            toast.error(`Hubo un problema al eliminar el producto`, {
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

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", to: "/" },
                    { label: "Dashboard", to: "/dashboard" },
                    { label: "Eliminar Producto" }
                ]}
            />
            <div className='container py-4 py-md-3'>
                <h4 id='ABM_Producto'> Eliminar Producto</h4>
                <small className="text-body-secondary">
                    Desde aquí podes eliminar productos del inventario permanentemente.
                </small>
                <div className="row mb-3 ">
                    <div className="col mt-4 d-flex align-items-center">
                        <img className="item-imagen-eliminar"
                            src={producto.avatar || '../assets/imagen-no-disponible.png'}
                            alt={producto.name} />
                    </div>
                    <div className="col p-5">
                        <p className="form-label"><strong>ID: </strong>{producto.id} </p>
                        <p className="form-label"><strong>Nombre: </strong>{producto.name}</p>
                        <p className="form-label"><strong>Categoría: </strong>{getNombreCategoria(producto.categoria)}</p>
                        <p className="form-label"><strong>Descripción: </strong></p>
                        <p className="form-label">{producto.review}</p>
                    </div>
                </div>
                <div className="d-grid d-md-flex gap-3 justify-content-md-end">
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg px-4 fw-bold"
                        onClick={() => navigate('/dashboard')}
                        disabled={cargando}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger btn-lg px-4 fw-bold"
                        disabled={cargando}
                        onClick={eliminarProducto}
                    >Eliminar
                    </button>
                </div>
            </div>
        </>
    );
} export default EliminarProducto;