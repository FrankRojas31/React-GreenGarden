import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function QuienesSomos() {
  return (
    <>
      <div className="justify-content-center bg-light py-4 d-flex align-items-center">
        <div className="container">
          <h1 className="text-center">¿QUIENES SOMOS?</h1>
          <br />
          <h2 className="text-center">NUESTRA HISTORIA</h2>
          <div className="row">
            <div className="col-md-3 order-md-1 d-flex align-items-center">
              <img src={require("../images/NOSOTROS.png")} alt="Esta es una imagen" className="img-fluid img-thumbnail" />
            </div>
            <div className="col-md-9 order-md-1">
              <div className="container">
                <div className="col-md-13 order-md-1">
                  <div className="text-justify">
                    <h5>
                      Green Garden es una empresa de jardinería con una rica historia que se remonta a sus humildes comienzos hace más de 20 años. Fundada en el año 2001 por dos apasionados amantes de la naturaleza, Juan Pérez y Ana López, la empresa comenzó como un pequeño negocio familiar en la ciudad de Cancún.
                    </h5>
                  </div>
                </div>
                <br/>

                <div className="col-md-13 order-md-1">
                  <div className="text-justify">
                    <h5>
                      Desde el principio, Juan y Ana compartieron una visión común de crear espacios verdes hermosos y sostenibles que brindaran alegría y armonía a las personas y al medio ambiente. Con una dedicación inquebrantable y una ética de trabajo sólida, Green Garden comenzó a ganar reconocimiento y una reputación envidiable en el sector de la jardinería.
                      A medida que la empresa crecía, Green Garden se diversificó y amplió su cartera de servicios para satisfacer las crecientes demandas de sus clientes.
                      A lo largo de los años, se especializaron en el diseño y construcción de jardines personalizados, la instalación de sistemas de riego eficientes y el mantenimiento profesional de áreas verdes tanto para clientes residenciales como comerciales.
                      Con el tiempo, Green Garden se ha convertido en un líder del sector de la jardinería, reconocido por su compromiso con la calidad, la creatividad en el diseño y la atención meticulosa a los detalles. Han trabajado en proyectos de envergadura, colaborando con arquitectos paisajistas de renombre y empresas de construcción para transformar espacios urbanos en oasis de vegetación y belleza natural.
                      Hoy en día, Green Garden cuenta con un equipo altamente capacitado de jardineros, paisajistas y técnicos en jardinería.
                      Su compromiso con la sostenibilidad ambiental se refleja en su enfoque en el uso de prácticas ecológicas y materiales orgánicos en todos sus proyectos.
                      Además, se mantienen a la vanguardia de las últimas tendencias en diseño de paisajes y tecnología verde para ofrecer soluciones innovadoras a sus clientes.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuienesSomos;
