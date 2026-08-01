import React, { useState } from "react";
import "./CreateCliente.css";
import axios from "axios";
import { TextField, Button, ButtonGroup, Snackbar, Alert, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = {
  nome: '',
  cnpjCPF: '',
  telefone: '',
  email: '',
  estado: '',
  cidade: '',
  cep: '',
  bairro: '',
  rua: '',
  numero: ''
};

// Componente de Campo de Formulário reutilizável
const FormField = ({ label, value, onChange, error, helperText, type }) => (
  <Box sx={{ marginBottom: 0.5 }}>
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

const CreateCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (campo) => (event) => {
    setFormData(prev => ({ ...prev, [campo]: event.target.value }));
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!formData.nome) tempErrors.nome = 'Nome é obrigatório';
    if (!formData.cnpjCPF) tempErrors.cnpjCPF = 'CPF/CNPJ é obrigatório';
    if (!formData.telefone) tempErrors.telefone = 'Telefone é obrigatório';
    if (!formData.email) tempErrors.email = 'E-mail é obrigatório';
    if (!formData.estado) tempErrors.estado = 'Estado é obrigatório';
    if (!formData.cidade) tempErrors.cidade = 'Cidade é obrigatória';
    if (!formData.cep) tempErrors.cep = 'CEP é obrigatório';
    if (!formData.bairro) tempErrors.bairro = 'Bairro é obrigatório';
    if (!formData.rua) tempErrors.rua = 'Rua é obrigatória';
    if (!formData.numero) tempErrors.numero = 'Número é obrigatório';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const salvar = async () => {
    if (validateFields()) {
      try {
        await axios.post('http://localhost:8080/api/cliente', formData);
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
    <div className="create-cliente-wrapper">
      {/* Navegação entre Abas */}
      <ButtonGroup className="tab-group" variant="contained" aria-label="Navegação de abas">
        <Button className="tab-btn-active">Cliente</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/createAdvogado")}>Advogado</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/createAssociado")}>Associado</Button>
      </ButtonGroup>

      {/* Card do Formulário */}
      <div className="cliente-card">
        <Grid container spacing={3} className="cliente-grid-container">
          {/* Coluna 1: Dados Pessoais / Contato */}
          <Grid item xs={6}>
            <h2 className="section-title">Dados de Contato</h2>

            <FormField
              label="NOME"
              value={formData.nome}
              onChange={handleChange('nome')}
              error={!!errors.nome}
              helperText={errors.nome}
            />
            <FormField
              label="CPF/CNPJ"
              value={formData.cnpjCPF}
              onChange={handleChange('cnpjCPF')}
              error={!!errors.cnpjCPF}
              helperText={errors.cnpjCPF}
            />
            <FormField
              label="TELEFONE"
              value={formData.telefone}
              onChange={handleChange('telefone')}
              error={!!errors.telefone}
              helperText={errors.telefone}
            />
            <FormField
              label="EMAIL"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
            />
            <FormField
              label="ESTADO"
              value={formData.estado}
              onChange={handleChange('estado')}
              error={!!errors.estado}
              helperText={errors.estado}
            />
          </Grid>

          {/* Coluna 2: Endereço */}
          <Grid item xs={6}>
            <h2 className="section-title">Endereço</h2>

            <FormField
              label="CIDADE"
              value={formData.cidade}
              onChange={handleChange('cidade')}
              error={!!errors.cidade}
              helperText={errors.cidade}
            />
            <FormField
              label="CEP"
              value={formData.cep}
              onChange={handleChange('cep')}
              error={!!errors.cep}
              helperText={errors.cep}
            />
            <FormField
              label="BAIRRO"
              value={formData.bairro}
              onChange={handleChange('bairro')}
              error={!!errors.bairro}
              helperText={errors.bairro}
            />
            <FormField
              label="RUA"
              value={formData.rua}
              onChange={handleChange('rua')}
              error={!!errors.rua}
              helperText={errors.rua}
            />
            <FormField
              label="NÚMERO"
              value={formData.numero}
              onChange={handleChange('numero')}
              error={!!errors.numero}
              helperText={errors.numero}
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

export default CreateCliente;