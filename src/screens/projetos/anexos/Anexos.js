import React, { useState, useEffect } from "react";
import "./Anexos.css";
import { Button, ButtonGroup, Snackbar, Alert, Chip, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

const Anexos = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [state, setState] = useState({
        titulo: '',
        prazo: '',
        nome: '',
        id: '',
    });

    const [projetos, setProjetos] = useState([]);
    const [files, setFiles] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        if (user) {
            setState((prevState) => ({
                ...prevState,
                nome: user,
            }));
        }

        // Carrega a lista de projetos do backend
        const fetchProjetos = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/processo");
                setProjetos(response.data);
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjetos();
    }, [user]);

    const handleChange = (campo) => (event) => {
        setState({ ...state, [campo]: event.target.value });
    };

    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files).filter((file) =>
            ["video/mp4", "application/pdf", "audio/mpeg", "image/png"].includes(file.type)
        );
        setFiles([...files, ...newFiles]);
    };

    const handleDeleteFile = (fileToDelete) => () => {
        setFiles(files.filter((file) => file !== fileToDelete));
    };

    const salvar = async () => {
        if (!state.id) {
            setSnackbarMessage("Nenhum projeto selecionado.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:8080/api/processo/${state.id}`);
            const processoAtual = response.data;
    
            // Mescle os dados atuais com os novos valores
            const processoDTO = {
                ...processoAtual,
                titulo: state.titulo || processoAtual.titulo,
                descricao: state.descricao || processoAtual.descricao,
                prazo: state.prazo || processoAtual.prazo,
                registroReceita: state.registroReceita || processoAtual.registroReceita,
                tag: state.tag || processoAtual.tag,
                status: state.status || processoAtual.status,
            };
    
            const formData = new FormData();
            formData.append('processoDTO', JSON.stringify(processoDTO));
    
            files.forEach((file) => {
                formData.append('files', file);
            });
    
            // Envie a atualização para o backend
            const updateResponse = await axios.put(`http://localhost:8080/api/processo/${state.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (updateResponse.status >= 200 && updateResponse.status < 300) {
                setSnackbarMessage("Processo salvo com sucesso!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage("Erro ao salvar o processo.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            if (error.response) {
                console.error("Erro na resposta da API:", error.response.data, error.response.status, error.response.headers);
                setSnackbarMessage(`Erro ao salvar o processo: ${error.response.data.message}`);
            } else if (error.request) {
                console.error("Nenhuma resposta recebida:", error.request);
                setSnackbarMessage("Nenhuma resposta recebida do servidor.");
            } else {
                console.error("Erro ao configurar a requisição:", error.message);
                setSnackbarMessage("Erro ao configurar a requisição.");
            }
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };
    
    

    const cancel = () => {
        console.log('cancel');
    };

    const goToProjetos = () => {
        navigate("/sessao/projetos");
    };

    const goToStatus = () => {
        navigate("/sessao/status");
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <div style={{ marginTop: '80px' }}>
                            <ButtonGroup style={{ height: '30px' }} variant="contained" aria-label="Basic button group">
                                <Button style={{ backgroundColor: 'white', color: 'grey', fontSize: 10, width: 120 }} onClick={goToProjetos}>Processos</Button>
                                <Button style={{ backgroundColor: 'white', color: 'grey', fontSize: 10, width: 120 }} onClick={goToStatus}>Status</Button>
                                <Button style={{ backgroundColor: 'grey', fontSize: 10, alignItems: 'center', width: 120 }}>Anexos</Button>
                            </ButtonGroup>
                            <div style={{ width: 1100, height: 470, background: 'white', border: '2px #838383 solid' }}>

                                <div style={{ marginTop: '10px', marginLeft: '30px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select-projeto-label">Selecione o Projeto</InputLabel>
                                        <Select
                                            labelId="select-projeto-label"
                                            id="select-projeto"
                                            value={state.id}
                                            label="Selecione o Projeto"
                                            onChange={handleChange('id')}
                                        >
                                            {projetos.map((projeto) => (
                                                <MenuItem key={projeto.id} value={projeto.id}>
                                                    {projeto.titulo}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div style={{ marginTop: '20px', marginLeft: '650px' }}>
                                    <div style={{ width: 200, height: 40, color: '#838383', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>ANEXAR ARQUIVOS</div>
                                    <input
                                        type="file"
                                        multiple
                                        accept=".mp4,.pdf,.mp3,.png"
                                        onChange={handleFileChange}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '8px' }}>
                                        {files.map((file, index) => (
                                            <Chip
                                                key={index}
                                                label={file.name}
                                                onDelete={handleDeleteFile(file)}
                                            />
                                        ))}
                                    </Box>
                                </div>

                                <div style={{ marginTop: '20px', marginLeft: '30px' }}>
                                    <Box sx={{ maxHeight: 350, overflow: 'auto' }}>
                                        <h4>Histórico de Alterações</h4>
                                        {/* Remover ou ajustar a exibição do histórico de arquivos, se não for usado */}
                                    </Box>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <Button onClick={cancel} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey' }}>Cancelar</Button>
                                <Button onClick={salvar} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey', marginLeft: '850px' }}>Salvar</Button>
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

export default Anexos;
