import React, { useState, useEffect } from "react";
import "./Anexos.css";
import { 
    Button, 
    ButtonGroup, 
    Snackbar, 
    Alert, 
    Chip, 
    Box, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel 
} from '@mui/material';
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

    // Função para carregar os projetos do backend
    const fetchProjetos = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/processo");
            setProjetos(response.data);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        }
    };

    useEffect(() => {
        if (user) {
            setState((prevState) => ({
                ...prevState,
                nome: user,
            }));
        }

        fetchProjetos();
    }, [user]);

    const handleChange = (campo) => (event) => {
        setState({ ...state, [campo]: event.target.value });
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files);
            setFiles(selectedFiles);
        }
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
            
            // Converte o JSON em Blob application/json para o Spring Boot desserializar corretamente
            const jsonBlob = new Blob([JSON.stringify(processoDTO)], { type: 'application/json' });
            formData.append('processoDTO', jsonBlob);

            // Anexa os arquivos
            files.forEach((file) => {
                formData.append('files', file);
            });

            const updateResponse = await axios.put(`http://localhost:8080/api/processo/${state.id}`, formData);

            if (updateResponse.status >= 200 && updateResponse.status < 300) {
                console.log("--- PROCESSO SALVO COM SUCESSO ---");
                console.log("Arquivos enviados:", files.length);

                setSnackbarMessage("Processo salvo com sucesso!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);

                // Limpa os arquivos temporários do input
                setFiles([]);

                // Recarrega a lista para mostrar o novo histórico de anexos
                fetchProjetos();
            }
        } catch (error) {
            console.error("Erro no envio:", error);
            setSnackbarMessage(error.response?.data?.message || "Erro ao salvar o processo.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const cancel = () => {
        setFiles([]);
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

    // Obter o projeto atualmente selecionado no Select
    const projetoSelecionado = projetos.find((p) => p.id === state.id);

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
                            
                            <div style={{ width: '100%', maxWidth: 1100, minHeight: 470, background: 'white', border: '2px #838383 solid', padding: '20px', boxSizing: 'border-box' }}>

                                {/* Seleção do Projeto */}
                                <div style={{ marginBottom: '20px' }}>
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

                                {/* Area de Anexar Arquivos */}
                                <div style={{ marginBottom: '30px' }}>
                                    <div style={{ color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '8px' }}>
                                        ANEXAR ARQUIVOS
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept=".mp4,.pdf,.mp3,.png"
                                        onChange={handleFileChange}
                                    />
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: '12px' }}>
                                        {files.map((file, index) => (
                                            <Chip
                                                key={index}
                                                label={file.name}
                                                onDelete={handleDeleteFile(file)}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </div>

                                {/* Histórico de Alterações e Anexos Salvos */}
                                <div>
                                    <Box sx={{ maxHeight: 250, overflow: 'auto', borderTop: '1px solid #ddd', pt: 2 }}>
                                        <h4>Histórico de Arquivos Anexados</h4>
                                        {projetoSelecionado && projetoSelecionado.files && projetoSelecionado.files.length > 0 ? (
                                            <ul>
                                                {projetoSelecionado.files.map((fileItem, index) => {
                                                    const pathString = typeof fileItem === 'string' ? fileItem : fileItem.path || '';
                                                    const nomeArquivo = pathString.split('\\').pop().split('/').pop();
                                                    return (
                                                        <li key={index} style={{ marginBottom: '4px', color: '#444' }}>
                                                            📄 <strong>{nomeArquivo}</strong>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            <p style={{ color: 'gray' }}>
                                                {state.id ? "Nenhum anexo salvo para este projeto." : "Selecione um projeto para ver os anexos."}
                                            </p>
                                        )}
                                    </Box>
                                </div>

                            </div>

                            {/* Botões do Rodapé */}
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 1100 }}>
                                <Button onClick={cancel} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey' }}>Cancelar</Button>
                                <Button onClick={salvar} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey' }}>Salvar</Button>
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