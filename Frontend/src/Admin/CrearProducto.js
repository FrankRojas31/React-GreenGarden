import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function CrearProducto() {
  const [prodNom, setProdNom] = useState("");
  const [catId, setCatId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatus, setEstatus] = useState(1);
  const [top, setTop] = useState("");
  const [imagen, setImagen] = useState(null); // Cambio: inicializamos imagen con null
  const [precio, setPrecio] = useState(0);
  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = () => {
    axios
      .get("http://localhost:8081/Categorias")
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

    if (!imagen) {
      // Mostrar una SweetAlert si no se ha seleccionado una imagen
      Swal.fire({
        icon: "error",
        title: "Imagen requerida",
        text: "Por favor, selecciona una imagen para el producto.",
      });
      return;
    }

    // Crear el objeto FormData para el producto
    const AgregarProducto = new FormData();
    AgregarProducto.append("nombre", prodNom);
    AgregarProducto.append("cat_id", catId);
    AgregarProducto.append("descripcion", descripcion);
    AgregarProducto.append("estatus", estatus);
    AgregarProducto.append("TOP", top);
    AgregarProducto.append("precio", precio);
    AgregarProducto.append("imagen", imagen);

    try {
      const response = await axios.post("http://localhost:8081/ProductosInsert", AgregarProducto);

      if (response.data.Estatus === "Exitoso") {
        console.log("Producto agregado exitosamente");
        setProdNom("");
        setCatId("");
        setDescripcion("");
        setEstatus(1);
        setTop("");
        setImagen(null);
        setPrecio(0);

        Swal.fire({
          icon: "success",
          title: "Producto agregado exitosamente",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        console.log("Error al agregar el producto");

        Swal.fire({
          icon: "error",
          title: "Error al agregar el producto",
          text: "Ha ocurrido un error al agregar el producto. Por favor, inténtalo nuevamente.",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">Agregar Nuevo Producto</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="prodNom" className="form-label">
              Nombre:
            </label>
            <input type="text" id="prodNom" className="form-control" value={prodNom} onChange={handleProdNomChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="catId" className="form-label">Categoría:</label>
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
            <label htmlFor="descripcion" className="form-label">Descripción:</label>
            <textarea id="descripcion" className="form-control" value={descripcion} onChange={handleDescripcionChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="estatus" className="form-label">
              Estatus:
            </label>
            <select
              id="estatus"
              className="form-control"
              value={estatus}
              onChange={handleEstatusChange}
              required
            >
              <option value="1">Mostrar</option>
              <option value="0">No mostrar</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="top" className="form-label">
              Producto (Nuevo)
            </label>
            <select
              id="top"
              className="form-control"
              value={top}
              onChange={handleTopChange}
              required
            >
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
            <input type="file"className="form-control" id="imagen" onChange={handleImagenChange} accept="image/png,image/jpeg" />
          </div>
          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio:
            </label>
            <input
              type="number"
              id="precio"
              className="form-control"
              value={precio}
              onChange={handlePrecioChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearProducto;
