import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-dark text-white mt-auto">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="navbar-acm-2 d-flex justify-content-between list-unstyled mt-3">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white hover-effect">INICIO</Link>
              </li>
              <li className="nav-item">
                <Link to="/Nosotros" className="nav-link text-white hover-effect">NOSOTROS</Link>
              </li>
              <li className="nav-item">
                <Link to="/Categorias" className="nav-link text-white hover-effect">CATEGORÍA</Link>
              </li>
              <li className="nav-item">
                <Link to="/Contacto" className="nav-link text-white hover-effect">CONTACTO</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <p>"LO QUE SIEMBRAS, COSECHARAS"</p>
            <p>Dirección:</p>
            <p>© 2023. Green Garden</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
