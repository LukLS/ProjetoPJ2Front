import React from "react";

const UfcTable = (props) => {
    const rows = props.ufc.map((ufc) => {
      const lutadorItems = ufc.lutaPrincipal.map((lutador) => (
        <li key={lutador.id}>
          {lutador.nome} - {lutador.cartel}
        </li>
      ));
  
      return (
        <tr key={ufc.id}>
          <td>{ufc.id}</td>
          <td>{ufc.edicao}</td>
          <td>
            <ul>{lutadorItems}</ul>
          </td>
          <td>
            <button
              type="button"
              title="Editar"
              className="btn btn-primary"
              onClick={(e) => props.edit(ufc.id)}
            >
              <i className="pi pi-pencil"></i>
            </button>
            <button
              type="button"
              title="Excluir"
              className="btn btn-danger"
              onClick={(e) => props.delete(ufc.id)}
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
            <th scope="col">Edicao</th>
            <th scope="col">lutaPrincipal</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

export default UfcTable;
