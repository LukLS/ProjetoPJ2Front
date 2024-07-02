import React, { useState, useContext, useEffect } from "react";
import './login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(''); // Estado para a mensagem de erro
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => {
                setError('');
            }, 4500); // Limpar a mensagem de erro após 7 segundos
        }
        return () => clearTimeout(timer); // Limpar o timer ao desmontar o componente
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
                setError(''); // Limpar a mensagem de erro em caso de sucesso
                navigate("/sessao/listarUsuarios");
            } else {
                setError("Dados incorretos");
            }
        } catch (error) {
            setError("Dados incorretos"); // Define a mensagem de erro em caso de exceção
            console.log("Error during login:", error.response || error.message);
        }
    }

    return (
        <form onSubmit={handleSignIn} className="login">
            <div style={{ background: '#ECECEC', width: '100vw', height: '100vh', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 720, height: 512, paddingTop: 38.5, paddingBottom: 43, paddingLeft: 216, paddingRight: 194.5, background: '#ECECEC', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex' }}>
                    <div style={{ width: 309.5, height: 430.5, position: 'relative' }}>
                        <div style={{ width: 309.5, height: 430.5, left: 0, top: 0, position: 'absolute', background: '#DBDBDB', borderRadius: 15 }}></div>
                        <div style={{ left: 82.5, top: 26.5, position: 'absolute', color: '#838383', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>LOGO</div>
                        <div style={{ width: 242, height: 109.5, left: 34, top: 159.5, position: 'absolute' }}>
                            <div style={{ left: 5, top: -10, position: 'absolute', color: '#838383', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Login</div>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue=""
                                variant="filled"
                                size="small"
                                style={{ marginTop: '15px', width: '245px' }}
                                value={login}
                                onChange={handleChange(setLogin)}
                            />
                            <div style={{ left: 5, top: 56, position: 'absolute', color: '#838383', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Senha</div>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue=""
                                variant="filled"
                                size="small"
                                style={{ marginTop: '25px', width: '245px' }}
                                value={senha}
                                onChange={handleChange(setSenha)}
                            />
                            {error && (
                                <div style={{ color: 'red', fontSize: '12px',fontFamily: 'Inter', marginTop: '8px', textAlign: 'center', width: '100%' }}>
                                    {error}
                                </div>
                            )}
                        </div>
                        <div style={{ width: 217.5, height: 27, left: 46, top: 345.5, position: 'absolute' }}>
                            <Button type="submit" variant="contained" style={{ width: 240, height: 27, backgroundColor: 'grey', marginLeft: '-10px' }}>ENTRAR</Button>
                        </div>
                        <Link to="/pagina/esqueci-minha-senha" style={{ cursor: 'pointer', left: 109.5, top: 382.5, position: 'absolute', color: '#838383', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Esqueci minha senha?</Link>
                        <div style={{ left: 81.5, top: 87, position: 'absolute', color: '#838383', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Bem Vindo ao SGP</div>
                    </div>
                </div>
            </div>
        </form>
    );
}