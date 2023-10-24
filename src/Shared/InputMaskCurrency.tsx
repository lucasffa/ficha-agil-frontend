import MoneyInput from '@rschpdr/react-money-input';
import { FormControl, TextField } from '@material-ui/core';
import React from 'react';

interface CustomCurrencyFieldInputProps {
  label: string;
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
      />
    </FormControl>
  )
);

export default CustomCurrencyFieldInput;
