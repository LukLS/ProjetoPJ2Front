import React, { useState, useEffect } from "react";
import "./EsqueciSenha.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EsqueciSenha = () => {
  const [login, setLogin] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (error || message) {
      timer = setTimeout(() => {
        setError('');
        setMessage('');
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [error, message]);

  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSendPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login/password', { login });
      setMessage(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro ao enviar o email');
    }
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSendPassword} className="login-form">
      <div className="login-page-container">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="login-logo">LOGO</div>
            <div className="login-welcome">Bem Vindo ao SGP</div>

            <div className="login-inputs-container">
              <div className="login-field-group">
                <label className="input-label" htmlFor="email-input">Email</label>
                <TextField
                  id="email-input"
                  hiddenLabel
                  variant="filled"
                  size="small"
                  className="login-textfield"
                  value={login}
                  onChange={handleChange}
                />
              </div>

              {error && <div className="feedback-message error">{error}</div>}
              {message && <div className="feedback-message success">{message}</div>}
            </div>

            <div className="forgot-btn-group">
              <Button type="submit" variant="contained" className="login-submit-btn">
                ENVIAR SENHA
              </Button>
              <Button onClick={cancel} variant="contained" className="login-submit-btn">
                VOLTAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};