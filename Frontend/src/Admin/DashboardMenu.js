import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "../css-admin/img.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFolder, faBox, faArrowLeft, faClipboardList, faUsers, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const DashboardMenu = ({ opcionActiva, setOpcionActiva, handleModificarCategoria, handleModificarProductos, handleTogglePedidos}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const { nombre_usuario, nivelAcceso, imagen_usuario } = decodedToken;
      setUser({ nombre_usuario, nivelAcceso, imagen_usuario });
    }
  }, []);

  const handleGoToInicio = () => {
    navigate("/");
  };

  return (
    <div className="h-100 d-flex flex-column">
      {user && (
        <div className="user-profile d-flex flex-column align-items-center">
          <div className="user-image-container">
            <img src={require("../images/" + user.imagen_usuario)} alt="User" className="user-image rounded-circle" />
          </div>
          <h5 className="text-light mb-1">{user.nombre_usuario}</h5>
          <p className="text-light">{user.nivelAcceso}</p>
        </div>
      )}
      <nav className="nav flex-column nav-css">
        <button
          className={`nav-link text-light ${opcionActiva === "inicio" ? "active" : ""}`}
          onClick={() => setOpcionActiva("inicio")}
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          <span>Inicio</span>
        </button>
        <button
          className={`nav-link text-light ${opcionActiva === "categorias" ? "active" : ""}`}
          onClick={handleModificarCategoria}
        >
          <FontAwesomeIcon icon={faFolder} className="mr-2" />
          <span>Categorías</span>
        </button>
        <button
          className={`nav-link text-light ${opcionActiva === "productos" ? "active" : ""}`}
          onClick={handleModificarProductos}
        >
          <FontAwesomeIcon icon={faBox} className="mr-2" />
          <span>Productos</span>
        </button>

      </nav>

      <div className="mt-auto mx-3 mb-3">
        <button className="btn btn-light" onClick={handleGoToInicio}>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Regresar
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;
