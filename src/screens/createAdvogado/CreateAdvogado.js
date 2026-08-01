import React, { useState } from "react";
import "./CreateAdvogado.css";
import axios from "axios";
import { TextField, Button, ButtonGroup, Snackbar, Alert, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
  login: '',
  senha: '',
  nome: '',
  cpf: '',
  inscricao: '',
  estadoDeEmissao: '',
  filiacao: '',
  dataDeNascimento: ''
};

// Componente de Campo de Formulário idêntico ao de Projetos.jsx
const FormField = ({ label, value, onChange, error, helperText, type }) => (
  <Box sx={{ marginBottom: 1 }}>
    <div className="field-label">{label}</div>
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      type={type}
      className="custom-textfield"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  </Box>
);

const CreateAdvogado = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (campo) => (event) => {
    setState(prev => ({ ...prev, [campo]: event.target.value }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!state.login) tempErrors.login = 'Login é obrigatório';
    if (!state.senha) tempErrors.senha = 'Senha é obrigatória';
    if (!state.nome) tempErrors.nome = 'Nome é obrigatório';
    if (!state.cpf) tempErrors.cpf = 'CPF é obrigatório';
    if (!state.inscricao) tempErrors.inscricao = 'Inscrição é obrigatória';
    if (!state.estadoDeEmissao) tempErrors.estadoDeEmissao = 'Estado de Emissão é obrigatório';
    if (!state.filiacao) tempErrors.filiacao = 'Filiação é obrigatória';
    if (!state.dataDeNascimento) tempErrors.dataDeNascimento = 'Data de Nascimento é obrigatória';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const salvar = async () => {
    if (validateForm()) {
      try {
        await axios.post('http://localhost:8080/api/advogado', state);
        notify('Cadastro realizado com sucesso!', 'success');
        setState(INITIAL_STATE);
        setErrors({});
      } catch (error) {
        notify('Erro ao realizar o cadastro!', 'error');
      }
    } else {
      notify('Por favor, preencha todos os campos obrigatórios.', 'error');
    }
  };

  const cancel = () => {
    setState(INITIAL_STATE);
    setErrors({});
  };

  return (
    <div className="create-advogado-wrapper">
      {/* Abas Superiores */}
      <ButtonGroup className="tab-group" variant="contained" aria-label="Navegação entre perfis">
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/createCliente")}>Cliente</Button>
        <Button className="tab-btn-active">Advogado</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/createAssociado")}>Associado</Button>
      </ButtonGroup>

      {/* Cartão de Formulário com Grid do MUI */}
      <div className="advogado-card">
        <Grid container spacing={3} className="advogado-grid-container">
          {/* Coluna 1: Dados Pessoais */}
          <Grid item xs={6}>
            <h2 className="section-title">Dados pessoais</h2>
            
            <FormField
              label="LOGIN"
              value={state.login}
              onChange={handleChange('login')}
              error={!!errors.login}
              helperText={errors.login}
            />
            <FormField
              label="SENHA"
              type="password"
              value={state.senha}
              onChange={handleChange('senha')}
              error={!!errors.senha}
              helperText={errors.senha}
            />
            <FormField
              label="NOME"
              value={state.nome}
              onChange={handleChange('nome')}
              error={!!errors.nome}
              helperText={errors.nome}
            />
            <FormField
              label="CPF"
              value={state.cpf}
              onChange={handleChange('cpf')}
              error={!!errors.cpf}
              helperText={errors.cpf}
            />
          </Grid>

          {/* Coluna 2: Dados OAB */}
          <Grid item xs={6}>
            <h2 className="section-title">OAB</h2>

            <FormField
              label="INSCRIÇÃO"
              value={state.inscricao}
              onChange={handleChange('inscricao')}
              error={!!errors.inscricao}
              helperText={errors.inscricao}
            />
            <FormField
              label="ESTADO DE EMISSÃO"
              value={state.estadoDeEmissao}
              onChange={handleChange('estadoDeEmissao')}
              error={!!errors.estadoDeEmissao}
              helperText={errors.estadoDeEmissao}
            />
            <FormField
              label="FILIAÇÃO"
              value={state.filiacao}
              onChange={handleChange('filiacao')}
              error={!!errors.filiacao}
              helperText={errors.filiacao}
            />
            <FormField
              label="DATA DE NASCIMENTO"
              type="date"
              value={state.dataDeNascimento}
              onChange={handleChange('dataDeNascimento')}
              error={!!errors.dataDeNascimento}
              helperText={errors.dataDeNascimento}
            />
          </Grid>
        </Grid>
      </div>

      {/* Rodapé de Ações */}
      <div className="actions-container">
        <Button onClick={cancel} variant="contained" className="action-btn">Cancelar</Button>
        <Button onClick={salvar} variant="contained" className="action-btn">Salvar</Button>
      </div>

      {/* Snackbar */}
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

export default CreateAdvogado;