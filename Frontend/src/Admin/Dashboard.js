import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DashboardMenu from "./DashboardMenu";
import UsuariosRegistrados from "./UsuariosRegistrados";
import ListaCategorias from "./ListaCategorias";
import ListaProductos from "./ListaProductos";
import Pedidos from "./Pedidos";

const MySwal = withReactContent(Swal);

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [opcionActiva, setOpcionActiva] = useState("inicio");
  const [categorias, setCategorias] = useState([]);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersFromApi = async () => {
      const response = await axios.get('http://localhost:8081/Usuarios');
      if (response.data.Estatus === "Exitoso") {
        setUsers(response.data.Resultado);
      } else {
        console.log("Error al obtener usuarios");
      }
    };

    if (showUsers) {
      fetchUsersFromApi();
    }
  }, [showUsers]);

  const handleToggleUsers = () => {
    setShowUsers(!showUsers);
  };


  useEffect(() => {
    axios
      .get("http://localhost:8081/Dashboard")
      .then((respuesta) => {
        if (respuesta.data.Estatus === "Exitoso") {
          setCategorias(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleModificarCategoria =() => {
    setOpcionActiva("categorias")
  }

  const handleModificarProductos = () => {
    setOpcionActiva("productos");
  };


  const handleEliminarCategoria = (categoriaId) => {
    // Show a SweetAlert prompt for deleting the category
    MySwal.fire({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Una vez eliminada, no podrá recuperar esta categoría.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8081/Categorias/${categoriaId}`)
          .then((respuesta) => {
            if (respuesta.data.Estatus === "Exitoso") {
              console.log("Categoría eliminada exitosamente");
              const categoriasActualizadas = categorias.filter((categoria) => categoria.id_cat !== categoriaId);
              setCategorias(categoriasActualizadas);

              // Show success SweetAlert
              MySwal.fire({
                icon: "success",
                title: "Categoría eliminada exitosamente",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              console.log("Error al eliminar la categoría");
            }
          })
          .catch((error) => {
            console.log(error);

            // Show error SweetAlert
            MySwal.fire({
              icon: "error",
              title: "Error al eliminar la categoría",
              text: "Ha ocurrido un error al eliminar la categoría. Por favor, inténtalo nuevamente.",
            });
          });
      }
    });
  };

  const handleEliminarProducto = (productoId) => {
    // Show a SweetAlert prompt for deleting the product
    MySwal.fire({
      title: "¿Está seguro de eliminar el producto?",
      text: "Una vez eliminado, no podrá recuperar este producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8081/Productos/${productoId}`)
          .then((respuesta) => {
            if (respuesta.data.Estatus === "Exitoso") {
              console.log("Producto eliminado exitosamente");
              const productosActualizados = productos.filter((producto) => producto.id_prod !== productoId);
              setProductos(productosActualizados);
  
              // Show success SweetAlert
              MySwal.fire({
                icon: "success",
                title: "Producto eliminado exitosamente",
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              console.log("Error al eliminar el producto");
            }
          })
          .catch((error) => {
            console.log(error);
  
            // Show error SweetAlert
            MySwal.fire({
              icon: "error",
              title: "Error al eliminar el producto",
              text: "Ha ocurrido un error al eliminar el producto. Por favor, inténtalo nuevamente.",
            });
          });
      }
    });
  };
  
  const handleMostrarFormulario = () => {
    MySwal.fire({
      title: "¿Agregar nueva categoría?",
      text: "Esta acción agregará una nueva categoría.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormularioVisible(true);
        setCardsVisible(false);
      }
    });
  };

  const handleCerrarFormulario = () => {
    // Show a SweetAlert prompt for closing the form
    MySwal.fire({
      title: "¿Está seguro de salir?",
      text: "Los cambios no se guardarán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormularioVisible(false);
        setCardsVisible(true);
      }
    });
  };

  const handleMostrarFormularioProd = () => {
    MySwal.fire({
      title: "¿Agregar nuevo producto?",
      text: "Esta acción agregará un nuevo producto.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormularioVisible(true);
        setCardsVisible(false);
      }
    });
  };

  const handleCerrarFormularioProd = () => {
    // Show a SweetAlert prompt for closing the form
    MySwal.fire({
      title: "¿Está seguro de salir?",
      text: "Los cambios no se guardarán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormularioVisible(false);
        setCardsVisible(true);
      }
    });
  };

  // Logica de Productos

  axios.get("http://localhost:8081/Producto").then((respuesta) => {
        if (respuesta.data.Estatus === "Exitoso") {
          setProductos(respuesta.data.Resultado);
          console.log(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => console.log(error));
      
      const totalUsuariosRegistrados = users.length;

      const [showPedidos, setShowPedidos] = useState(false);
      const [pedidos, setPedidos] = useState([]);
    
      useEffect(() => {
        const fetchPedidosFromApi = async () => {
          try {
            const response = await axios.get("http://localhost:8081/Pedidos");
            if (response.data.Estatus === "Exitoso") {
              setPedidos(response.data.Resultado);
            } else {
              console.log("Error al obtener pedidos");
            }
          } catch (error) {
            console.log("Error al obtener pedidos", error);
          }
        };
    
        if (showPedidos) {
          fetchPedidosFromApi();
        }
      }, [showPedidos]);
    
      const handleTogglePedidos = () => {
        setShowPedidos(!showPedidos);
      };
      
  // Renderizar el contenido correspondiente según la opción activa
  return (
    <>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-12 col-md-2 col-lg-2 col-xl-2 bg-dark PFix">
            <DashboardMenu
              opcionActiva={opcionActiva}
              setOpcionActiva={setOpcionActiva}
              handleModificarCategoria={handleModificarCategoria}
              handleModificarProductos={handleModificarProductos}
              handleTogglePedidos={handleTogglePedidos} // Pass handleTogglePedidos as a prop
            />
          </div>
          <div className="col">
            <main className="flex-grow-1">
              <div className="row justify-content-center align-content-center text-center">
                <div className="py-5">
                  {opcionActiva === "inicio" && (
                    <UsuariosRegistrados
                      showUsers={true}
                      totalUsuariosRegistrados={users.length}
                      users={users}
                      setUsers={setUsers} // Make sure 'setUsers' is defined and passed here
                      handleToggleUsers={handleToggleUsers}
                    />
                  )}
                  {opcionActiva === "categorias" && (
                    <ListaCategorias
                      formularioVisible={formularioVisible}
                      handleMostrarFormulario={handleMostrarFormulario}
                      handleCerrarFormulario={handleCerrarFormulario}
                      categorias={categorias}
                      handleEliminarCategoria={handleEliminarCategoria}
                      cardsVisible={cardsVisible}
                    />
                  )}
                  {opcionActiva === "productos" && (
                    <ListaProductos
                      formularioVisible={formularioVisible}
                      handleMostrarFormularioProd={handleMostrarFormularioProd}
                      handleCerrarFormularioProd={handleCerrarFormularioProd}
                      productos={productos}
                      handleEliminarProducto={handleEliminarProducto}
                      cardsVisible={cardsVisible}
                    />
                  )}
                  {opcionActiva === "pedidos" && (
                    <Pedidos
                      showPedidos={showPedidos}
                      totalPedidos={pedidos.length}
                      pedidos={pedidos}
                      handleTogglePedidos={handleTogglePedidos}
                    />
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
