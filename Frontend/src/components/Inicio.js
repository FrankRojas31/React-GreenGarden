import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Inicio.css"
import Top from './Productos[TOP]';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'; 

function Inicio() {
  return (
    <div className="Inicio">
      <div className="container-fluid p-0">
        <div className="col">
        <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={4000} // Cambia de imagen cada 3 segundos
            showStatus={false}
          >
          <div className="position-relative">
            <img src={require("../images/v21_32.png")} className="img-fluid w-100 max-vh-80" alt="fondo" style={{ height: "300px", opacity: 0.9 }} />
          </div>

          <div className="position-relative">
            <img src={require("../images/fondo-3.jpg")} className="img-fluid w-100 max-vh-80" alt="fondo" style={{ height: "300px", opacity: 0.9 }} />
          </div>

          <div className="position-relative">
            <img src={require("../images/fondo-inicio3.png")} className="img-fluid w-100 max-vh-80" alt="fondo" style={{ height: "300px", opacity: 0.9 }} />
          </div>

          </Carousel>
        </div>
        <br />
        <h2 className="text-center">PRODUCTOS TOP</h2>
      </div>
      <Top />
      <br />
    </div>
  );
}

export default Inicio;
