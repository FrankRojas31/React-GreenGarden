import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css"; 

function NewCategoryForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [estatus, setEstatus] = useState("1"); // Por defecto, se muestra "Mostrar"

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  const handleEstatusChange = (event) => {
    setEstatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imagen) {
      // Mostrar una SweetAlert si no se ha seleccionado una imagen
      Swal.fire({
        icon: "error",
        title: "Imagen requerida",
        text: "Por favor, selecciona una imagen para la categoría.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);
    formData.append("estatus", estatus);

    try {
      const response = await axios.post("http://localhost:8081/CategoriasInsert", formData);

      if (response.data.Estatus === "Exitoso") {
        console.log("Categoría agregada exitosamente");
        setNombre("");
        setDescripcion("");
        setImagen(null);
        setEstatus("1"); // Restaurar el valor predeterminado "Mostrar"

        Swal.fire({
          icon: "success",
          title: "Categoría agregada exitosamente",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        console.log("Error al agregar la categoría");

        Swal.fire({
          icon: "error",
          title: "Error al agregar la categoría",
          text: "Ha ocurrido un error al agregar la categoría. Por favor, inténtalo nuevamente.",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error al agregar la categoría",
        text: "Ha ocurrido un error al agregar la categoría. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">Agregar Nueva Categoría</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input type="text" id="nombre" className="form-control" value={nombre} onChange={handleNombreChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción:
            </label>
            <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Imagen:
            </label>
            <input type="file" id="imagen" className="form-control" onChange={handleImagenChange} accept="image/png,image/jpeg" required />
          </div>
          <div className="mb-3">
            <label htmlFor="estatus" className="form-label">
              Estatus:
            </label>
            <select id="estatus" className="form-control" value={estatus} onChange={handleEstatusChange}>
              <option value="1">Mostrar</option>
              <option value="0">No mostrar</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Agregar</button>
        </form>
      </div>
    </div>
  );
}

export default NewCategoryForm;
