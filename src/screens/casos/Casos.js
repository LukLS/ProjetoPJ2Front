import React, { useState, useEffect } from "react";
import "./Casos.css";
import TextField from '@mui/material/TextField';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Casos = () => {
  const [processos, setProcessos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [clienteFilter, setClienteFilter] = useState('');

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/processo');
        setProcessos(response.data);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cliente');
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchProcessos();
    fetchClientes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const handleClienteChange = (event) => {
    setClienteFilter(event.target.value);
  };

  const filteredProcessos = processos.filter(processo => {
    const matchesTitulo = processo.titulo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterQuery || processo.status === filterQuery;
    const matchesCliente = !clienteFilter || processo.cliente === clienteFilter;

    return matchesTitulo && matchesStatus && matchesCliente;
  });

  return (
    <div className="container mt-5 casos-page">
      <div style={{ marginTop: '70px' }}>
        <div className="row">
          {/* Lado Esquerdo - Pesquisa e Filtros */}
          <div className="col-md-3 mb-4">
            <div className="filter-label">Título</div>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              fullWidth
              onChange={handleSearchChange}
              sx={{ width: '90%', marginTop: '10px' }}
            />

            <div className="filter-label">Status</div>
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              fullWidth
              onChange={handleFilterChange}
              sx={{ width: '90%', marginTop: '10px' }}
            />

            <div className="filter-label">Cliente</div>
            <TextField
              select
              value={clienteFilter}
              onChange={handleClienteChange}
              variant="filled"
              size="small"
              fullWidth
              sx={{ width: '90%', marginTop: '10px' }}
            >
              <MenuItem value="">Todos os Clientes</MenuItem>
              {clientes.map(cliente => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* Barra Vertical Cinza */}
          <div className="col-md-1">
            <div style={{ width: '8px', backgroundColor: '#f0f0f0', height: '100%', margin: '0 auto' }}></div>
          </div>

          {/* Lado Direito - Card de Processos */}
          <div className="col-md-8">
            {filteredProcessos.length > 0 ? (
              filteredProcessos.map(processo => {
                const clienteNome = clientes.find(cliente => cliente.id === processo.cliente)?.nome || "Cliente não encontrado";
                return (
                  <Card key={processo.id} className="mb-4" sx={{ backgroundColor: '#f0f0f0' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="body1" sx={{ color: '#4a4a4a' }}>
                            Cliente:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#4a4a4a' }}>
                            {clienteNome}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: 'bold', color: '#4a4a4a' }}>
                            {processo.titulo}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6a6a6a' }}>
                            {processo.descricao}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} textAlign="right">
                          <Typography variant="body2" sx={{ color: '#6a6a6a' }}>
                            Prazo:
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6a6a6a' }}>
                            {new Date(processo.prazo).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Typography variant="body1">Nenhum processo encontrado.</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casos;
