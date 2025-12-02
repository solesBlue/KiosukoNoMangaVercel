import React, { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RegistrarUsuario() {

    const navigate = useNavigate();
    const [errores, setErrores] = useState({});

    const [usuario, setUsuario] = useState({
        nombre: '',
        apellido: '',
        domicilio: '',
        provincia: '',
        email: '',
        telefono: '',
        pass: '',
        passConfir: '',
    });

    const limpiarFormulario = () => {
        setUsuario({
            nombre: '',
            apellido: '',
            domicilio: '',
            provincia: '',
            email: '',
            telefono: '',
            pass: '',
            passConfir: '',
        });
        setErrores({});
    };

    const validarCampos = (name, value) => {
        let errorMsg = '';

        if (name === 'nombre' || name === 'apellido' || name === 'domicilio') {
            if (value.trim().length > 0 && value.trim().length < 3) {
                errorMsg = 'Debe tener al menos 3 caracteres';
            } else if (value.length > 100) {
                errorMsg = 'El campo no puede exceder los 100 caracteres.';
            }
        }

        if (name === 'provincia') {
            if (value.trim().length > 0 && value.trim().length < 3) {
                errorMsg = 'La provincia debe tener al menos 10 caracteres.';
            } else if (value.length > 50) {
                errorMsg = 'La provincia no puede exceder los 50 caracteres.';
            }
        }

        if (name === 'email') {
            if (value && !/^\S+@\S+\.\S+$/.test(value)) {
                errorMsg = 'Email inválido';
            }
        }

        if (name === 'telefono') {
            const soloNumeros = value.replace(/\D/g, '');
            if (soloNumeros.length > 0 && soloNumeros.length !== 13) {
                errorMsg = 'El teléfono debe tener 13 dígitos';
            }
        }

        if (name === 'pass') {
            if (value.length > 0 && value.length !== 8) {
                errorMsg = 'La contraseña debe tener 8 caracteres';
            }
        }

        if (name === 'passConfir') {
            if (value.length > 0 && value !== usuario.pass) {
                errorMsg = 'Las contraseñas no coinciden';
            }
        }

        return errorMsg;
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;

        if (!name) return;
        setUsuario({ ...usuario, [name]: value });

        const errorMsg = validarCampos(name, value);
        setErrores({
            ...errores,
            [name]: errorMsg,
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const nuevosErrores = {};
        let todoOk = true;

        Object.keys(usuario).forEach(campo => {
            const valor = usuario[campo].toString().trim();

            if (!valor) {
                nuevosErrores[campo] = 'Este campo es obligatorio';
                todoOk = false;
            } else {
                const error = validarCampos(campo, usuario[campo]);
                if (error) {
                    nuevosErrores[campo] = error;
                    todoOk = false;
                }
            }
        });

        setErrores(nuevosErrores);

        if (!todoOk) {
            toast.error(`Por favor completa todos los campos correctamente`, {
                position: "top-right",
                autoClose: 2800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        toast.success(`¡Registro exitoso! Bienvenido ' ${usuario.nombre} (Solo front. Falta back)`, {
            position: "top-right",
            autoClose: 2800,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        limpiarFormulario();
        navigate('/iniciar-sesion');

    };


    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", to: "/" },
                    { label: "Mi Cuenta", to: "/iniciar-sesion" },
                    { label: "Registrar Usuario" }
                ]}
            />
            <div className='container py-4 py-md-3'>
                <h4 id='ABM_Producto'>Registro de Usuario</h4>
                <small className="text-body-secondary">
                    Complete los siguientes datos para registrarse como usuario de la tienda Kiosuko no Manga.
                </small>
                <form className='was-validated mt-3 me-5 p-30' onSubmit={manejarEnvio}>

                    <div className="row g-3 g-md-4 mb-4">
                        <div className="col-12 col-md-6">
                            <label className='form-label fw-semibold text-dark' htmlFor="validationInputNombre">Nombre:</label>
                            <input type="text" placeholder="Ingrese su nombre" id="validationInputNombre" aria-label="First name"
                                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                                value={usuario.nombre}
                                onChange={manejarCambio}
                                name='nombre'
                                required />
                            <div className="invalid-feedback">
                                {errores.nombre || 'Ingrese nombre del usuario.'}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className='form-label fw-semibold text-dark'>Apellido:</label>
                            <input type="text" placeholder="Ingrese su apellido" aria-label="Last name"
                                className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                                value={usuario.apellido}
                                onChange={manejarCambio}
                                name='apellido'
                                required />
                            <div className="invalid-feedback">
                                {errores.apellido || 'Ingrese apellido del usuario.'}
                            </div>
                        </div>

                    </div>
                    <div className="row g-3 g-md-4 mb-4">
                        <div className="col-12 col-md-6">
                            <label className='fw-bolder form-label' htmlFor="validationInputDire">Domicilio:</label>
                            <input type="text" placeholder="Ingrese su Correo Electrónico"
                                id="validationvalidationInputDireInputEmail" aria-label="First name"
                                className={`form-control ${errores.domicilio ? 'is-invalid' : ''}`}
                                value={usuario.domicilio}
                                onChange={manejarCambio}
                                name='domicilio' required />
                            <div className="invalid-feedback">
                                {errores.domicilio || 'Ingrese domicilio del usuario.'}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className='fw-bolder form-label'>Provincia:</label>
                            <input type="text" placeholder="Ingreso su teléfono"
                                className={`form-control ${errores.provincia ? 'is-invalid' : ''}`}
                                value={usuario.provincia}
                                onChange={manejarCambio}
                                name='provincia' required />
                            <div className="invalid-feedback">
                                {errores.provincia || 'Ingrese la provincia del usuario.'}
                            </div>
                        </div>

                    </div>
                    <div className="row g-3 g-md-4 mb-4">
                        <div className="col-12 col-md-6">
                            <label className='fw-bolder form-label' htmlFor="validationInputEmail">Email:</label>
                            <input type="email" placeholder="Ingrese su Correo Electrónico" id="validationInputEmail" autoComplete="email"
                                className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                                value={usuario.email}
                                onChange={manejarCambio}
                                name='email' required />
                            <div className="invalid-feedback">
                                {errores.email || 'Ingrese el email del usuario.'}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className='fw-bolder form-label'>Teléfono:</label>
                            <input type="text" placeholder="Ingreso su teléfono"
                                className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                                value={usuario.telefono}
                                onChange={manejarCambio}
                                name='telefono'
                                required />
                            <div className="invalid-feedback">
                                {errores.telefono || 'Ingrese el teléfono del usuario.'}
                            </div>
                        </div>
                    </div>
                    <div className="row g-3 g-md-4 mb-4">
                        <div className="col-12 col-md-6">
                            <label className='fw-bolder form-label' htmlFor="validationInputPass">Contraseña:</label>
                            <small className="text-muted d-block mb-2">La clave debe tener 8 caracteres alfanuméricos.</small>
                            <input type="password" minLength={8} maxLength={8}
                                placeholder="Ingrese la contraseña" id="validationInputPass" autoComplete="new-password"
                                className={`form-control ${errores.pass ? 'is-invalid' : ''}`}
                                value={usuario.pass}
                                onChange={manejarCambio}
                                name='pass'
                                required />
                            <div className="invalid-feedback">
                                {errores.pass || 'Ingrese la contraseña del usuario.'}
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <label className='fw-bolder form-label'>Confirma Contraseña:</label>
                            <small className="text-muted d-block mb-2">Reitere la contaseña ingresada.</small>
                            <input type="password" minLength={8} maxLength={8}
                                placeholder="Confirme la contraseña ingresada" autoComplete="new-password"
                                className={`form-control ${errores.passConfir ? 'is-invalid' : ''}`}
                                value={usuario.passConfir}
                                onChange={manejarCambio}
                                name='passConfir'
                                required />
                            <div className="invalid-feedback">
                                {errores.passConfir || 'Ingrese la confirmación de la contraseña del usuario.'}
                            </div>
                        </div>
                    </div>
                    <div className="d-grid d-md-flex gap-3 justify-content-md-end mt-2">
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg px-4 fw-bold"
                            onClick={() => navigate('/iniciar-sesion')}
                        > Cancelar
                        </button>
                        <button type="submit" className="btn btn-principal btn-lg px-4 fw-bold"
                        >Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}