import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ label, type = 'text', value, onChange, error, helperText, style = {} }) => (
  <div style={{ marginTop: '12px', width: '250px' }}>
    <div style={{ color: '#838383', fontSize: 14, fontFamily: 'Inter', fontWeight: '400' }}>{label}</div>
    <TextField
      hiddenLabel
      variant="filled"
      size="small"
      style={{ marginTop: '14px', width: '100%', ...style }}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText || ' '}
    />
  </div>
);

export default CustomTextField;
