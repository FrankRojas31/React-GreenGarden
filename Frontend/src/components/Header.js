import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import SweetAlert from "react-bootstrap-sweetalert";
import { Card } from "react-bootstrap";

function Header() {
  const [cartItems, setCartItems] = useState({});
  const [autenticado, setAutenticado] = useState(localStorage.getItem("token"));
  const [dropdownHover] = useState(false);
  const [nivelAcceso, setNivelAcceso] = useState("Usuario");
  const [showCart, setShowCart] = useState(false);
  const [imagenUsuario, setImagenUsuario] = useState([]);
  const [Idusuario, setIdUsuario] = useState([]);
  const [totalProductosCarrito, setTotalProductosCarrito] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (trimmedQuery === "") {
      // If the search query is empty, show all products
      setSearchResults([]);
    } else {
      // Filter the products based on the search query
      const filteredProducts = allProducts.filter((product) =>
        product.nombre_producto.toLowerCase().includes(trimmedQuery)
      );
      setSearchResults(filteredProducts);
    }
  };

  let hideCartTimeout;

  const cerrarSesion = () => {
    swal({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      buttons: ["Cancelar", "Cerrar sesión"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        setAutenticado(null);
        localStorage.removeItem("token");
      }
    });
  };

  const handleMouseEnter = () => {
    if (hideCartTimeout) {
      clearTimeout(hideCartTimeout);
    }
    setShowCart(false);
  };

  const handleMouseLeave = () => {
    hideCartTimeout = setTimeout(() => {
      setShowCart(false);
    }, 500);
  };

  const getNivelAccesoFromToken = () => {
    if (autenticado) {
      const decodedToken = jwt_decode(localStorage.getItem("token"));
      setNivelAcceso(decodedToken.nivelAcceso);
    }
  };

  const getImagenUsuario = () => {
    if (autenticado) {
      const decodedToken = jwt_decode(localStorage.getItem("token"));
      const imagenUsuarioPath = decodedToken.imagen_usuario;
      const rutaCompleta = require(`../images/${imagenUsuarioPath}`);
      setImagenUsuario(rutaCompleta);
    }
  };

  const eliminarProductoCarrito = (productoId) => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const usuarioId = decodedToken.id_usuario;
    axios
      .delete(`http://localhost:8081/EliminarProdCarrito/${productoId}/${usuarioId}`)
      .then((response) => {
        setTimeout(() => {
          obtenerProductosCarrito();
        }, 500);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto del carrito EN EL FRONT", error);
      });
  };

  const obtenerProductosCarrito = () => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const usuarioId = decodedToken.id_usuario;

    axios
      .get(`http://localhost:8081/carrito/${usuarioId}`)
      .then((response) => {
        const groupedItems = {};
        response.data.forEach((carrito) => {
          if (groupedItems.hasOwnProperty(carrito.id)) {
            groupedItems[carrito.id].cantidad += carrito.cantidad;
            groupedItems[carrito.id].precio += carrito.precio * carrito.cantidad;
          } else {
            groupedItems[carrito.id] = {
              ...carrito,
              precio: carrito.precio * carrito.cantidad,
            };
          }
        });

        setCartItems(groupedItems);

        const total = Object.values(groupedItems).reduce((total, carrito) => total + carrito.cantidad, 0);
        setTotalProductosCarrito(total);
      })
      .catch((error) => {
        console.error("Error al obtener productos del carrito", error);
      });
  };

  useEffect(() => {
    getNivelAccesoFromToken();
    getImagenUsuario();
    if (autenticado) {
      obtenerProductosCarrito();
    }
  }, [autenticado, Idusuario, cartItems]);

  const disminuirCantidadCarrito = (productoId) => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const usuarioId = decodedToken.id_usuario;
    axios
      .put(`http://localhost:8081/DisminuirCantidadCarrito/${productoId}/${usuarioId}`)
      .then((response) => {
        console.log(productoId);
        setTimeout(() => {
          obtenerProductosCarrito();
        }, 500);
      })
      .catch((error) => {
        console.error("Error al disminuir la cantidad del producto en el carrito", error);
      });
  };

  const handlePagar = () => {
  // Vaciar el carrito después de completar el pago
  setCartItems([]);
    
    // Muestra un mensaje de éxito o redirecciona a una página de éxito
    swal("Pago exitoso", "Gracias por tu compra", "success");
  };

  return (
    <header className="background">
      <Navbar expand="lg" variant="dark" bg="dark">
        <Link to="/" className="navbar-brand">
          <img src={require("../images/logo-green.png")} alt="Logo" width="150" className="rounded float-start" />
        </Link>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">INICIO</Link>
            <Link to="/Nosotros" className="nav-link">NOSOTROS</Link>
            <Link to="/Categorias" className="nav-link">CATEGORÍA</Link>
            <Link to="/Contacto" className="nav-link">CONTACTO</Link>
            {autenticado && nivelAcceso === 'Administrador' && (
              <Link to="/Dashboard" className="nav-link">ADMINISTRACIÓN</Link>
            )}
          </Nav>
          <div className="container" style={{ maxWidth: "600px" }}>
            <div className="search-box d-flex align-items-center ml-3">
              <input type="text" className="form-control" placeholder="Encuéntralo aquí!" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <button className="btn btn-outline-light" type="button">
                <FaSearch />
              </button>
            </div>
          </div>
          {autenticado ? (
            <Nav
              className={`container ${dropdownHover ? 'dropdown-hover' : ''}`}
              style={{ maxWidth: "162px" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavDropdown alignRight title={<img src={imagenUsuario} alt="Imagen de usuario" className="user-icon" style={{ width: "32px", height: "32px" }} />} id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={cerrarSesion}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <div className="container" style={{ maxWidth: "168px" }}>
              <Link to="/InicioSesion" className="btn btn-success">Acceso</Link>
            </div>
          )}
          {autenticado && (
            <div className="cart-container align-items-center" style={{ marginRight: "10px" }}>
              <button className="btn btn-outline-light" type="button" onClick={() => setShowCart(!showCart)}>
                <FaShoppingCart />
                {totalProductosCarrito > 0 && <span className="badge badge-danger">{totalProductosCarrito}</span>}
              </button>

              {showCart && (
                <SweetAlert
                  style={{ maxWidth: "1200px", fontSize: "18px" }}
                  title="Contenido del carrito"
                  onConfirm={() => setShowCart(false)}
                  onCancel={() => setShowCart(false)}
                  confirmBtnText="Aceptar"
                >
                  <p>Contenido del carrito:</p>
                  <ul>
                    {Object.values(cartItems).map((carrito) => (
                      <Card key={carrito.id} className="mb-3">
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <img
                              src={require("../images/" + carrito.imagen)}
                              alt={carrito.nombre_producto}
                              style={{
                                width: "100px",
                                height: "100px",
                                marginRight: "20px",
                              }}
                            />
                            <div>
                              <Card.Title>Producto: {carrito.nombre_producto}</Card.Title>
                              <Card.Text>Precio: {carrito.precio}</Card.Text>
                            </div>
                            <div className="ml-auto">
                              <div className="d-flex align-items-center mb-2">
                                <span className="mr-1">Cantidad:</span>
                                <span>{carrito.cantidad}</span>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </ul>
                  {/* Botón de PayPal */}
                  <PayPalScriptProvider options={{ "client-id": "Ad2SSRu5VQWwTRQVtp3HhQLSRqLvi-SW-TC2fkp58Q_PkROTh7M52vXE1YCw_coQiKiprT_9vw_n_FpP" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        const totalCarrito = Object.values(cartItems).reduce(
                          (total, carrito) => total + carrito.precio * carrito.cantidad,
                          0
                        );
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalCarrito.toFixed(2),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        handlePagar();
                      }}
                      onError={(error) => {

                        console.error("Error en el pago de PayPal", error);
                      }}
                    />
                  </PayPalScriptProvider>
                </SweetAlert>
              )}
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
