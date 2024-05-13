import React from "react";

const UsersTable = (props) => {
  const rows = props.lutadores.map((lutadores) => {
    return (
      <tr key={lutadores.id}>
        <td>{lutadores.id}</td>
        <td>{lutadores.nome}</td>
        <td>{lutadores.cartel}</td>
        <td>
          <button
            type="button"
            title="Editar"
            className="btn btn-primary"
            onClick={(e) => props.edit(lutadores.id)}
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            type="button"
            title="Excluir"
            className="btn btn-danger"
            onClick={(e) => props.delete(lutadores.id)}
          >
            <i className="pi pi-trash"></i>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col">Cartel</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default UsersTable;
