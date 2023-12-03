import React from "react";
import { FormControl, Grid } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Ficha } from "../CandidatoFicha";

interface ObservacoesNecessariasProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

export default function ObservacoesNecessarias(
  props: ObservacoesNecessariasProps
) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">
        12. OBSERVAÇÕES QUE O CANDIDATO OU O ENTREVISTADOR JULGUEM NECESSÁRIAS
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="ObservacoesNecessarias"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextareaAutosize
                  placeholder="Observação"
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
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
