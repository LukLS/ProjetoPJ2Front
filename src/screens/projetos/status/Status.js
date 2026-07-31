import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  ButtonGroup,
  Snackbar,
  Alert,
  Box,
  MenuItem,
  Autocomplete
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Status.css";

const STATUS_OPTIONS = [
  { value: 'ATIVO', label: 'Ativo' },
  { value: 'INATIVO', label: 'Inativo' },
  { value: 'PENDENTE', label: 'Pendente' },
  { value: 'CONCLUIDO', label: 'Concluído' }
];

const FormField = ({ label, value, onChange, error, helperText, multiline, rows, type, options }) => (
  <Box sx={{ marginBottom: 1 }}>
    <div className="field-label">{label}</div>
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      multiline={multiline}
      rows={rows}
      type={type}
      select={!!options}
      className="custom-textfield"
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
    descricaoStatus: ''
  });

  const [projetos, setProjetos] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'error') => {
    setSnackbar({ open: true, message, severity });
  };

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
    setState(prev => ({ ...prev, [campo]: event.target.value }));
  };

  const handleAutocompleteChange = (event, value) => {
    setState(prev => ({ ...prev, projeto: value }));
  };

  const salvarStts = async () => {
    if (!state.projeto?.id) {
      notify("Selecione um projeto válido.", "error");
      return;
    }

    const processo = {
      id: state.projeto?.id,
      titulo: state.projeto?.titulo,
      descricao: state.projeto?.descricao,
      prazo: state.projeto?.prazo,
      registroReceita: state.projeto?.registroReceita,
      tag: state.projeto?.tag,
      status: state.status,
      descricaoStatus: state.descricaoStatus,
      historico: state.projeto?.historico,
      cliente: state.projeto?.cliente,
      files: state.projeto?.files,
    };

    const formData = new FormData();
    formData.append("processoDTO", JSON.stringify(processo));

    if (state.projeto?.files) {
      for (const file of state.projeto.files) {
        formData.append("files", file);
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/processo/${processo.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        notify("Status atualizado com sucesso!", "success");
        navigate("/sessao/status", { state: { numeroProcesso: processo.id } });
      } else {
        notify("Erro ao atualizar o status.", "error");
      }
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      notify("Erro ao atualizar o status.", "error");
    }
  };

  const cancel = () => {
    setState({ projeto: null, status: '', descricaoStatus: '' });
  };

  return (
    <div className="status-wrapper">
      <ButtonGroup className="tab-group" variant="contained" aria-label="Basic button group">
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/projetos")}>Processos</Button>
        <Button className="tab-btn-active">Status</Button>
        <Button className="tab-btn-inactive" onClick={() => navigate("/sessao/anexos")}>Anexos</Button>
      </ButtonGroup>

      <div className="status-card">
        <Box sx={{ marginBottom: 1 }}>
          <div className="field-label">PROJETO</div>
          <Autocomplete
            options={projetos}
            getOptionLabel={(option) => option.titulo || ''}
            value={state.projeto}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                hiddenLabel
                size="small"
                className="custom-autocomplete"
              />
            )}
          />
        </Box>

        <FormField
          label="STATUS"
          value={state.status}
          onChange={handleChange('status')}
          options={STATUS_OPTIONS}
        />

        <FormField
          label="DESCRIÇÃO DO STATUS"
          value={state.descricaoStatus}
          onChange={handleChange('descricaoStatus')}
          multiline
          rows={4}
        />
      </div>

      <div className="actions-container">
        <Button onClick={cancel} variant="contained" className="action-btn">Cancelar</Button>
        <Button onClick={salvarStts} variant="contained" className="action-btn">Salvar</Button>
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

export default Status;