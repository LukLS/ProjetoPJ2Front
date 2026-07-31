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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

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
    setState(prev => ({ ...prev, [campo]: event.target.value }));
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
      notify("Nenhum projeto selecionado.", "error");
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
      const jsonBlob = new Blob([JSON.stringify(processoDTO)], { type: 'application/json' });
      formData.append('processoDTO', jsonBlob);

      files.forEach((file) => {
        formData.append('files', file);
      });

      const updateResponse = await axios.put(`http://localhost:8080/api/processo/${state.id}`, formData);

      if (updateResponse.status >= 200 && updateResponse.status < 300) {
        notify("Processo salvo com sucesso!", "success");
        setFiles([]);
        fetchProjetos();
      }
    } catch (error) {
      console.error("Erro no envio:", error);
      notify(error.response?.data?.message || "Erro ao salvar o processo.", "error");
    }
  };

  const cancel = () => {
    setFiles([]);
  };

  const projetoSelecionado = projetos.find((p) => p.id === state.id);

  return (
    <div className="anexos-wrapper">
      <ButtonGroup className="tab-group" variant="contained" aria-label="Navegação de abas">
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/projetos")}>Processos</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/status")}>Status</Button>
        <Button className="tab-btn-active">Anexos</Button>
      </ButtonGroup>

      <div className="anexos-card">
        {/* Seleção do Projeto */}
        <FormControl size="small" className="custom-select-control">
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

        {/* Área de Anexar Arquivos */}
        <Box sx={{ marginBottom: 3 }}>
          <div className="field-label">ANEXAR ARQUIVOS</div>
          <input
            className="file-input"
            type="file"
            multiple
            accept=".mp4,.pdf,.mp3,.png"
            onChange={handleFileChange}
          />
          <Box className="chips-container">
            {files.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={handleDeleteFile(file)}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>

        {/* Histórico de Anexos Salvos */}
        <div className="history-container">
          <div className="history-title">Histórico de Arquivos Anexados</div>
          {projetoSelecionado && projetoSelecionado.files && projetoSelecionado.files.length > 0 ? (
            <ul className="history-list">
              {projetoSelecionado.files.map((fileItem, index) => {
                const pathString = typeof fileItem === 'string' ? fileItem : fileItem.path || '';
                const nomeArquivo = pathString.split('\\').pop().split('/').pop();
                return (
                  <li key={index} className="history-item">
                    📄 <strong>{nomeArquivo}</strong>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="empty-history">
              {state.id ? "Nenhum anexo salvo para este projeto." : "Selecione um projeto para ver os anexos."}
            </p>
          )}
        </div>
      </div>

      {/* Botões do Rodapé */}
      <div className="actions-container">
        <Button onClick={cancel} variant="contained" className="action-btn">Cancelar</Button>
        <Button onClick={salvar} variant="contained" className="action-btn">Salvar</Button>
      </div>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Anexos;