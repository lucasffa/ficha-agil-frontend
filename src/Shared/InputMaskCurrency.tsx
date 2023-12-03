import MoneyInput from '@rschpdr/react-money-input';
import { FormControl, TextField } from '@mui/material';
import React from 'react';

interface CustomCurrencyFieldInputProps {
  label: string;
  readOnly?: boolean;
}

const CustomCurrencyFieldInput = React.forwardRef(
  (props: CustomCurrencyFieldInputProps, ref) => (
    <FormControl fullWidth>
      <MoneyInput
        customInput={TextField}
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
