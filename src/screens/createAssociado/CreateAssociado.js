import React, { useState } from "react";
import "./CreateAssociado.css";
import axios from "axios";
import { TextField, Button, ButtonGroup, Snackbar, Alert, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
  login: '',
  senha: '',
  nome: '',
  cpf: '',
  dataDeNascimento: ''
};

// Componente FormField padronizado
const FormField = ({ label, value, onChange, error, helperText, type, autoComplete }) => (
  <Box sx={{ marginBottom: 1 }}>
    <div className="field-label">{label}</div>
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      type={type}
      autoComplete={autoComplete}
      className="custom-textfield"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  </Box>
);

const CreateAssociado = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (campo) => (event) => {
    setFormData(prev => ({ ...prev, [campo]: event.target.value }));
    setErrors(prev => ({ ...prev, [campo]: '' }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.login) tempErrors.login = 'Login é obrigatório';
    if (!formData.senha) tempErrors.senha = 'Senha é obrigatória';
    if (!formData.nome) tempErrors.nome = 'Nome é obrigatório';
    if (!formData.cpf) tempErrors.cpf = 'CPF é obrigatório';
    if (!formData.dataDeNascimento) tempErrors.dataDeNascimento = 'Data de Nascimento é obrigatória';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const salvar = async () => {
    if (validateForm()) {
      try {
        await axios.post('http://localhost:8080/api/associado', formData);
        notify('Cadastro realizado com sucesso!', 'success');
        setFormData(INITIAL_STATE);
        setErrors({});
      } catch (error) {
        notify('Erro ao realizar o cadastro!', 'error');
      }
    } else {
      notify('Por favor, preencha todos os campos obrigatórios.', 'error');
    }
  };

  const cancel = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
  };

  return (
    <div className="create-associado-wrapper">
      {/* Abas Superiores */}
      <ButtonGroup className="tab-group" variant="contained" aria-label="Navegação entre perfis">
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/createCliente")}>Cliente</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/createAdvogado")}>Advogado</Button>
        <Button className="tab-btn-active">Associado</Button>
      </ButtonGroup>

      {/* Cartão do Formulário */}
      <div className="associado-card">
        <Grid container spacing={3} className="associado-grid-container">
          {/* Coluna 1: Dados Pessoais */}
          <Grid item xs={6}>
            <h2 className="section-title">Dados pessoais</h2>

            <FormField
              label="LOGIN"
              value={formData.login}
              onChange={handleChange('login')}
              error={!!errors.login}
              helperText={errors.login}
              autoComplete="off"
            />
            <FormField
              label="SENHA"
              type="password"
              value={formData.senha}
              onChange={handleChange('senha')}
              error={!!errors.senha}
              helperText={errors.senha}
              autoComplete="new-password"
            />
            <FormField
              label="NOME"
              value={formData.nome}
              onChange={handleChange('nome')}
              error={!!errors.nome}
              helperText={errors.nome}
            />
          </Grid>

          {/* Coluna 2: Documentação */}
          <Grid item xs={6}>
            {/* Espaçamento em branco no título para alinhar com o grid oposto */}
            <h2 className="section-title">&nbsp;</h2>

            <FormField
              label="CPF"
              value={formData.cpf}
              onChange={handleChange('cpf')}
              error={!!errors.cpf}
              helperText={errors.cpf}
            />
            <FormField
              label="DATA DE NASCIMENTO"
              type="date"
              value={formData.dataDeNascimento}
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

export default CreateAssociado;