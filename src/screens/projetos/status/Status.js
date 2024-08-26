import React, { useState, useEffect } from "react";
import { TextField, Button, ButtonGroup, Snackbar, Alert, Box, MenuItem, Autocomplete } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const statusOptions = [
    { value: 'ATIVO', label: 'Ativo' },
    { value: 'INATIVO', label: 'Inativo' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'CONCLUIDO', label: 'Concluído' }
];

const FormField = ({ label, value, onChange, error, helperText, multiline, rows, type, options }) => (
    <Box sx={{ marginBottom: 2 }}>
        <div style={{ color: '#838383', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word', width: 200 }}>
            {label}
        </div>
        <TextField
            hiddenLabel
            variant="filled"
            size="small"
            multiline={multiline}
            rows={rows}
            type={type}
            select={!!options}
            sx={{
                width: '250px',
                '& .MuiInputBase-root': {
                    padding: '0 14px',
                    '& input, & textarea': {
                        padding: '30',
                        fontSize: '13px',
                    },
                },
                '& .MuiFilledInput-root': {
                    padding: '0',
                },
            }}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
        >
            {options && options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    </Box>
);

const Status = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        projeto: null,
        status: '',
        descricaoStatus: '',
        titulo: '',
        descricao: '',
        prazo: '',
        registroReceita: '',
        clienteId: null,
        files: [],
        tag: [],
        historico: []
    });

    const [projetos, setProjetos] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/processo");
                if (response.ok) {
                    const data = await response.json();
                    setProjetos(data);
                } else {
                    console.error("Erro ao buscar projetos:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjetos();
    }, []);

    const handleChange = (campo) => (event) => {
        setState({ ...state, [campo]: event.target.value });
    }

    const handleAutocompleteChange = (event, value) => {
        setState({
            ...state,
            projeto: value,
            titulo: value?.titulo || '',
            descricao: value?.descricao || '',
            prazo: value?.prazo || '',
            registroReceita: value?.registroReceita || '',
            clienteId: value?.clienteId || null,
            files: value?.files || [],
            tag: value?.tag || [],
            historico: value?.historico || []
        });
    }

    const salvarStts = async () => {
        const processo = {
            projetoId: state.projeto?.id,
            titulo: state.titulo,
            descricao: state.descricao,
            prazo: state.prazo,
            registroReceita: state.registroReceita,
            cliente: state.clienteId,
            status: state.status,
            descricaoStatus: state.descricaoStatus,
            files: state.files,
            tag: state.tag,
            historico: state.historico
        };

        try {
            console.log("PROCESSO ID É " + processo.projetoId);
            console.log("O PROCESSO É " + JSON.stringify(processo));

            const response = await axios.put(`http://localhost:8080/api/processo/${processo.projetoId}`, processo);

            if (response.status >= 200 && response.status < 300) {
                setSnackbarMessage("Status atualizado com sucesso!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);

                navigate("/sessao/status", { state: { numeroProcesso: processo.projetoId } });
            } else {
                setSnackbarMessage("Erro ao atualizar o status.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } catch (error) {
            setSnackbarMessage("Erro ao atualizar o status.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    }

    const cancel = () => {
        console.log('cancel');
    }

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
                                <Button style={{ backgroundColor: 'white', color: 'grey', fontSize: 10, width: 120 }} onClick={() => navigate("/sessao/projetos")}>Processos</Button>
                                <Button style={{ backgroundColor: 'grey', fontSize: 10, width: 120 }}>Status</Button>
                                <Button style={{ backgroundColor: 'white', color: 'grey', fontSize: 10, width: 120 }} onClick={() => navigate("/sessao/anexos")}>Anexos</Button>
                            </ButtonGroup>
                            <div style={{ width: 1100, height: 470, background: 'white', border: '2px #838383 solid' }}>
                                <div style={{ marginTop: '120px', marginLeft: '30px' }}>
                                    <Autocomplete
                                        options={projetos}
                                        getOptionLabel={(option) => option.titulo || ''}
                                        value={state.projeto}
                                        onChange={handleAutocompleteChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="filled"
                                                size="small"
                                                sx={{
                                                    width: '250px',
                                                    '& .MuiInputBase-root': {
                                                        padding: '0 14px',
                                                        '& input': {
                                                            fontSize: '13px',
                                                        },
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                    <FormField
                                        label="STATUS"
                                        value={state.status}
                                        onChange={handleChange('status')}
                                        options={statusOptions}
                                    />
                                    <FormField
                                        label="DESCRIÇÃO DO STATUS"
                                        value={state.descricaoStatus}
                                        onChange={handleChange('descricaoStatus')}
                                        multiline
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <Button onClick={cancel} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey' }}>Cancelar</Button>
                                <Button onClick={salvarStts} variant="contained" style={{ width: 120, height: 40, backgroundColor: 'grey', marginLeft: '850px' }}>Salvar</Button>
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

export default Status;
