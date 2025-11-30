import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setErrores] = useState(null);

    // Validaciones de campos del producto
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

    const validar = (producto) => {
        const errores = validarProducto(producto);
        return {
            esValido: Object.keys(errores).length === 0,
            errores
        };
    };

    // const validarFormulario = () => {
    //     const errorDeCarga = {};
    //     let esValido = true;

    //     const camposRequeridos = ['name', 'review', 'precio', 'categoria', 'avatar', 'stock'];
    //     camposRequeridos.forEach(field => {
    //         if (!producto[field] || producto[field].toString().trim() === '') {
    //             // errorDeCarga[field] = 'Este campo es obligatorio.';
    //             esValido = false;
    //         }
    //     });
    //     for (const name in producto) {
    //         const errorMsg = validarProducto(name, producto[name]);
    //         if (errorMsg) {
    //             errorDeCarga[name] = errorMsg;
    //             esValido = false;
    //         }
    //     }

    //     setErrores(errorDeCarga);
    //     return esValido;
    // };


};