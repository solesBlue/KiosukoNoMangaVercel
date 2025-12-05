import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";

export default function QuienesSomos() {

    return (

        <>
            <Breadcrumb
                items={[
                    { label: "Home", to: "/" },
                    { label: "Quienes Somos" }
                ]}
            />

            {/* <h2 className="fw-bold mb-3 text-">
                Kiosuko no Manga
            </h2>
            <p className="small text-white p-fonts-footer">
                ¡Tu cueva otaku de confianza en Argentina! Encontrá todo el manga, las figuras que te vuelven loco, dakimakuras, merchandising y mucho más. Hacemos envíos rapidísimos y seguros a todo el país. ¡Dale, que te esperamos!
            </p> */}

            <div className="container py-5" >
                <div className="text-center p-4 mb-4 rounded-4">
                    <h1 className="fw-bold text-titulo">¡Bienvenidos a Kiosuko No Manga!</h1>
                </div>
                <div className="mx-auto col-lg-8 col-md-10 p-4 rounded-4 shadow bg-write">
                    <p className="p-secundario">En Kiosuko No Manga somos fanáticos de los mangas, el anime y todo lo que hace vibrar el corazón otaku. Acá vas a encontrar desde tus series favoritas hasta figuras, pósters y cositas coleccionables que gritan <strong className="color-tienda">kawaii</strong>  por todos lados.</p>
                    <p className="p-secundario">También nos encanta ser ese lugar donde siempre te sentís en casa. Pasá, descubrí nuevas historias, reviví tus clásicos favoritos y llevate esa merch que venís deseando hace rato… ¡con la mejor onda otaku!!</p>
                    <p className="fw-bold text-center mt-4 p-secundario color-tienda">
                        Veni a encontrar tu próxima gran historia!!!
                    </p>
                </div>
                <Link to="/" className="btn btn-secondary mt-3 p-secundario fw-bolder">
                  Volver al Inicio
                </Link>
            </div>

        </>
    );
};