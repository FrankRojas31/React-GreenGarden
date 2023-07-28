import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Forms() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Debes ingresar tu nombre",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Debes ingresar tu correo electrónico",
      });
      return;
    }

    if (!message) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Debes ingresar un mensaje",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/Contacto", {
        nombre: name, // Ajustamos el nombre del campo que se enviará al servidor
        CorreoElectronico: email, // Ajustamos el nombre del campo que se enviará al servidor
        Mensaje: message, // Ajustamos el nombre del campo que se enviará al servidor
      });

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "El formulario se envió correctamente",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar el formulario",
      });
      console.log("Error al enviar el formulario:", error);
    }
  };

  return (
    <body>
      <div className="container bg-white mt-3">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="text-center">
            <h3>¡CONTACTANOS SERÁ UN GUSTO ATENDERTE!</h3>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name">NOMBRE:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Ingrese su nombre"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">CORREO ELECTRÓNICO:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Ingrese su correo electrónico"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="message">MENSAJE:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control"
              rows="5"
              placeholder="Ingrese su mensaje"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </body>
  );
}

export default Forms;
