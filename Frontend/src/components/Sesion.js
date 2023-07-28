import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import {FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CrearUsuario() {
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = localStorage.getItem("token");
    console.log(verificarSesion);
    if (verificarSesion) {
      navigate("/");
    }
  }, [navigate]);


  const [body, setBody] = useState({
    Correo: "",
    Contrasenia: "",
    AceptoTerminos: false,
  });

  const [submitting, setSubmitting] = useState(false); // Flag to track submission process
  const [showPassword, setShowPassword] = useState(false); // Flag to toggle password visibility

  const cambioEntrada = ({ target }) => {
    const { name, value, type, checked } = target;
    const inputValue = type === "checkbox" ? checked : value;
    setBody({ ...body, [name]: inputValue });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Enviar = async () => {
    if (submitting) return; // Prevent multiple submissions
    setSubmitting(true); // Set the flag to true to indicate submission is in progress

    if (!body.Correo) {
      // Reset the flag and show the swal message
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text: "Debes rellenar el campo correo electrónico",
      });
    }

    if (!body.Contrasenia) {
      // Reset the flag and show the swal message
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text: "Debes rellenar el campo contraseña",
      });
    }

    if (!body.AceptoTerminos) {
      // Reset the flag and show the swal message
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text: "Debes aceptar los términos y condiciones",
      });
    }

    const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
      Correo: body.Correo,
    });

    const passcor = verificarCorreo.data.Resultado[0];
    console.log(passcor);
    if (passcor && passcor.contrasenia !== body.Contrasenia) {
      setSubmitting(false);
      return swal({ icon: "error", title: "Error", text: "Contraseña incorrecta." });
    }

    try {
      const respuesta = await axios.post("http://localhost:8081/Sesion", body);
      const resultado = respuesta.data.Resultado;
      if (resultado && resultado.length > 0) {

        localStorage.setItem("token", respuesta.data.token);

        swal({
          icon: "success",
          title: "¡Inicio de sesión exitoso!",
          text: "Redireccionando a la página de inicio...",
          timer: 2000,
          timerProgressBar: true
        });

        setTimeout(() => {
          navigate("/");
          window.location.reload(); // <-- Reload the page after navigating to the home page
        }, 2100);
      } else {
        swal({
          icon: "error",
          title: "Error",
          text: "El correo o contraseña son incorrectos",
        });
      }
    } catch (error) {
      console.log("Error en el inicio de sesión: " + error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      Enviar();
    }
  };

  return (
    <section className="vh-90 d-flex align-items-center bg-dark">
      <div className="container-sm">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <h1 className="text-center fw-bold mb-5 mt-2">Iniciar Sesion</h1>
                <form onKeyDown={handleKeyDown}>
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control"
                      placeholder="example@example.com"
                      value={body.Correo}
                      onChange={cambioEntrada}
                      name="Correo"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contrasenia" className="form-label">
                      Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="contrasenia"
                        className="form-control"
                        placeholder="Debe tener al menos 8 caracteres"
                        value={body.Contrasenia}
                        onChange={cambioEntrada}
                        name="Contrasenia"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="aceptoTerminos"
                      checked={body.AceptoTerminos}
                      onChange={cambioEntrada}
                      name="AceptoTerminos"
                    />
                    <label className="form-check-label" htmlFor="aceptoTerminos">
                      Acepto los términos y condiciones <a href="#!">Términos y condiciones</a>
                    </label>
                  </div>
                    
                  <div className="d-grid">
                    <button type="button" className="btn btn-success btn-lg" onClick={Enviar}>Iniciar Sesion</button>
                  </div>
                </form>
                    <div className="text-center mt-5">
                      ¿No tienes una cuenta? <Link to="/Registro" className="nav-link">Regístrate</Link>
                    </div>
                <div className="text-right mt-4">
                  <button className="btn btn-warning" onClick={() => navigate(-1)}>Volver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
