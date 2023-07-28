import React, { useState } from "react";
import Swal from "react-bootstrap-sweetalert";
import CrearCategoria from "./CrearCategoria";
import ModificarCategoria from "./ModificarCategoria";

const SweetAlertModificarCategoria = ({ show, onClose, categoria }) => {
  return (
    <Swal show={show} title="Modificar Categoría" onConfirm={onClose} onCancel={onClose}>
      <ModificarCategoria categoria={categoria} />
    </Swal>
  );
};


const ListaCategorias = ({
  formularioVisible,
  handleMostrarFormulario,
  handleCerrarFormulario,
  categorias,
  handleEliminarCategoria,
  cardsVisible,
}) => {

  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const handleConfirmModificar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setShowSweetAlert(true);
  };

  const handleCancelarSweetAlert = () => {
    setShowSweetAlert(false);
    setCategoriaSeleccionada(null);
  };

  return (
    <>
       <h2>Lista de Categorías</h2>
      {!formularioVisible && (
        <button className="btn btn-success mt-4 py-2" onClick={handleMostrarFormulario}>
          Agregar
        </button>
      )}
      {formularioVisible && (
        <>
          <button className="btn btn-danger mt-4 py-2" onClick={handleCerrarFormulario}>
            Cancelar
          </button>
          <CrearCategoria />
        </>
      )}
      <br />
      <br />

      {/* Scrollable container */}
      <div style={{ overflow: "auto", maxHeight: "400px" }}>
        {cardsVisible && (
          <div className="d-flex flex-wrap gap-1 mt-2 justify-content-center">
            {categorias.map((categoria, index) => {
              return (
                <div className="card w-25 p-3" key={categoria.id_cat}>
                  <img
                    src={require("../images/" + categoria.imagen)}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-center">{categoria.categoria}</h5>
                    <p className="card-text text-truncate" stAyle={{ maxWidth: "500px", maxHeight: "200px" }}>
                      {categoria.descripcion}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-danger" onClick={() => handleEliminarCategoria(categoria.id_cat)}>
                        Eliminar
                      </button>
                      <button className="btn btn-primary" onClick={() => handleConfirmModificar(categoria)}>
                        Modificar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <br />

      <SweetAlertModificarCategoria
        show={showSweetAlert}
        onClose={handleCancelarSweetAlert}
        categoria={categoriaSeleccionada}
      />
    </>
  );
};

export default ListaCategorias;
