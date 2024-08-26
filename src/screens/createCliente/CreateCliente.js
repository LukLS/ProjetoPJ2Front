import React, { useState } from "react";
import "./CreateCliente.css";
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CustomTextField from '../../components/CustomTextField';

const CreateCliente = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cnpjCPF: '',
    telefone: '',
    email: '',
    estado: '',
    cidade: '',
    cep: '',
    bairro: '',
    rua: '',
    numero: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Pode ser 'success' ou 'error'

  const handleChange = (campo) => (event) => {
    setFormData({ ...formData, [campo]: event.target.value });
    setErrors({ ...errors, [campo]: '' });
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!formData.nome) tempErrors.nome = 'Nome é obrigatório';
    if (!formData.cnpjCPF) tempErrors.cnpjCPF = 'CPF/CNPJ é obrigatório';
    if (!formData.telefone) tempErrors.telefone = 'Telefone é obrigatório';
    if (!formData.email) tempErrors.email = 'Email é obrigatório';
    if (!formData.estado) tempErrors.estado = 'Estado é obrigatório';
    if (!formData.cidade) tempErrors.cidade = 'Cidade é obrigatório';
    if (!formData.cep) tempErrors.cep = 'CEP é obrigatório';
    if (!formData.bairro) tempErrors.bairro = 'Bairro é obrigatório';
    if (!formData.rua) tempErrors.rua = 'Rua é obrigatório';
    if (!formData.numero) tempErrors.numero = 'Número é obrigatório';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const salvar = async () => {
    if (!validateFields()) {
      setSnackbarMessage('Preencha todos os campos obrigatórios');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/cliente', formData);
      console.log(response);
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error.response);
      setSnackbarMessage('Erro ao realizar o cadastro!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
    console.log('request finished');
  };

  const cancel = () => {
    console.log('cancel');
  };

  const goToAdvogado = () => {
    navigate("/sessao/createAdvogado");
  }

  const goToAssociado = () => {
    navigate("/sessao/createAssociado");
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <div style={{ marginTop: '70px' }}>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button style={{ backgroundColor: 'grey' }}>Cliente</Button>
                <Button style={{ backgroundColor: 'white', color: 'grey' }} onClick={goToAdvogado}>Advogado</Button>
                <Button style={{ backgroundColor: 'white', color: 'grey' }} onClick={goToAssociado}>Associado</Button>
              </ButtonGroup>
              <div style={{ width: 1100, height: 660, background: 'white', border: '2px #838383 solid' }}>
                <div style={{ width: 325, height: 50, color: '#838383', fontSize: 27, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', marginTop: '15px', marginLeft: '90px' }}>Dados</div>
                <div style={{ marginTop: '35px', marginLeft: '50px' }}>
                  <CustomTextField
                    label="NOME"
                    value={formData.nome}
                    onChange={handleChange('nome')}
                    error={!!errors.nome}
                    helperText={errors.nome}
                  />
                  <CustomTextField
                    label="CPF/CNPJ"
                    value={formData.cnpjCPF}
                    onChange={handleChange('cnpjCPF')}
                    error={!!errors.cnpjCPF}
                    helperText={errors.cnpjCPF}
                  />
                  <CustomTextField
                    label="TELEFONE"
                    value={formData.telefone}
                    onChange={handleChange('telefone')}
                    error={!!errors.telefone}
                    helperText={errors.telefone}
                  />
                  <CustomTextField
                    label="EMAIL"
                    value={formData.email}
                    onChange={handleChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <CustomTextField
                    label="ESTADO"
                    value={formData.estado}
                    onChange={handleChange('estado')}
                    error={!!errors.estado}
                    helperText={errors.estado}
                  />
                </div>

                <div style={{ gap: '20px', marginLeft: '680px', marginTop: '-560px' }}>
                  <CustomTextField
                    label="CIDADE"
                    value={formData.cidade}
                    onChange={handleChange('cidade')}
                    error={!!errors.cidade}
                    helperText={errors.cidade}
                  />
                  <CustomTextField
                    label="CEP"
                    value={formData.cep}
                    onChange={handleChange('cep')}
                    error={!!errors.cep}
                    helperText={errors.cep}
                  />
                  <CustomTextField
                    label="BAIRRO"
                    value={formData.bairro}
                    onChange={handleChange('bairro')}
                    error={!!errors.bairro}
                    helperText={errors.bairro}
                  />
                  <CustomTextField
                    label="RUA"
                    value={formData.rua}
                    onChange={handleChange('rua')}
                    error={!!errors.rua}
                    helperText={errors.rua}
                  />
                  <CustomTextField
                    label="NUMERO"
                    value={formData.numero}
                    onChange={handleChange('numero')}
                    error={!!errors.numero}
                    helperText={errors.numero}
                  />
                </div>

                <div style={{ marginTop: '35px' }}>
                  <Button onClick={cancel} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey' }}>Cancelar</Button>
                  <Button onClick={salvar} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey', marginLeft: '850px' }}>Salvar</Button>
                </div>
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

export default CreateCliente;
