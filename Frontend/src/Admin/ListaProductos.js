import React, {useState}from "react";
import CrearProducto from "./CrearProducto";
import ModificarProducto from "./ModificarProducto";
import Swal from "react-bootstrap-sweetalert";

const SweetAlertModificarProducto = ({ show, onClose, producto }) => {
    return (
      <Swal show={show} title="Modificar Producto" onConfirm={onClose} onCancel={onClose}>
        <ModificarProducto producto={producto} />
      </Swal>
    );
  };

const ListaProductos = ({
  formularioVisible,
  handleMostrarFormularioProd,
  handleCerrarFormularioProd,
  productos,
  handleEliminarProducto,
  cardsVisible,
}) => {

    const [showSweetAlert, setShowSweetAlert] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    const handleConfirmModificar = (producto) => {
        setProductoSeleccionado(producto);
        setShowSweetAlert(true);
      };
    
      const handleCancelarSweetAlert = () => {
        setShowSweetAlert(false);
        setProductoSeleccionado(null);
      };

  return (
    <>
      <h2>LISTA DE PRODUCTOS</h2>
      {!formularioVisible ? (
        <button className="btn btn-success mt-4 py-2" onClick={handleMostrarFormularioProd}>
          Agregar
        </button>
      ) : (
        <>
          <button className="btn btn-danger mt-4 py-2" onClick={handleCerrarFormularioProd}>
            Cancelar
          </button>
          <CrearProducto />
        </>
      )}
      <br />
      <br />

      {/* Scrollable container */}
      <div style={{ overflow: "auto", maxHeight: "400px" }}>
        {cardsVisible && (
          <div className="d-flex flex-wrap gap-1 mt-2 justify-content-center">
            {productos.map((producto, index) => {
              return (
                <div className="card w-25 p-3" key={producto.id_prod}>
                  <img
                    src={require("../images/" + producto.imagen)}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-center">{producto.prod_nom}</h5>
                    <p className="card-text text-truncate" style={{ maxWidth: "500px", maxHeight: "200px" }}>
                      {producto.descripcion}
                    </p>
                    <div className="d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={() => handleEliminarProducto(producto.id_prod)}>
                      Eliminar
                    </button>
                    <button className="btn btn-primary" onClick={() => handleConfirmModificar(producto)}>
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
      <SweetAlertModificarProducto show={showSweetAlert} onClose={handleCancelarSweetAlert} producto={productoSeleccionado} />
    </>
  );
};

export default ListaProductos;
