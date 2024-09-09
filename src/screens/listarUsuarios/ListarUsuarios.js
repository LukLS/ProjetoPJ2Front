import React, { useState, useEffect, useRef } from "react";
import "./ListarUsuarios.css";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function ListarUsuario() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const dataGridRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [advogadosResponse, clientesResponse, associadosResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/advogado'),
          axios.get('http://localhost:8080/api/cliente'),
          axios.get('http://localhost:8080/api/associado')
        ]);

        const advogados = advogadosResponse.data.map(item => ({
          ...item,
          tipo: 'Advogado',
          id: `advogado-${item.id}`,
          email: item.login
        }));

        const clientes = clientesResponse.data.map(item => ({
          ...item,
          tipo: 'Cliente',
          id: `cliente-${item.id}`,
          email: item.email
        }));

        const associados = associadosResponse.data.map(item => ({
          ...item,
          tipo: 'Associado',
          id: `associado-${item.id}`,
          email: item.login
        }));

        const combinedRows = [...advogados, ...clientes, ...associados];

        setRows(combinedRows);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getFilteredRows = () => {
    return rows.filter(row => {
      const matchesFilter = filter === 'Todos' || row.tipo === filter;
      const matchesSearch = row.nome.toLowerCase().includes(search.toLowerCase()) || row.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 180 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 250,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 180,
    },
  ];

  useEffect(() => {
    if (dataGridRef.current && dataGridRef.current.querySelector('.MuiDataGrid-virtualScroller')) {
      dataGridRef.current.querySelector('.MuiDataGrid-virtualScroller').scrollTop = 0;
    }
  }, [filter, search]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <div style={{ marginTop: '100px' }}>
              <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #838383', borderRadius: '5px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <TextField
                    label="Buscar"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    size="small"
                    style={{ height: '40px', width: '280px' }}
                  />
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="filtro"
                      name="filtro"
                      value={filter}
                      onChange={handleFilterChange}
                      style={{marginLeft:'-700px'}}
                    >
                      <FormControlLabel style={{width: 100}} value="Todos" control={<Radio />} label="Todos" />
                      <FormControlLabel style={{width: 150}} value="Associado" control={<Radio />} label="Associado" />
                      <FormControlLabel style={{width: 150}} value="Advogado" control={<Radio />} label="Advogado" />
                      <FormControlLabel style={{width: 150}} value="Cliente" control={<Radio />} label="Cliente" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                {loading ? (
                  <p>Carregando...</p>
                ) : (
                  <Box ref={dataGridRef} sx={{ height: 400, width: '100%', overflowY: 'auto' }}>
                    <DataGrid
                      rows={getFilteredRows()}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 20]}
                      disableSelectionOnClick
                    />
                  </Box>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
