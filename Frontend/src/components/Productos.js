import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

function Productos() {
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

    axios.get("http://localhost:8081/ProductosSelect/" + id)
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

  const agregarAlCarrito = (id, nombreProducto) => {
    if (!UsuarioId) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión para agregar productos al carrito',
      });
      return;
    }

    const producto = {
      usuario_id: UsuarioId,
      producto_id: id,
      precio: productos.find((p) => p.id_prod === id).precio,
      cantidad: 1,
    };

    axios.post("http://localhost:8081/carrito", producto)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Agregado',
          text: `El producto ${nombreProducto} ha sido agregado al carrito`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `No se pudo agregar el producto ${nombreProducto} al carrito`,
        });
      });
  };

  return (
    <>
      <div className='text-center mt-4'>
        <h2>PRODUCTOS</h2>
      </div>
      <br/>
      <div className="d-flex flex-wrap gap-3 mt-4 justify-content-center">
        {productos.map((producto) => (
          <div className="card w-25 p-3" key={producto.id_prod}>
            <img src={require("../images/" + producto.imagen)} className="card-img-top" alt="..." style={{ height: '300px', objectFit: 'cover' }}/>
            <div className="card-body text-center">
              <h5 className="card-title">{producto.prod_nom}</h5>
              <p className="card-text text-truncate" style={{ maxWidth: '500px', maxHeight:'200px' }}>{producto.descripcion}</p>
              <p className="card-text text-truncate" style={{ maxWidth: '500px', maxHeight:'200px' }}>${producto.precio} MXN</p>
              <button className="btn btn-success" onClick={() => agregarAlCarrito(producto.id_prod, producto.prod_nom)}>Agregar al Carrito</button>
            </div>
          </div>
        ))}
      </div>
      <br/>
    </>
  );
}

export default Productos;
