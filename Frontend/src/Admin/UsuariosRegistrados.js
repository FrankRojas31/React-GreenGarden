import React, { useState } from "react";
import { FaPencilAlt, FaTrash, FaLevelUpAlt, FaLevelDownAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios"; 
import jwtDecode from "jwt-decode";

const UsuariosRegistrados = ({ showUsers, totalUsuariosRegistrados, users, setUsers, handleToggleUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const currentUserId = decodedToken ? decodedToken.id_usuario : null;

  const handleBajarNivel = (userId, event) => {
    event.stopPropagation();
    if (userId === currentUserId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes bajarte de nivel a ti mismo.",
      });
    } else {
      showBajarNivelAlert(userId);
    }
  };

  const showBajarNivelAlert = (userId) => {
    Swal.fire({
      title: "¿Bajar de Nivel?",
      text: "¿Estás seguro de bajar de bajar de nivel a Usuario?",
      icon: "question",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#28a745",
      confirmButtonText: "Sí, bajar de nivel",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmBajarNivel(userId);
      } else {
        cancelBajarNivel();
      }
    });
  };

  const confirmBajarNivel = (userId) => {
    closeBajarNivelAlert();

    axios
      .put(`http://localhost:8081/BajarNivelUsuario/${userId}`, { nivel_acceso: "Usuario" })
      .then((res) => {
        if (res.data.Estatus === "Exitoso") {
          const updatedUsers = users.map((user) =>
          user.id_usuario === userId ? { ...user, nivel_acceso: "Usuario" } : user
        );
        setUsers(updatedUsers);

        // Mostrar la alerta de éxito
        Swal.fire({
          icon: "success",
          title: "Nivel Bajado",
          text: "El nivel del usuario a subido a Administrador",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        }
        // Actualizar el nivel de acceso del usuario en la lista de usuarios
        
      })
      .catch((error) => {
        // Mostrar mensaje de error en caso de error en la petición
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al bajar de nivel al usuario. Por favor, inténtalo nuevamente.",
        });
      });
  };


  const cancelBajarNivel = () => {
    closeBajarNivelAlert();
  };

  const closeBajarNivelAlert = () => {
    Swal.close();
  };

  const handleEliminarUsuario = (userId, event) => {
    console.log("userId del botón clickeado:", userId);
    event.stopPropagation();
  
    console.log("userId from button click:", userId); // Add this line to log the userId
  
    if (userId === currentUserId) {
      // Mostrar mensaje de error si el usuario intenta eliminarse a sí mismo
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes eliminarte a ti mismo.",
      });
    } else {
      setSelectedUser(userId); // Set the selectedUser state to the ID of the user to be deleted
      showDeleteAlert();
    }
  };
  
  

  const handleSubirNivel = (userId, event) => {
    event.stopPropagation();

    // Verificar si el usuario actual es administrador y no puede subirse a sí mismo
    if (userId === currentUserId) {
      // Mostrar mensaje de error si el usuario intenta subir su propio nivel
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes subir tu propio nivel de acceso.",
      });
    } else {
      showConfirmationAlert(userId);
    }
  };

  const confirmEliminarUsuario = () => {
    console.log("Valor actual de selectedUser:", selectedUser);
    closeDeleteAlert();
  
    // Realizar la petición DELETE al servidor para eliminar el usuario
    axios
      .delete(`http://localhost:8081/Usuarios/${selectedUser}`)
      .then((res) => {
        if (res.data.Estatus === "Exitoso") {
          // Actualizar la lista de usuarios después de eliminar
          const updatedUsers = users.filter((user) => user.id_usuario !== selectedUser);
          setUsers(updatedUsers);
  
          // Mostrar la alerta de eliminación exitosa
          Swal.fire({
            icon: "success",
            title: "Usuario Eliminado",
            text: "El usuario ha sido eliminado exitosamente.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          // Mostrar mensaje de error si no se pudo eliminar el usuario
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el usuario. Por favor, inténtalo nuevamente.",
          });
        }
      })
      .catch((error) => {
        // Mostrar mensaje de error en caso de error en la petición
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El usuario tiene productos en su carrito, no se puede eliminar",
        });
      });
  };
  

  const confirmSubirNivel = (userId) => {
    closeConfirmationAlert();

    // Realizar la petición PUT al servidor para subir de nivel al usuario
    axios
      .put(`http://localhost:8081/SubirNivelUsuario/${userId}`, { nivel_acceso: "Administrador" })
      .then((respuesta) => {
        if (respuesta.data.Estatus === "Exitoso") {
          // Actualizar el nivel de acceso del usuario en la lista de usuarios
          const updatedUsers = users.map((user) =>
            user.id_usuario === userId ? { ...user, nivel_acceso: "Administrador" } : user
          );
          setUsers(updatedUsers);
          Swal.fire({
            icon: "success",
            title: "Nivel Subido",
            text: "El usuario ha sido subido de nivel exitosamente.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          // Mostrar mensaje de error si no se pudo subir de nivel al usuario
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo subir de nivel al usuario. Por favor, inténtalo nuevamente.",
          });
        }
      })
      .catch((error) => {
        // Mostrar mensaje de error en caso de error en la petición
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al subir de nivel al usuario. Por favor, inténtalo nuevamente.",
        });
      });
  };

  const cancelEliminarUsuario = () => {
    closeDeleteAlert();
    setSelectedUser(null);
  };

  const cancelSubirNivel = () => {
    closeConfirmationAlert();
  };

  const showDeleteAlert = () => {
    Swal.fire({
      title: "¿Eliminar Usuario?",
      text: "Esta acción eliminará el usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#dc3545",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmEliminarUsuario();
      } else {
        cancelEliminarUsuario();
      }
    });
  };

  const showConfirmationAlert = (userId) => {
    Swal.fire({
      title: "¿Subir de Nivel?",
      text: "¿Estás seguro de subir de nivel al usuario a administrador?",
      icon: "question",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sí, subir de nivel",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmSubirNivel(userId);
      } else {
        cancelSubirNivel();
      }
    });
  };

  const closeDeleteAlert = () => {
    Swal.close();
  };

  const closeConfirmationAlert = () => {
    Swal.close();
  };

  return (
    <div>
      <h2>DASHBOARD</h2>
      <div className={`card ${showUsers ? "expanded" : ""} bg-dark text-white`} onClick={handleToggleUsers} style={{ maxHeight: showUsers ? "500px" : "50px" }}>
        <h2>
          Usuarios Registrados ({totalUsuariosRegistrados})
        </h2>
        {showUsers && (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Contraseña</th>
                  <th>Nivel de Acceso</th>
                  <th>Subir de Nivel</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id_usuario}>
                    <td>{user.id_usuario}</td>
                    <td>{user.Nombre}</td>
                    <td>{user.Apellido}</td>
                    <td>{user.correo}</td>
                    <td>{user.contrasenia}</td>
                    <td>{user.nivel_acceso}</td>
                    <td>
                    {user.nivel_acceso === "Administrador" ? (
              <button className="btn btn-danger btn-sm" onClick={(event) => handleBajarNivel(user.id_usuario, event)}>
                <FaLevelDownAlt />
              </button>
            ) : (
              <button className="btn btn-success btn-sm" onClick={(event) => handleSubirNivel(user.id_usuario, event)}>
                <FaLevelUpAlt />
              </button>
            )} 
                    </td>
                    <td> <button className="btn btn-danger btn-sm" onClick={(event) => handleEliminarUsuario(user.id_usuario, event)}>
                <FaTrash />
              </button> </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default UsuariosRegistrados;
