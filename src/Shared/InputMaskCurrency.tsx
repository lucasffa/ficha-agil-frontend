import MoneyInput from '@rschpdr/react-money-input';
import { FormControl, TextField } from '@mui/material';
import React from 'react';

interface CustomCurrencyFieldInputProps {
  label: string;
  readOnly?: boolean;
  error?: boolean;
  value?: number | null;
}

const CustomCurrencyFieldInput = React.forwardRef(
  (props: CustomCurrencyFieldInputProps, ref) => (
    <FormControl fullWidth>
      <MoneyInput
        customInput={TextField}
        error={
          !!props.error || (props.value !== undefined && props.value === 0)
        }
        variant="outlined"
        currencyConfig={{
          locale: 'pt-BR',
          currencyCode: 'BRL',
          currencyDisplay: 'symbol',
        }}
        inputRef={ref}
        {...props}
        InputProps={{
          readOnly: props.readOnly,
        }}
      />
    </FormControl>
  )
);

export default CustomCurrencyFieldInput;
