import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Registro() {
  const navigate = useNavigate();

  const [body, setBody] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Contrasenia: "",
    ConfirmarContrasenia: "",
    AceptoTerminos: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const cambioEntrada = ({ target }) => {
    const { name, value, type, checked } = target;
    const inputValue = type === "checkbox" ? checked : value;
    setBody({ ...body, [name]: inputValue });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Enviar = async () => {
    if (submitting) return;
    setSubmitting(true);
  
    // Validar campos requeridos
    if (
      !body.Nombre ||
      !body.Apellido ||
      !body.Correo ||
      !body.Contrasenia ||
      !body.ConfirmarContrasenia
    ) {
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text: "Debes rellenar todos los campos",
      });
    }
  
    // Verificar si la contraseña tiene al menos 8 caracteres
    if (body.Contrasenia.length < 8) {
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text: "La contraseña debe tener al menos 8 caracteres.",
      });
    }
  
    // Verificar si la contraseña cumple con los requisitos
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(body.Contrasenia)) {
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text:
          "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número.",
      });
    }
  
    // Verificar si se aceptaron los términos y condiciones
    if (!body.AceptoTerminos) {
      setSubmitting(false);
      return swal({
        icon: "warning",
        title: "¡Oops!",
        text: "Debes aceptar los términos y condiciones para registrarte.",
      });
    }
  
    try {
      // Verificar si el correo ya existe antes de hacer la solicitud de registro
      const existeCorreo = await axios.get(`http://localhost:8081/verificarCorreo/${body.Correo}`);
  
      if (existeCorreo.data) {
        setSubmitting(false);
        return swal({
          icon: "warning",
          title: "¡Oops!",
          text: "El correo ingresado ya está registrado.",
        });
      }
  
      // Resto del código para el registro del usuario
      const respuesta = await axios.post("http://localhost:8081/Registro", {
        nombre: body.Nombre,
        apellido: body.Apellido,
        correo: body.Correo,
        contrasenia: body.Contrasenia,
        nivel_acceso: "usuario",
      });
  
      if (respuesta.data.Estatus === "Exitoso") {
        navigate("/InicioSesion");
        swal({ icon: "success", title: "Éxito", text: "Usuario registrado correctamente" });
      } else {
        swal({ icon: "error", title: "Error", text: "No se pudo registrar el usuario" });
      }
    } catch (error) {
      console.log("Error en el registro de usuario: " + error);
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
    <section className="vh-200 d-flex align-items-center bg-dark">
      <div className="container-sm">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <h1 className="text-center fw-bold mb-5">Registro de Usuario</h1>
                <form onKeyDown={handleKeyDown}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Ingrese su nombre"
                      value={body.Nombre}
                      onChange={cambioEntrada}
                      name="Nombre"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      className="form-control"
                      placeholder="Ingrese su apellido"
                      value={body.Apellido}
                      onChange={cambioEntrada}
                      name="Apellido"
                    />
                  </div>
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
                  <div className="mb-3">
                    <label htmlFor="confirmarContrasenia" className="form-label">
                      Confirmar Contraseña
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmarContrasenia"
                      className="form-control"
                      placeholder="Confirme su contraseña"
                      value={body.ConfirmarContrasenia}
                      onChange={cambioEntrada}
                      name="ConfirmarContrasenia"
                    />
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
                      Acepto los términos y condiciones{" "}
                      <Link to="/TerminosCondiciones">Términos y condiciones</Link>
                    </label>
                  </div>
                  <div className="d-grid">
                    <button type="button" className="btn btn-success btn-lg" onClick={Enviar}>
                      Registrarse
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <Link to="/InicioSesion" className="nav-link">
                    ¿Ya tienes una cuenta? Inicia sesión
                  </Link>
                </div>
                <div className="text-right mt-4">
                  <button className="btn btn-warning" onClick={() => navigate(-1)}>
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}