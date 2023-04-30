import React from 'react';
import { TextField } from '@mui/material';

interface InputPadraoFormProps {
  placeholder?: string;
  type?: string;
  label: string;
  className: string;
  control?: any;
  error?: string;
  value?: any;
}

export default function InputPadraoForm({
  className,
  label,
  value,
}: InputPadraoFormProps) {
  return (
    <TextField
      id="outlined-basic"
      className={className}
      label={label}
      color="primary"
      variant="outlined"
      style={{ borderColor: 'yellow' }}
      value={value}
    />
  );
}
