import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, ButtonGroup, Snackbar, Alert, Chip, Box, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/lab/Autocomplete";
import "./Projetos.css";

const STATUS_OPTIONS = [
  { value: 'ATIVO', label: 'Ativo' },
  { value: 'INATIVO', label: 'Inativo' },
  { value: 'PENDENTE', label: 'Pendente' },
  { value: 'CONCLUIDO', label: 'Concluído' }
];

const INITIAL_STATE = {
  titulo: '',
  descricao: '',
  prazo: '',
  registroReceita: '',
  clienteId: '',
  status: '',
  descricaoStatus: ''
};

// Componente reaproveitável de Campo de Formulário
const FormField = ({ label, value, onChange, error, helperText, multiline, rows, type, options }) => (
  <Box sx={{ marginBottom: 1 }}>
    <div className="field-label">{label}</div>
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      multiline={multiline}
      rows={rows}
      type={type}
      select={!!options}
      className="custom-textfield"
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
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tags, setTags] = useState([]);
  const [clientes, setClientes] = useState([]);
  const tagInputRef = useRef(null);

  // Helper centralizado para exibir Notificações
  const notify = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
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
    const value = campo === 'clienteId' ? (newValue ? newValue : null) : event.target.value;
    setState(prev => ({ ...prev, [campo]: value }));
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
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!state.titulo) newErrors.titulo = 'Título é obrigatório';
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
      notify("Preencha todos os campos obrigatórios.", "error");
      return;
    }

    const processo = {
      titulo: state.titulo,
      descricao: state.descricao,
      prazo: state.prazo,
      registroReceita: state.registroReceita,
      tag: tags,
      status: state.status,
      descricaoStatus: state.descricaoStatus, // Incluído caso seu backend utilize
      historico: [],
      cliente: state.clienteId,
      files: []
    };

    try {
      const response = await fetch('http://localhost:8080/api/processo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processo)
      });

      if (response.ok) {
        notify("Processo salvo com sucesso!", "success");
        setState(INITIAL_STATE);
        setTags([]);
      } else {
        notify("Erro ao salvar o processo.", "error");
      }
    } catch (error) {
      notify("Erro ao conectar com o servidor.", "error");
    }
  };

  const cancel = () => {
    setState(INITIAL_STATE);
    setTags([]);
    setErrors({});
  };

  return (
    <div className="projetos-wrapper">
      <ButtonGroup className="tab-group" variant="contained" aria-label="Navegação do módulo">
        <Button className="tab-btn-active">Processos</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/status")}>Status</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/anexos")}>Anexos</Button>
      </ButtonGroup>

      <div className="projetos-card">
        <Grid container spacing={3} className="projetos-grid-container">
          {/* Coluna Esquerda */}
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
              rows={3}
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

          {/* Coluna Direita */}
          <Grid item xs={6}>
            <Box sx={{ marginBottom: 1 }}>
              <div className="field-label">TAGS</div>
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
                    className="custom-autocomplete"
                  />
                )}
              />
              <Box className="tags-container">
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} onDelete={handleDeleteTag(tag)} />
                ))}
              </Box>
            </Box>

            <Box sx={{ marginBottom: 1 }}>
              <div className="field-label">CLIENTE</div>
              <Autocomplete
                options={clientes}
                getOptionLabel={(option) => option.nome || ''}
                isOptionEqualToValue={(option, value) => option.id === value}
                onChange={(event, newValue) => handleChange('clienteId')(event, newValue ? newValue.id : null)}
                value={clientes.find(cliente => cliente.id === state.clienteId) || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    hiddenLabel
                    size="small"
                    className="custom-autocomplete"
                  />
                )}
              />
            </Box>

            <FormField
              label="STATUS"
              value={state.status}
              onChange={handleChange('status')}
              error={!!errors.status}
              helperText={errors.status}
              options={STATUS_OPTIONS}
            />
            <FormField
              label="DESCRIÇÃO STATUS"
              value={state.descricaoStatus}
              onChange={handleChange('descricaoStatus')}
              error={!!errors.descricaoStatus}
              helperText={errors.descricaoStatus}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </div>

      <div className="actions-container">
        <Button onClick={cancel} variant="contained" className="action-btn">Cancelar</Button>
        <Button onClick={salvar} variant="contained" className="action-btn">Salvar</Button>
      </div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Projetos;