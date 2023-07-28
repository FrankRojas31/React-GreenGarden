import React from "react";
import Categorias from "../components/Categorias";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Categorias_2() {

  return (
      <>
        <Header />
        <h2 className="text-center mt-4">CATEGORIAS</h2>
        <Categorias />
        <Footer />
      </>
  );
}

export default Categorias_2;
