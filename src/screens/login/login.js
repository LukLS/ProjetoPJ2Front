import React, { useState, useContext, useEffect } from "react";
import './login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError('');
      }, 4500);
    }
    return () => clearTimeout(timer); 
  }, [error]);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (login.length < 8 || senha.length < 8) {
      setError("Login e senha devem ter pelo menos 8 caracteres");
      return;
    }
    const data = { login: login, senha: senha };
    try {
      const success = await signIn(data);
      if (success) {
        setError('');
        navigate("/sessao/home");
      } else {
        setError("Dados incorretos");
      }
    } catch (error) {
      setError("Dados incorretos"); 
      console.log("Error during login:", error.response || error.message);
    }
  }

  return (
    <form onSubmit={handleSignIn} className="login-form">
      <div className="login-page-container">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="login-card-bg"></div>
            <div className="login-logo">LOGO</div>
            <div className="login-welcome">Bem Vindo ao SGP</div>
            
            <div className="login-inputs-container">
              <div className="login-field-group">
                <label className="input-label">Login</label>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-small-login"
                  defaultValue=""
                  variant="filled"
                  size="small"
                  className="login-textfield"
                  value={login}
                  onChange={handleChange(setLogin)}
                />
              </div>

              <div className="login-field-group">
                <label className="input-label">Senha</label>
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-small-senha"
                  defaultValue=""
                  variant="filled"
                  size="small"
                  className="login-textfield"
                  value={senha}
                  onChange={handleChange(setSenha)}
                  type="password"
                />
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>

            <div className="login-btn-container">
              <Button type="submit" variant="contained" className="login-submit-btn">
                ENTRAR
              </Button>
            </div>

            <Link to="/pagina/esqueci-minha-senha" className="login-forgot-link">
              Esqueci minha senha?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}