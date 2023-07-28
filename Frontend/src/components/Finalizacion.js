import React from "react";
import '../css/Finalizacion.css';

function Finalizacion() {
    const regresarInicio = () => {
    // Lógica para redirigir al usuario a la página de inicio
    window.location.href = "inicio.html";
};

return (
    <>      
        <div class="bg-finalizacion">
            <div className="container">
                <section className="section">
                <h1>¡GRACIAS POR SU COMPRA!</h1>
                <img src={require("../images/iconov.png")}/>
                </section>
                    <div id="botones-container">
                        <button id="botonMostrar" className="btn btn-success btn-lg">Comprar de nuevo</button>
                        <button id="botonOcultar" className="btn btn-warning btn-lg" onClick={regresarInicio}>Regresar al inicio</button>
                    </div>
            </div>
        </div>
    
    </>
);
}

export default Finalizacion;