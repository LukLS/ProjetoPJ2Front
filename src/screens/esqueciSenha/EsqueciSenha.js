import React, { useState, useEffect } from "react";
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

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    }

    const handleSendPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login/password', { login });
            setMessage(response.data);
        } catch (error) {
            setError(error.response ? error.response.data : 'Erro ao enviar o email');
        }
    }

    const cancel = () => {
        navigate("/");
    }

    return (
        <form onSubmit={handleSendPassword} className="forgot-password">
            <div style={{ background: '#ECECEC', width: '100vw', height: '100vh', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 720, height: 512, paddingTop: 38.5, paddingBottom: 43, paddingLeft: 216, paddingRight: 194.5, background: '#ECECEC', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex' }}>
                    <div style={{ width: 309.5, height: 430.5, position: 'relative' }}>
                        <div style={{ width: 309.5, height: 430.5, left: 0, top: 0, position: 'absolute', background: '#DBDBDB', borderRadius: 15 }}></div>
                        <div style={{ left: 82.5, top: 26.5, position: 'absolute', color: '#838383', fontSize: 50, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>LOGO</div>
                        <div style={{ width: 242, height: 109.5, left: 34, top: 159.5, position: 'absolute' }}>
                            <div style={{ left: 5, top: -10, position: 'absolute', color: '#838383', fontSize: 15, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Email</div>
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
                            {error && (
                                <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Inter', marginTop: '8px', textAlign: 'center', width: '100%' }}>
                                    {error}
                                </div>
                            )}
                            {message && (
                                <div style={{ color: 'green', fontSize: '12px', fontFamily: 'Inter', marginTop: '8px', textAlign: 'center', width: '100%' }}>
                                    {message}
                                </div>
                            )}
                        </div>
                        <div style={{ width: 27.5, height: 27, left: 46, top: 315.5, position: 'absolute' }}>
                            <Button type="submit" variant="contained" style={{ width: 240, height: 27, backgroundColor: 'grey', marginLeft: '-10px' }}>ENVIAR SENHA</Button>
                        </div>
                        <div style={{ width: 27.5, height: 27, left: 46, top: 355.5, position: 'absolute' }}>
                            <Button onClick={cancel} variant="contained" style={{ width: 240, height: 27, backgroundColor: 'grey', marginLeft: '-10px' }}>VOLTAR</Button>
                        </div>
                        <div style={{ left: 81.5, top: 87, position: 'absolute', color: '#838383', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>Bem Vindo ao SGP</div>
                    </div>
                </div>
            </div>
        </form>
    );
};

