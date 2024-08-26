import React, { useState } from "react";
import "./CreateAdvogado.css";
import axios from "axios";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CustomTextField from '../../components/CustomTextField';

const CreateAdvogado = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    login: '',
    senha: '',
    nome: '',
    cpf: '',
    inscricao: '',
    estadoDeEmissao: '',
    filiacao: '',
    dataDeNascimento: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Pode ser 'success' ou 'error'

  const [errors, setErrors] = useState({});

  const handleChange = (campo) => (event) => {
    setState({ ...state, [campo]: event.target.value });
  }

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!state.login) {
      tempErrors.login = 'Login é obrigatório';
      isValid = false;
    }
    if (!state.senha) {
      tempErrors.senha = 'Senha é obrigatória';
      isValid = false;
    }
    if (!state.nome) {
      tempErrors.nome = 'Nome é obrigatório';
      isValid = false;
    }
    if (!state.cpf) {
      tempErrors.cpf = 'CPF é obrigatório';
      isValid = false;
    }
    if (!state.inscricao) {
      tempErrors.inscricao = 'Inscrição é obrigatória';
      isValid = false;
    }
    if (!state.estadoDeEmissao) {
      tempErrors.estadoDeEmissao = 'Estado de Emissão é obrigatório';
      isValid = false;
    }
    if (!state.filiacao) {
      tempErrors.filiacao = 'Filiação é obrigatória';
      isValid = false;
    }
    if (!state.dataDeNascimento) {
      tempErrors.dataDeNascimento = 'Data de Nascimento é obrigatória';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  }

  const salvar = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/advogado', state);
        console.log(response);
        setSnackbarMessage('Cadastro realizado com sucesso!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setState({
          login: '',
          senha: '',
          nome: '',
          cpf: '',
          inscricao: '',
          estadoDeEmissao: '',
          filiacao: '',
          dataDeNascimento: ''
        });
        setErrors({});
      } catch (error) {
        console.log(error.response);
        setSnackbarMessage('Erro ao realizar o cadastro!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage('Por favor, preencha todos os campos obrigatórios.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  const cancel = () => {
    console.log('cancel');
  }

  const goToAssociado = () => {
    navigate("/sessao/createAssociado");
  }

  const goToCliente = () => {
    navigate("/sessao/createCliente");
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
                <Button style={{ backgroundColor: 'white', color: 'grey' }} onClick={goToCliente}>Cliente</Button>
                <Button style={{ backgroundColor: 'grey' }}>Advogado</Button>
                <Button style={{ backgroundColor: 'white', color: 'grey' }} onClick={goToAssociado}>Associado</Button>
              </ButtonGroup>
              <div style={{ width: 1100, height: 570, background: 'white', border: '2px #838383 solid' }}>
                <div style={{ width: 325, height: 50, color: '#838383', fontSize: 27, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', marginTop: '15px', marginLeft: '90px' }}>Dados pessoais</div>
                <div style={{ width: 325, height: 50, color: '#838383', fontSize: 27, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', marginTop: '-50px', marginLeft: '780px' }}>OAB</div>
                <div style={{ marginTop: '35px', marginLeft: '50px' }}>
                  <CustomTextField
                    label="LOGIN"
                    value={state.login}
                    onChange={handleChange('login')}
                    error={!!errors.login}
                    helperText={errors.login}
                  />
                  <CustomTextField
                    label="SENHA"
                    type="password"
                    value={state.senha}
                    onChange={handleChange('senha')}
                    error={!!errors.senha}
                    helperText={errors.senha}
                  />
                  <CustomTextField
                    label="NOME"
                    value={state.nome}
                    onChange={handleChange('nome')}
                    error={!!errors.nome}
                    helperText={errors.nome}
                  />
                  <CustomTextField
                    label="CPF"
                    value={state.cpf}
                    onChange={handleChange('cpf')}
                    error={!!errors.cpf}
                    helperText={errors.cpf}
                  />
                </div>

                <div style={{gap: '20px', marginLeft: '680px', marginTop: '-450px'  }}>
                  <CustomTextField
                    label="INSCRIÇÃO"
                    value={state.inscricao}
                    onChange={handleChange('inscricao')}
                    error={!!errors.inscricao}
                    helperText={errors.inscricao}
                  />
                  <CustomTextField
                    label="ESTADO DE EMISSÃO"
                    value={state.estadoDeEmissao}
                    onChange={handleChange('estadoDeEmissao')}
                    error={!!errors.estadoDeEmissao}
                    helperText={errors.estadoDeEmissao}
                  />
                  <CustomTextField
                    label="FILIAÇÃO"
                    value={state.filiacao}
                    onChange={handleChange('filiacao')}
                    error={!!errors.filiacao}
                    helperText={errors.filiacao}
                  />
                  <CustomTextField
                    label="DATA DE NASCIMENTO"
                    type="date"
                    value={state.dataDeNascimento}
                    onChange={handleChange('dataDeNascimento')}
                    error={!!errors.dataDeNascimento}
                    helperText={errors.dataDeNascimento}
                  />
                </div>

                <div style={{ marginTop: '60px' }}>
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
}

export default CreateAdvogado;
