import React from "react";

const Pedidos = ({ showPedidos, totalPedidos, pedidos, handleTogglePedidos }) => {
  return (
    <div>
      <h2>PEDIDOS</h2>
      <div className="card bg-dark text-white">
        <h2>Pedidos Registrados ({totalPedidos})</h2>
        {pedidos.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Id Pedido</th>
                  <th>Nombre Producto</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((order) => (
                  <tr key={order.id_pedido}>
                    <td>{order.id_pedido}</td>
                    <td>{order.nombre_producto}</td>
                    <td>{order.cantidad}</td>
                    <td>{order.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pedidos.length === 0 && <p>No hay pedidos registrados.</p>}
      </div>
    </div>
  );
};

export default Pedidos;
