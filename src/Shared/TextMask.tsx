import React, { useState } from 'react';
import { TextField } from '@mui/material';
import uniqid from 'uniqid';

export class Mascara {
  static cpf = '999.999.999-99';
  static cep = '99999-999';
  static telefone = '(99)99999-9999';
  static telefoneResidencial = '(99)9999-9999';
  static telefoneRecado = '(99)9999-9999';
  static horario = '99:99';
}

type PropsInput = {
  mask: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
  error?: {};
};

export function TextMask(props: PropsInput) {
  const [inputValue, setInputValue] = useState<string>(props.value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unmaskedValue = event.target.value.replace(/\D/g, '');
    setInputValue(applyMask(unmaskedValue, props.mask));
    props.onChange(applyMask(unmaskedValue, props.mask));
  };

  const applyMask = (value: string, mask: string) => {
    let maskedValue = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
      if (mask[i] === '9') {
        maskedValue += value[valueIndex++];
      } else {
        maskedValue += mask[i];
      }
    }

    return maskedValue;
  };

  return (
    <TextField
      id={`outlined-basic ${uniqid()}`}
      label={props.name}
      color="primary"
      variant="outlined"
      type="text"
      onChange={handleInputChange}
      value={inputValue}
      error={!!props.error}
      fullWidth
    />
  );
}
