import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Inicio1 from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Categorias2 from './pages/Categorias';
import Contacto3 from './pages/Contacto';
import Formulario from './pages/Sesion';
import Dashboard from './Admin/Dashboard';
import Registro from './pages/Registro';
import Productos from './pages/Productos';
import jwt_decode from "jwt-decode";

function App() {
    const [autenticado, setAutenticado] = useState(false);
    const [nivelAcceso, setNivelAcceso] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const nivelAcceso = decodedToken.nivelAcceso;
    setNivelAcceso(nivelAcceso);
    setAutenticado(true);
  } else {
    setAutenticado(false);
  }
}, []);

return (
  <Router>
    <Routes>
      <Route path="/" element={<Inicio1 />} />
      <Route path="/Nosotros" element={<Nosotros />} />
      <Route path="/Categorias" element={<Categorias2 />} />
      <Route path="/Contacto" element={<Contacto3 />} />
      <Route path="/InicioSesion" element={<Formulario />} />
      <Route path="/Registro" element={<Registro />}/>
      <Route path="/Producto/:id" element={<Productos />} />
      <Route path="/Dashboard" element={(<Dashboard/>)}/>
    </Routes>
  </Router>
);
}


export default App;
