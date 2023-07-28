import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import path from 'path';

const app=express();
app.use(cors());
app.use(express.json())

const conexion=mysql.createConnection({
    server:'localhost',
    user:'root',
    password:'',
    database:'green_garden_2'
});

app.listen(8081,()=>{
    console.log("Servidor Iniciando...");
    console.log("")
});

conexion.connect(function(error) {
    if (error) {
        console.log("No fue posible la conexión");
        console.log("Error: " + error.message);
        console.log("Verifica tus credenciales y la configuración de la base de datos.");
        console.log("¡Inténtalo nuevamente más tarde!");
    } else {
        console.log("¡Conexión exitosa!");
        console.log("Explora, consulta y actualiza los datos con confianza.");
        console.log("");
        console.log("Recuerda cerrar la conexión al finalizar tus operaciones:");
        console.log("conexion.end();");
    }
});

app.get('/Usuarios', (peticion,respuesta) => {
    const sql ="SELECT * FROM usuarios";
    conexion.query(sql, (error,resultado) => {
      if (error) {
        return respuesta.status(500).json({ Error: "Error en la consulta de usuarios" });
      }
      return respuesta.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
});
});

app.get('/CategoriasDash', (peticion, respuesta) => {
  const sql = "SELECT * FROM Categorias";
  conexion.query(sql, (error, resultado) => {
      if (error) {
          return respuesta.status(500).json({ Error: "Error en la consulta de categorías" });
      }
      return respuesta.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
  });
});

app.get('/Categorias', (peticion, respuesta) => {
    const sql = "SELECT * FROM Categorias WHERE estatus=1";
    conexion.query(sql, (error, resultado) => {
        if (error) {
            return respuesta.status(500).json({ Error: "Error en la consulta de categorías" });
        }
        return respuesta.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
    });
});

app.get('/ProductosSelect/:id', (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM productos WHERE cat_id = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) {
      return respuesta.json({ Error: "Error en la Consulta de Productos" });
    }
    return respuesta.json({ Estatus: "Exitoso", Resultado: resultado });
  });
});


app.get('/RevisarId/:id', (req, res) => {
  const id_usuario = req.params.id;
  const sql = "SELECT nivel_acceso FROM usuarios WHERE id_usuario = ?";
  conexion.query(sql, [id_usuario], (error, resultado) => {
    if (error) {
      console.error("Error al consultar nivel_acceso:", error);
      return res.status(500).json({ Error: "Error al consultar nivel_acceso" });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ Error: "Usuario no encontrado" });
    }

    const nivelAcceso = resultado[0].nivel_acceso;
    return res.status(200).json({ Estatus: "Exitoso", nivelAcceso });
  });
});



app.get('/Dashboard', (peticion, respuesta) => {
    const sql = "SELECT * FROM Categorias";
    conexion.query(sql, (error, resultado) => {
        if (error) {
            return respuesta.status(500).json({ Error: "Error en la consulta de categorías" });
        }
        return respuesta.status(200).json({ Estatus: "Exitoso", Resultado: resultado });
    });
});

const almacenamiento2 = multer.diskStorage({
  destination: (req, archivo, funcion) => {
    funcion(null, '../frontend/src/images');
  },
  filename: (req, archivo, funcion) => {
    funcion(null, archivo.originalname + path.extname(archivo.originalname));
  }
});

const subirFoto2 = multer({
  storage: almacenamiento2
});

app.post("/CategoriasInsert", subirFoto2.single('imagen'), (req, res) => {
  const { nombre, descripcion, estatus } = req.body;
  const imagen = req.file.filename;

  // Realizar la consulta para insertar la nueva categoría
  const query = "INSERT INTO categorias (categoria, descripcion, imagen, estatus) VALUES (?, ?, ?, ?)";
  const values = [nombre, descripcion, imagen, estatus];

  // Ejecutar la consulta
  conexion.query(query, values, (error, results) => {
    if (error) {
      console.error("Error al agregar la categoría: ", error);
      res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar la categoría" });
    } else {
      res.json({ Estatus: "Exitoso", Mensaje: "Categoría agregada exitosamente" });
    }
  });
});


const almacenamiento = multer.diskStorage({
  destination: (req, archivo, funcion) => {
    funcion(null, '../frontend/src/images');
  },
  filename: (req, archivo, funcion) => {
    funcion(null, archivo.originalname + path.extname(archivo.originalname));
  }
});

const imageFilter = (req, file, funcion) => {
  // Verificar si el archivo es una imagen
  if (file.mimetype.startsWith('image/')) {
    funcion(null, true);
  } else {
    // Si no es una imagen, rechazar el archivo
    funcion(new Error('El archivo debe ser una imagen válida.'), false);
  }
};

const subirFoto = multer({
  storage: almacenamiento,
  fileFilter: imageFilter // Agregar la función de validación al middleware multer
});
  
  app.post("/ProductosInsert", subirFoto.single('imagen'), (req, res) => {
    const query = "INSERT INTO productos (prod_nom, cat_id, descripcion, estatus, TOP, imagen, precio) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.prodNom,
      req.body.catId,
      req.body.descripcion,
      req.body.estatus,
      req.body.top,
      req.file.filename,
      req.body.precio
    ];
  
    // Ejecutar la consulta
    conexion.query(query, values, (error, results) => {
      if (error) {
        console.error("Error al agregar el producto: ", error);
        res.status(500).json({ Estatus: "Error", Mensaje: "Error al agregar el producto" });
      } else {
        res.json({ Estatus: "Exitoso", Mensaje: "Producto agregado exitosamente" });
      }
    });
  });
  
 
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "../frontend/src/images");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname + path.extname(file.originalname));
    },
  });
  
  const imagFilter = (req, file, callback) => {
    // Verificar si el tipo MIME del archivo es una imagen
    if (file.mimetype.startsWith("image/")) {
      // Aceptar el archivo, lo almacenará
      callback(null, true);
    } else {
      // Rechazar el archivo, no lo almacenará
      callback(new Error("El archivo no es una imagen válida"), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: imagFilter, // Cambiar "imagFilter" a "imageFilter"
  });
  
  app.put("/Categorias/:id", upload.single("imagen"), (req, res) => {
    const idCategoria = req.params.id;
    const { nombre, descripcion, estatus } = req.body;
  
    // Verificar si se agregó una imagen en la solicitud
    let imagenPath = null; // Inicializamos la variable imagenPath como null

  if (req.file) {
    imagenPath = req.file.filename; // Si se seleccionó una nueva imagen, asignamos su nombre
  }
  
    const query = "UPDATE categorias SET categoria = ?, descripcion = ?, imagen = IFNULL(?, imagen), estatus = ? WHERE id_cat = ?";
    const values = [nombre, descripcion, imagenPath, estatus, idCategoria];
  
    conexion.query(query, values, (error, results) => {
      if (error) {
        console.error("Error al modificar la categoría: ", error);
        res.status(500).json({ Estatus: "Error", Mensaje: "Error al modificar la categoría" });
      } else {
        res.json({ Estatus: "Exitoso", Mensaje: "Categoría modificada exitosamente" });
      }
    });
  });

const imageFileFilter = (req, file, callback) => {
  // Verificar si el tipo MIME del archivo es una imagen
  if (file.mimetype.startsWith('image/')) {
    // Aceptar el archivo, lo almacenará
    callback(null, true);
  } else {
    // Rechazar el archivo, no lo almacenará
    callback(new Error('El archivo no es una imagen válida'), false);
  }
};

const storageProductos = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../frontend/src/images/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + path.extname(file.originalname));
  }
});

const uploadProductos = multer({
  storage: storageProductos,
  fileFilter: imageFileFilter, // Agregar el filtro de archivos de imágenes
});

app.put("/Productos/:id", uploadProductos.single('imagen'), (req, res) => {
  const idProducto = req.params.id;
  const { nombre, cat_id, descripcion, estatus, top, precio } = req.body;

  let imagenPath = null; // Inicializamos la variable imagenPath como null

  if (req.file) {
    imagenPath = req.file.filename; // Si se seleccionó una nueva imagen, asignamos su nombre
  }

  const query = "UPDATE productos SET prod_nom = ?, cat_id = ?, descripcion = ?, imagen = IFNULL(?, imagen), estatus = ?, top = ?, precio = ? WHERE id_prod = ?";
  const values = [nombre, cat_id, descripcion, imagenPath, estatus, top, precio, idProducto];

  conexion.query(query, values, (error, results) => {
    if (error) {
      console.error("Error al modificar el producto: ", error);
      res.status(500).json({ Estatus: "Error", Mensaje: "Error al modificar el producto" });
    } else {
      res.json({ Estatus: "Exitoso", Mensaje: "Producto modificado exitosamente" });
    }
  });
});

  app.post("/Registro", (req, res) => {
    const { nombre, apellido, correo, contrasenia } = req.body;
    const nivel_acceso = "Usuario";
  
    const sql = "INSERT INTO usuarios (nombre, apellido, correo, contrasenia, nivel_acceso) VALUES (?, ?, ?, ?, ?)";
    const values = [nombre, apellido, correo, contrasenia, nivel_acceso];
  
    // Ejecutar la consulta
    conexion.query(sql, values, (error, results) => {
      if (error) {
        console.error("Error al registrar el usuario: ", error);
        res.status(500).json({ Estatus: "Error", Mensaje: "Error al registrar el usuario" });
      } else {
        res.json({ Estatus: "Exitoso", Mensaje: "Usuario registrado exitosamente" });
      }
    });
  });
  

app.delete("/Categorias/:id", (req, res) => {
    const idCategoria = req.params.id;

    // Realizar la consulta para eliminar la categoría por su ID
    const query = "DELETE FROM categorias WHERE id_cat = ?";
    const values = [idCategoria];
    // Ejecutar la consulta
    conexion.query(query, values, (error, results) => {
      if (error) {
        console.error("Error al eliminar la categoría: ", error);
        res.status(500).json({ Estatus: "Error", Mensaje: "Error al eliminar la categoría" });
      } else {
        res.json({ Estatus: "Exitoso", Mensaje: "Categoría eliminada exitosamente" });
      }
    });
  });

app.delete("/Productos/:id", (req, res) => {
    const idProducto = req.params.id;
  
    // Realizar la consulta para eliminar el producto por su ID
    const query = "DELETE FROM productos WHERE id_prod = ?";
    const values = [idProducto];
    
    // Ejecutar la consulta
    conexion.query(query, values, (error, results) => {
      if (error) {
        console.error("Error al eliminar el producto: ", error);
        res.status(500).json({ Estatus: "Error", Mensaje: "Error al eliminar el producto" });
      } else {
        res.json({ Estatus: "Exitoso", Mensaje: "Producto eliminado exitosamente" });
      }
    });
  });
  
  app.get("/verificarCorreo/:correo", (req, res) => {
    const correo = req.params.correo;
  
    // Consulta SQL para verificar si el correo existe en la tabla de usuarios
    const sql = "SELECT COUNT(*) AS count FROM usuarios WHERE correo = ?";
  
    conexion.query(sql, [correo], (error, results) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error.message);
        return res.status(500).json({ Estatus: "Error", Mensaje: "Error en el servidor." });
      }
  
      const count = results[0].count;
  
      if (count > 0) {
        // El correo ya está registrado
        res.json(true);
      } else {
        // El correo no está registrado
        res.json(false);
      }
    });
  });
  
app.post("/verificar", (peticion, respuesta) => {
    const { id_usuario, Correo } = peticion.body;
    const arrValores = [Correo, id_usuario];
    const sql ="SELECT * FROM usuarios WHERE correo = ? AND id_usuario= ?";
    conexion.query(sql, arrValores, (error, resultado) => {
        if (error) return respuesta.json({ Error: "Error en la consulta" });
        return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
    });
});

app.post("/Sesion", (peticion, respuesta) => {
  const { Correo, Contrasenia } = peticion.body;
  const arrValores = [Correo, Contrasenia];
  const sql = "SELECT * FROM Usuarios WHERE correo = ? AND contrasenia = ?";
  conexion.query(sql, arrValores, (error, resultado) => {
    if (error) return respuesta.json({ Error: "Error en la consulta" });
    if (resultado.length > 0) {
      const usuario = resultado[0];
      const token = jwt.sign({ 
        id_usuario: usuario.id_usuario, 
        correo: Correo, 
        nivelAcceso: usuario.nivel_acceso,
        imagen_usuario: usuario.imagen_usuario,
        nombre_usuario: usuario.Nombre
      }, "secreto");
      return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado, token });
    } else {
      return respuesta.json({ Estatus: "ERROR", Mensaje: "El correo o la contraseña son incorrectos" });
    }
  });
});

app.get('/Producto', (peticion, respuesta) => {
  const sql = "SELECT * FROM productos";
  conexion.query(sql, (error, resultado) => {
      if (error) {
          return respuesta.json({ Error: "Error en la Consulta de Productos" });
      }
      return respuesta.json({ Estatus: "Exitoso", Resultado: resultado });
  });
});


app.get('/Productos', (peticion, respuesta) => {
    const sql = "SELECT * FROM productos WHERE estatus=1 AND top=1";
    conexion.query(sql, (error, resultado) => {
        if (error) {
            return respuesta.json({ Error: "Error en la Consulta de Productos" });
        }
        return respuesta.json({ Estatus: "Exitoso", Resultado: resultado });
    });
});

app.post("/carrito", (req, res) => {
  const { usuario_id, producto_id, precio, cantidad } = req.body;

  // Verificar si el producto ya existe en el carrito del usuario
  const selectQuery = 'SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?';
  conexion.query(selectQuery, [usuario_id, producto_id], (error, result) => {
    if (error) {
      console.error("Error al verificar el producto en el carrito", error);
      res.status(500).json({ message: "Ocurrió un error al verificar el producto en el carrito" });
    } else {
      if (result.length > 0) {
        // Si el producto ya existe, actualizar cantidad y precio
        const updateQuery = 'UPDATE carrito SET cantidad = cantidad + ?, precio = precio + ? WHERE usuario_id = ? AND producto_id = ?';
        conexion.query(updateQuery, [cantidad, precio * cantidad, usuario_id, producto_id], (error, result) => {
          if (error) {
            console.error("Error al actualizar el producto en el carrito", error);
            res.status(500).json({ message: "Ocurrió un error al actualizar el producto en el carrito" });
          } else {
            res.json({ message: "Producto agregado al carrito" });
          }
        });
      } else {
        // Si el producto no existe, insertar nuevo registro en el carrito
        const insertQuery = 'INSERT INTO carrito (usuario_id, producto_id, precio, cantidad) VALUES (?, ?, ?, ?)';
        conexion.query(insertQuery, [usuario_id, producto_id, precio * cantidad, cantidad], (error, result) => {
          if (error) {
            console.error("Error al agregar el producto al carrito", error);
            res.status(500).json({ message: "Ocurrió un error al agregar el producto al carrito" });
          } else {
            res.json({ message: "Producto agregado al carrito" });
          }
        });
      }
    }
  });
});

app.get('/carrito/:Idusuario', (req, res) => {
  const Idusuario = req.params.Idusuario;
  conexion.query('SELECT * FROM vista_carrito WHERE usuario_id = ?', [Idusuario], (err, results) => {
    if (err) {
      console.error('Error al obtener productos del carrito', err);
      return res.status(500).json({ message: 'Error al obtener productos del carrito' });
    }
    res.status(200).json(results);
  });
});

app.post('/Contacto', (req, res) => {
  const { nombre, CorreoElectronico, Mensaje } = req.body;
  conexion.query('INSERT INTO Contacto (nombre, correo_electronico, mensaje) VALUES (?, ?, ?)', [nombre, CorreoElectronico, Mensaje], (err, result) => {
    if (err) {
      console.error('Error al agregar el contacto', err);
      return res.status(500).json({ message: 'Error al agregar el contacto' });
    }
    res.status(200).json({ message: 'Mensaje de contacto agregado correctamente' });
  });
});

app.get('/ContactoTable', (req, res) => {
  const selectQuery = 'SELECT * FROM Contacto';

  conexion.query(selectQuery, (error, results) => {
    if (error) {
      console.error("Error al obtener los registros de la tabla Contacto", error);
      res.status(500).json({ message: "Ocurrió un error al obtener los registros de la tabla Contacto" });
    } else {
      res.json(results);
    }
  });
});

app.delete('/EliminarProdCarrito/:productoId', (req, res) => {
  const productoId = req.body.productoId;
  const usuarioId = req.body.usuarioId; // Suponiendo que obtienes el ID del usuario de la solicitud, puedes accederlo como req.user.id
  const deleteQuery = 'DELETE FROM carrito WHERE producto_id = ? AND usuario_id = ?';

  conexion.query(deleteQuery, [productoId, usuarioId], (error, result) => {
    if (error) {
      console.error("Error al eliminar el producto del carrito", error);
      res.status(400).json({ message: "Ocurrió un error al eliminar el producto del carrito" });
    } else if (result.affectedRows > 0) {
      res.json({ message: `El producto con ID ${productoId} ha sido eliminado del carrito` });
    } else {
      res.status(404).json({ message: `No se encontró el producto con ID ${productoId} en el carrito del usuario` });
    }
  });
});

app.put('/DisminuirCantidadCarrito/:productoId', (req, res) => {
  const productoId = req.params.productoId;
  const usuarioId = req.params.usuarioId;

  const updateQuery = 'UPDATE carrito SET cantidad = cantidad - 1 WHERE producto_id = ? AND usuario_id = ?';

  conexion.query(updateQuery, [productoId, usuarioId], (error, result) => {
    if (error) {
      console.error("Error al disminuir la cantidad del producto en el carrito", error);
      res.status(400).json({ message: "Ocurrió un error al disminuir la cantidad del producto en el carrito" });
    } else if (result.affectedRows > 0) {
      res.json({ message: `Se disminuyó la cantidad del producto con ID ${productoId} en el carrito del usuario` });
    } else {
      res.status(404).json({ message: `No se encontró el producto con ID ${productoId} en el carrito del usuario` });
    }
  });
});

app.put('/SubirNivelUsuario/:usuarioId', (req, respuesta) => {
  const usuarioId = req.params.usuarioId;

  const updateQuery = 'UPDATE usuarios SET nivel_acceso = "Administrador" WHERE id_usuario = ?';

  conexion.query(updateQuery, [usuarioId], (error, result) => {
    if (error) {
      console.error('Error al subir de nivel al usuario', error);
      res.status(400).json({ message: 'Ocurrió un error al subir de nivel al usuario' });
    } else if (result.affectedRows > 0) {
      respuesta.json({Estatus: "Exitoso", message: `Se subió de nivel al usuario con ID ${usuarioId}` });
    } else {
      res.status(404).json({ message: `No se encontró el usuario con ID ${usuarioId}` });
    }
  });
});

// Ruta para bajar de nivel al usuario
app.put('/BajarNivelUsuario/:usuarioId', (req, res) => {
  const usuarioId = req.params.usuarioId;

  const updateQuery = 'UPDATE usuarios SET nivel_acceso = "Usuario" WHERE id_usuario = ?';

  conexion.query(updateQuery, [usuarioId], (error, result) => {
    if (error) {
      console.error('Error al bajar de nivel al usuario', error);
      res.status(400).json({ Estatus: "Error", message: 'Ocurrió un error al bajar de nivel al usuario' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ Estatus: "Exitoso", message: `Se bajó de nivel al usuario con ID ${usuarioId}` });
      } else {
        res.status(404).json({ Estatus: "Error", message: `No se encontró el usuario con ID ${usuarioId}` });
      }
    }
  });
});

app.delete('/Usuarios/:usuarioId', (req, res) => {
  const usuarioId = req.params.usuarioId;

  const deleteQuery = 'DELETE FROM usuarios WHERE id_usuario = ?';

  conexion.query(deleteQuery, [usuarioId], (error, result) => {
    if (error) {
      console.error('Error al eliminar el usuario', error);
      res.status(400).json({ Estatus: "Error", message: 'Ocurrió un error al eliminar el usuario' });
    } else {
      if (result.affectedRows > 0) {
        res.json({ Estatus: "Exitoso", message: `Usuario con ID ${usuarioId} eliminado correctamente` });
      } else {
        res.status(404).json({ Estatus: "Error", message: `No se encontró el usuario con ID ${usuarioId}` });
      }
    }
  });
});













