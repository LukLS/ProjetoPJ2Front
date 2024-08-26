import React, { useState } from "react";
import "./CreateAssociado.css";
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CustomTextField from '../../components/CustomTextField';

const CreateAssociado = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: '',
    senha: '',
    nome: '',
    cpf: '',
    dataDeNascimento: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Pode ser 'success' ou 'error'

  const [errors, setErrors] = useState({});

  const handleChange = (campo) => (event) => {
    setFormData({ ...formData, [campo]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.login) {
      tempErrors.login = 'Login é obrigatório';
      isValid = false;
    }
    if (!formData.senha) {
      tempErrors.senha = 'Senha é obrigatória';
      isValid = false;
    }
    if (!formData.nome) {
      tempErrors.nome = 'Nome é obrigatório';
      isValid = false;
    }
    if (!formData.cpf) {
      tempErrors.cpf = 'CPF é obrigatório';
      isValid = false;
    }
    if (!formData.dataDeNascimento) {
      tempErrors.dataDeNascimento = 'Data de Nascimento é obrigatória';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const salvar = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/associado', formData);
        console.log(response);
        setSnackbarMessage('Cadastro realizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        // Resetando os campos do formulário após sucesso
        setFormData({
          login: '',
          senha: '',
          nome: '',
          cpf: '',
          dataDeNascimento: ''
        });
        setErrors({});
      } catch (error) {
        console.log(error.response);
        setSnackbarMessage('Erro ao realizar o cadastro!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
      console.log('request finished');
    } else {
      setSnackbarMessage('Por favor, preencha todos os campos obrigatórios.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const cancel = () => {
    console.log('cancel');
  };

  const goToAdvogado = () => {
    navigate("/sessao/createAdvogado");
  };

  const goToCliente = () => {
    navigate("/sessao/createCliente");
  };

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
                <Button style={{ backgroundColor: 'white', color: 'grey' }} onClick={goToCliente}>Cliente</Button>
                <Button style={{ backgroundColor: 'white', color: 'grey' }} onClick={goToAdvogado}>Advogado</Button>
                <Button style={{ backgroundColor: 'grey' }}>Associado</Button>
              </ButtonGroup>
              <div style={{ width: 1100, height: 470, background: 'white', border: '2px #838383 solid' }}>
                <div style={{ width: 325, height: 50, color: '#838383', fontSize: 27, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', marginTop: '15px', marginLeft: '90px' }}>Dados pessoais</div>
                <div style={{ marginTop: '35px', marginLeft: '50px' }}>
                  <CustomTextField
                    label="LOGIN"
                    value={formData.login}
                    onChange={handleChange('login')}
                    error={!!errors.login}
                    helperText={errors.login}
                  />
                  <CustomTextField
                    label="SENHA"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange('senha')}
                    error={!!errors.senha}
                    helperText={errors.senha}
                  />
                  <CustomTextField
                    label="NOME"
                    value={formData.nome}
                    onChange={handleChange('nome')}
                    error={!!errors.nome}
                    helperText={errors.nome}
                  />
                  <div style={{gap: '20px', marginLeft: '680px', marginTop: '-335px' }}>
                    <CustomTextField
                      label="CPF"
                      value={formData.cpf}
                      onChange={handleChange('cpf')}
                      error={!!errors.cpf}
                      helperText={errors.cpf}
                    />
                    <CustomTextField
                      label="DATA DE NASCIMENTO"
                      type="date"
                      value={formData.dataDeNascimento}
                      onChange={handleChange('dataDeNascimento')}
                      error={!!errors.dataDeNascimento}
                      helperText={errors.dataDeNascimento}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '180px' }}>
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

export default CreateAssociado;
