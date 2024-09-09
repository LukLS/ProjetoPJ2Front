import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, ButtonGroup, Snackbar, Alert, Chip, Box, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/lab/Autocomplete";

const statusOptions = [
  { value: 'ATIVO', label: 'Ativo' },
  { value: 'INATIVO', label: 'Inativo' },
  { value: 'PENDENTE', label: 'Pendente' },
  { value: 'CONCLUIDO', label: 'Concluído' }
];

const FormField = ({ label, value, onChange, error, helperText, multiline, rows, type, options }) => (
  <Box sx={{ marginBottom: 2 }}>
    <div style={{ color: '#838383', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', width: 200 }}>
      {label}
    </div>
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      multiline={multiline}
      rows={rows}
      type={type}
      select={!!options}
      sx={{
        width: '250px',
        '& .MuiInputBase-root': {
          padding: '0 14px',
          '& input, & textarea': {
            padding: '30',
            fontSize: '13px',
          },
        },
        '& .MuiFilledInput-root': {
          padding: '0',
        },
      }}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    >
      {options && options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

const Projetos = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    titulo: '',
    descricao: '',
    prazo: '',
    registroReceita: '',
    clienteId: '', 
    status: '',
    descricaoStatus: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [tags, setTags] = useState([]);
  const [clientes, setClientes] = useState([]);
  const tagInputRef = useRef(null);

  useEffect(() => {
    // Carregar clientes ao montar o componente
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cliente");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (campo) => (event, newValue) => {
    if (campo === 'clienteId') {
      setState({ ...state, clienteId: newValue ? newValue : null });
    } else {
      setState({ ...state, [campo]: event.target.value });
    }
  };

  const handleTagChange = (event, newValue) => {
    setTags(newValue);
    if (tagInputRef.current) {
      setTimeout(() => {
        tagInputRef.current.focus();
      }, 100);
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!state.titulo) newErrors.titulo = 'Titulo é obrigatório';
    if (!state.descricao) newErrors.descricao = 'Descrição é obrigatória';
    if (!state.prazo) newErrors.prazo = 'Prazo é obrigatório';
    if (!state.registroReceita) newErrors.registroReceita = 'Registro é obrigatório';
    if (!state.clienteId) newErrors.clienteId = 'Cliente é obrigatório';
    if (!state.status) newErrors.status = 'Status é obrigatório';
    if (!state.descricaoStatus) newErrors.descricaoStatus = 'Descrição do Status é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const salvar = async () => {
    if (!validateFields()) {
      setSnackbarMessage("Preencha todos os campos obrigatórios.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    const processo = {
      titulo: state.titulo,
      descricao: state.descricao,
      prazo: state.prazo,
      registroReceita: state.registroReceita,
      tag: tags,
      status: state.status,
      historico: [],
      cliente: state.clienteId,
      files: []
    };
    
    try {
      const response = await fetch('http://localhost:8080/api/processo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(processo)
      });
  
      if (response.ok) {

        setSnackbarMessage("Processo salvo com sucesso!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
  
        // Resetar os campos do formulário
        setState({
          titulo: '',
          descricao: '',
          prazo: '',
          registroReceita: '',
          clienteId: '', 
          status: '',
          descricaoStatus: ''
        });
        setTags([]);
  
      } else {
        setSnackbarMessage("Erro ao salvar o processo.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Erro ao salvar o processo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  

  const cancel = () => {
    console.log('cancel');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <div style={{ marginTop: '80px' }}>
              <ButtonGroup style={{ height: '30px' }} variant="contained" aria-label="Basic button group">
                <Button style={{ backgroundColor: 'grey', fontSize: 10, width: 120 }}>Processos</Button>
                <Button style={{ backgroundColor: 'white', color: 'grey', fontSize: 10, width: 120 }} onClick={() => navigate("/sessao/status")}>Status</Button>
                <Button style={{ backgroundColor: 'white', color: 'grey', fontSize: 10, alignItems: 'center', width: 120 }} onClick={() => navigate("/sessao/anexos")}>Anexos</Button>
              </ButtonGroup>
              <div style={{ width: 1100, height: 470, background: 'white', border: '2px #838383 solid' }}>
                <Grid container spacing={3} style={{ marginTop: '25px', padding: '0 30px' }}>
                  <Grid item xs={6}>
                    <FormField
                      label="TITULO"
                      value={state.titulo}
                      onChange={handleChange('titulo')}
                      error={!!errors.titulo}
                      helperText={errors.titulo}
                    />
                    <FormField
                      label="DESCRIÇÃO"
                      value={state.descricao}
                      onChange={handleChange('descricao')}
                      error={!!errors.descricao}
                      helperText={errors.descricao}
                      multiline
                      rows={4}
                    />
                    <FormField
                      label="PRAZO"
                      value={state.prazo}
                      onChange={handleChange('prazo')}
                      error={!!errors.prazo}
                      helperText={errors.prazo}
                      type="date"
                    />
                    <FormField
                      label="REGISTRO DA RECEITA FEDERAL"
                      value={state.registroReceita}
                      onChange={handleChange('registroReceita')}
                      error={!!errors.registroReceita}
                      helperText={errors.registroReceita}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ marginBottom: 2 }}>
                      <div style={{ color: '#838383', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', width: 200 }}>TAGS</div>
                      <Autocomplete
                        multiple
                        freeSolo
                        options={[]}
                        value={tags}
                        onChange={handleTagChange}
                        renderTags={() => null}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputRef={tagInputRef}
                            variant="filled"
                            hiddenLabel
                            size="small"
                            sx={{
                              width: '250px',
                              '& .MuiInputBase-root': {
                                height: '32px',
                                padding: '0 14px',
                                '& input': {
                                  height: '20px',
                                  padding: '0',
                                  fontSize: '13px',
                                },
                              },
                            }}
                          />
                        )}
                      />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: '8px' }}>
                        {tags.map((tag, index) => (
                          <Chip key={index} label={tag} onDelete={handleDeleteTag(tag)} />
                        ))}
                      </Box>
                    </Box>
                    <Autocomplete
                    options={clientes}
                    getOptionLabel={(option) => option.nome} 
                    isOptionEqualToValue={(option, value) => option.id === value} 
                    onChange={(event, newValue) => handleChange('clienteId')(event, newValue ? newValue.id : null)}
                    value={clientes.find(cliente => cliente.id === state.clienteId) || null}
                    renderInput={(params) => (
                    <TextField
                    {...params}
                    variant="filled"
                    hiddenLabel
                    size="small"
                    sx={{
                    width: '250px',
                    '& .MuiInputBase-root': {
                    height: '32px',
                    padding: '0 14px',
                    '& input': {
                    height: '20px',
                    padding: '0',
                    fontSize: '13px',
                      },
                        },
                          }}
                      />
                          )}
                      />
                    <FormField
                      label="STATUS"
                      value={state.status}
                      onChange={handleChange('status')}
                      error={!!errors.status}
                      helperText={errors.status}
                      options={statusOptions}
                    />
                    <FormField
                      label="DESCRIÇÃO STATUS"
                      value={state.descricaoStatus}
                      onChange={handleChange('descricaoStatus')}
                      error={!!errors.descricaoStatus}
                      helperText={errors.descricaoStatus}
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button onClick={cancel} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey' }}>Cancelar</Button>
                <Button onClick={salvar} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey', marginLeft: '850px' }}>Salvar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Projetos;