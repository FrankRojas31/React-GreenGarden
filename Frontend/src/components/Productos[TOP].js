import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

function Top() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [UsuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log("Token Decodificado:", decodedToken);
      setUsuarioId(decodedToken.id_usuario);
    }

    axios.get("http://localhost:8081/Productos/")
      .then((respuesta) => {
        if (respuesta.data.Estatus === "Exitoso") {
          setProductos(respuesta.data.Resultado);
          console.log(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  // ...

const agregarAlCarrito = (producto) => {
  if (!UsuarioId) {
    Swal.fire({
      icon: 'warning',
      title: 'Inicia sesión para agregar productos al carrito',
    });
    return;
  }

  const carritoProducto = {
    usuario_id: UsuarioId,
    producto_id: producto.id_prod,
    precio: producto.precio,
    cantidad: 1,
  };

  axios.post("http://localhost:8081/carrito", carritoProducto)
    .then((respuesta) => {
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: `El producto ${producto.prod_nom} ha sido agregado al carrito`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No se pudo agregar el producto ${producto.prod_nom} al carrito`,
      });
    });
};

return (
  <div className="container mt-4">
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id_prod}>
          <div className="card h-100">
            <img src={require("../images/" + producto.imagen)} className="card-img-top" alt="..." style={{ height: '300px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">{producto.prod_nom}</h5>
              <p className="card-text text-truncate" style={{ maxWidth: '500px', maxHeight:'200px' }}>{producto.descripcion}</p>
              <p className="card-text text-center" style={{ maxWidth: '500px', maxHeight:'200px' }}>${producto.precio}MXN</p>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
                  <button className="btn btn-success" onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
export default Top;
