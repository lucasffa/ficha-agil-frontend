import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Ficha } from "../CandidatoFicha";
import React from "react";
import { FormControl, Grid } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
interface OutrosGastosProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

export default function OutrosGastos(props: OutrosGastosProps) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">10. OUTROS GASTOS</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="OutrosGastos"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <TextareaAutosize
                    placeholder="Expor outros gastos do candidato ou grupo familiar"
                    minRows={3}
                    style={{
                      borderRadius: "12px 12px 0 12px",
                      padding: "12px",
                    }}
                    defaultValue={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
