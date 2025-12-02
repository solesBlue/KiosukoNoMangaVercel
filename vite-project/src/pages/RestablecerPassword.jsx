import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

export default function RestablecerContrasena() {


    return (
        <>
            {/* Breadcrumb igual que en el registro */}
            <Breadcrumb
                items={[
                    { label: "Home", to: "/" },
                    { label: "Mi Cuenta", to: "/iniciar-sesion" },
                    { label: "Restablecer Contraseña" }
                ]}
            />

            <div className="container py-5">
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <h5 className="card-title card-title-config">Restablecer Contraseña</h5>
                    <small className='text-muted'>Introduzca su correo electrónico para recibir un enlace de restablecimiento de contraseña.</small>
                    <div className="card-body p-4 p-md-5 ">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bolder">Correo Electrónico:</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="usuario@ejemplo.com" />
                        </div>
                        <p>Página en contrucción...</p>
                    </div>
                    <div className="d-grid d-md-flex gap-3 justify-content-md-end mt-2 mb-3">
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg px-4 fw-bold"
                            onClick={() => navigate('/iniciar-sesion')}
                        > Volver
                        </button>
                        <button type="submit" className="btn btn-principal btn-lg px-4 fw-bold"
                        >Restablecer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}