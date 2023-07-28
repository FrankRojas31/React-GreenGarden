import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function ModificarCategoriaForm({ categoria }) {
  const [nombre, setNombre] = useState(categoria.categoria);
  const [descripcion, setDescripcion] = useState(categoria.descripcion);
  const [imagen, setImagen] = useState(null);
  const [estatus, setEstatus] = useState(categoria.estatus);
  const [categorias, setCategorias] = useState([]);
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCerrarSweetAlert = () => {
    setShowSweetAlert(false);
  };

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

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("estatus", estatus);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const response = await axios.put(`http://localhost:8081/Categorias/${categoria.id_cat}`, formData);

      if (response.data.Estatus === "Exitoso") {
        setShowSuccessAlert(true);
        setSuccessMessage("Categoria modificada exitosamente");
        setShowErrorAlert(false);
      } else {
        setShowErrorAlert(true);
        setErrorMessage("Ha ocurrido un error al modificar la categoria. Por favor, inténtalo nuevamente.");
        setShowSuccessAlert(false);
      }
    } catch (error) {
      console.log(error);
      setShowErrorAlert(true);
      setErrorMessage("Ha ocurrido un error. Por favor, inténtalo nuevamente.");
      setShowSuccessAlert(false);
    }
  };

  useEffect(() => {
    // Mostrar Sweet Alert de éxito cuando showSuccessAlert cambie a true
    if (showSuccessAlert) {
      Swal.fire({
        icon: "success",
        title: "Categoria modificada exitosamente",
        toast: true,
        position: "top-end", // Colocar en la esquina superior derecha
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // Mostrar Sweet Alert de error cuando showErrorAlert cambie a true
    if (showErrorAlert) {
      Swal.fire({
        icon: "error",
        title: "Error al modificar la categoria",
        text: "Ha ocurrido un error al modificar la categoria. Por favor, inténtalo nuevamente.",
        toast: true,
        position: "top-end", // Colocar en la esquina superior derecha
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [showSuccessAlert, showErrorAlert]);

  return (
    <div className="card mt-4">
      <div className="card-header">Modificar Categoría</div>
      <div className="card-body">
        {showSweetAlert && (
          <div className="alert alert-success" role="alert">
            Categoría modificada exitosamente
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCerrarSweetAlert}></button>
          </div>
        )}

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
            <textarea
              id="descripcion"
              className="form-control"
              value={descripcion}
              onChange={handleDescripcionChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Imagen:
            </label>
            <input
              type="file"
              id="imagen"
              className="form-control"
              onChange={handleImagenChange}
              accept="image/png,image/jpeg"
            />
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
          <button type="submit" className="btn btn-primary">
            Modificar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModificarCategoriaForm;
