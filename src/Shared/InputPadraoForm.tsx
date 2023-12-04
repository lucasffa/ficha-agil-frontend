import React from "react";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";
import uniqid from "uniqid";
export class MascaraInput {
  static cpf = "999.999.999-99";
  static cep = "99999-999";
  static telefone = "(99)99999-9999";
  static telefoneResidencial = "(99)9999-9999";
  static telefoneRecado = "(99)9999-9999";
  static horario = "99:99";
}

type PropsInput = {
  mask: string;
  value?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  event?: React.ChangeEvent<HTMLInputElement>;
  error?: {};
};

export const InputComMascara = React.forwardRef((props: PropsInput, ref) => (
  <InputMask
    mask={props.mask}
    onChange={props.onChange}
    value={props.value}
    inputRef={ref as React.Ref<HTMLInputElement>}
  >
    {
      <TextField
        id={`outlined-basic ${uniqid()}`}
        label={props.name}
        color="primary"
        variant="outlined"
        type="text"
        name=""
        onChange={props.onChange}
        value={props.value}
        error={!!props.error}
        inputRef={ref}
        fullWidth
      />
    }
  </InputMask>
));
