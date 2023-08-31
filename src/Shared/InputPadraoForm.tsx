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

export function InputPadraoForm({
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

type CpfProps = {
  value: string;
  name?: string;
  onChange: Function;
  event?: React.ChangeEvent<HTMLInputElement>;
  error?: {};
};

export function InputMaskCpf(props: CpfProps) {
  const CPF_MASK = '999.999.999-99';
  const MAX_LENGTH = 11;

  const { onChange } = props;

  let value = clear(props.value);

  if (value) {
    value = applyMask(value, CPF_MASK);
  }

  function onLocalChange(ev: React.ChangeEvent<HTMLInputElement>) {
    let value = clear(ev.target.value);

    let nextLength = value.length;

    if (nextLength > MAX_LENGTH) return;

    value = applyMask(value, CPF_MASK);

    ev.target.value = value;

    onChange(ev);
  }

  function applyMask(value: string, mask: string) {
    let result = '';

    let inc = 0;
    Array.from(value).forEach((letter, index) => {
      if (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc];
        inc++;
      }
      result += letter;
    });
    return result;
  }

  function clear(value: string) {
    return value && value.replace(/[^0-9]/g, '');
  }

  return (
    <TextField
      {...props}
      id="outlined-basic 4"
      label="Cpf"
      color="primary"
      variant="outlined"
      type="text"
      name={''}
      onChange={onLocalChange}
      value={value}
      error={!!props.error}
      fullWidth
    />
  );
}

export function InputMaskTelefone(props: CpfProps) {
  const TELEFONE_MASK = '(99)99999-9999';
  const MAX_LENGTH = 11;

  const { onChange } = props;

  let value = clear(props.value);

  if (value) {
    value = applyMask(value, TELEFONE_MASK);
  }

  function onLocalChange(ev: React.ChangeEvent<HTMLInputElement>) {
    let value = clear(ev.target.value);

    let nextLength = value.length;

    if (nextLength > MAX_LENGTH) return;

    value = applyMask(value, TELEFONE_MASK);

    ev.target.value = value;

    onChange(ev);
  }

  function applyMask(value: string, mask: string) {
    let result = '';

    let inc = 0;
    Array.from(value).forEach((letter, index) => {
      if (!mask[index + inc].match(/[0-9]/)) {
        result += mask[index + inc];
        inc++;
      }
      result += letter;
    });
    return result;
  }

  function clear(value: string) {
    return value && value.replace(/[^0-9]/g, '');
  }

  return (
    <TextField
      {...props}
      id="outlined-basic 5"
      label="Telefone"
      color="primary"
      variant="outlined"
      type="text"
      name={''}
      onChange={onLocalChange}
      value={value}
      error={!!props.error}
      fullWidth
    />
  );
}
