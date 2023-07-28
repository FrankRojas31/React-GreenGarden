import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ModificarProducto({ producto }) {
  const [prodNom, setProdNom] = useState(producto.prod_nom);
  const [catId, setCatId] = useState(producto.cat_id);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [estatus, setEstatus] = useState(producto.estatus);
  const [top, setTop] = useState(producto.TOP);
  const [imagen, setImagen] = useState(null);
  const [precio, setPrecio] = useState(producto.precio);
  const [categorias, setCategorias] = useState([]);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const obtenerCategorias = () => {
    axios
      .get("http://localhost:8081/CategoriasDash")
      .then((respuesta) => {
        setCategorias(respuesta.data.Resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleProdNomChange = (event) => {
    setProdNom(event.target.value);
  };

  const handleCatIdChange = (event) => {
    setCatId(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleEstatusChange = (event) => {
    setEstatus(Number(event.target.value));
  };

  const handleTopChange = (event) => {
    setTop(event.target.value);
  };

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre", prodNom);
    formData.append("cat_id", catId);
    formData.append("descripcion", descripcion);
    formData.append("estatus", estatus);
    formData.append("top", top);
    formData.append("precio", precio);
    formData.append("imagen", imagen);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const response = await axios.put(`http://localhost:8081/Productos/${producto.id_prod}`, formData);

      if (response.data.Estatus === "Exitoso") {
        setShowSuccessAlert(true);
        setSuccessMessage("Producto modificado exitosamente");
        setShowErrorAlert(false);
      } else {
        setShowErrorAlert(true);
        setErrorMessage("Ha ocurrido un error al modificar el producto. Por favor, inténtalo nuevamente.");
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
        title: "Producto modificado exitosamente",
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
        title: "Error al modificar el producto",
        text: "Ha ocurrido un error al modificar el producto. Por favor, inténtalo nuevamente.",
        toast: true,
        position: "top-end", // Colocar en la esquina superior derecha
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [showSuccessAlert, showErrorAlert]);

  return (
    <div className="card mt-4">
      <div className="card-header">Modificar Producto</div>
      <div className="card-body">
        {showSuccessAlert && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {showErrorAlert && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="prodNom" className="form-label">
              Nombre:
            </label>
            <input type="text" id="prodNom" className="form-control" value={prodNom} onChange={handleProdNomChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="catId" className="form-label">
              Categoría:
            </label>
            <select id="catId" className="form-control" value={catId} onChange={handleCatIdChange} required>
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id_cat} value={categoria.id_cat}>
                  {categoria.categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción:
            </label>
            <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="estatus" className="form-label">
              Estatus:
            </label>
            <select id="estatus" className="form-control" value={estatus} onChange={handleEstatusChange} required>
              <option value="1">Mostrar</option>
              <option value="0">No mostrar</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="top" className="form-label">
              Producto (Nuevo)
            </label>
            <select id="top" className="form-control" value={top} onChange={handleTopChange} required>
              <option value="">Seleccione el TOP</option>
              <option value="1" selected={top === "1"}>
                Principal
              </option>
              <option value="0" selected={top === "0"}>
                Secundario
              </option>
            </select>
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
            <label htmlFor="precio" className="form-label">
              Precio:
            </label>
            <input type="number" id="precio" className="form-control" value={precio} onChange={handlePrecioChange} required />
          </div>
          <button type="submit" className="btn btn-primary"  onClick={() => setShowSuccessAlert(false)}>
            Modificar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModificarProducto;
