import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Categorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/Categorias")
            .then((respuesta) => {
                if (respuesta.data.Estatus === "Exitoso") {
                    setCategorias(respuesta.data.Resultado);
                } else {
                    console.log("Error");
                }
            })
            .catch((error) => console.log(error));
    });

    return (
        <>
        
        <br/>
        <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center">
            {categorias.map((categoria,index) => {
                return(
                    <>
                            <div className="card w-25 p-3" key={categoria.id_cat}>
                                <img src={require("../images/" + categoria.imagen)} className="card-img-top" alt="..." style={{ height: '300px', objectFit: 'cover' }}/>
                                    <div className="card-body text-center">
                                    <h5 className="card-title">{categoria.categoria}</h5>
                                    <p className="card-text text-truncate" style={{ maxWidth: '500px', maxHeight:'200px' }}>{categoria.descripcion}</p>
                                    <Link to={"/Producto/" + categoria.id_cat} className="btn btn-success ">Ver Productos</Link>
                                </div>
                            </div>
                    </>
                )
            })}
            </div>
            <br/>
        </>
    );
}

export default Categorias;
