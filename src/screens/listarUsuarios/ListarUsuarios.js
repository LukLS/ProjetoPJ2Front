import React from "react";
import "./ListarUsuarios.css";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default class ListarUsuario extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/api/advogado');
      this.setState({ rows: response.data, loading: false });
      console.log("ENTROU AQUI")
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { rows, loading } = this.state;

    const columns = [
      { field: 'id', headerName: 'User', width: 90 },
      {
        field: 'user',
        headerName: <span style={{ fontWeight: 'bold' }}>User</span>,
        width: 150,
        editable: true,
        valueGetter: (value, row) => `${row.nome}`,
      },
      {
        field: 'email',
        headerName: <span style={{ fontWeight: 'bold' }}>Email</span>,
        width: 150,
        editable: true,
        valueGetter: (value, row) => `${row.login}`,
      },
      {
        field: 'Idade',
        headerName: <span style={{ fontWeight: 'bold' }}>Tipo</span>,
        type: 'number',
        width: 110,
        editable: true,
        valueGetter: (value, row) => `${row.filiacao}`,

      },
    ];

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <div style={{ marginTop: '70px' }}>
                {loading ? (
                  <p>Carregando...</p>
                ) : (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
