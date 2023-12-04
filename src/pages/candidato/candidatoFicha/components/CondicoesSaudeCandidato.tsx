import { Grid, TextField } from "@mui/material";
import React from "react";
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Ficha } from "../CandidatoFicha";
import {
  InputComMascara,
  MascaraInput,
} from "../../../../Shared/InputPadraoForm";

interface CondicoesSaudeCandidatoProps {
  errors: any;
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}
//5. CONDIÇÕES DE SAÚDE DO CANDIDATO
export default function CondicoesSaudeCandidato(
  props: CondicoesSaudeCandidatoProps
) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">5. CONDIÇÕES DE SAÚDE DO CANDIDATO</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSaudeCandidato.NomeContatoEmergencia`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-1`}
                label="Nome do contato em caso de emergência médica"
                color="primary"
                variant="outlined"
                {...field}
                error={
                  !!props.errors.CondicoesSaudeCandidato?.NomeContatoEmergencia
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="CondicoesSaudeCandidato.TelefoneEmergencia1"
            render={({ field }) => {
              return (
                <InputComMascara
                  mask={MascaraInput.telefone}
                  name="Telefone de Emergência 1"
                  value={field.value}
                  onChange={field.onChange}
                  error={
                    !!props.errors.CondicoesSaudeCandidato?.TelefoneEmergencia1
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="CondicoesSaudeCandidato.TelefoneEmergencia2"
            render={({ field }) => {
              return (
                <InputComMascara
                  mask={MascaraInput.telefone}
                  name="Telefone de Emergência 2"
                  value={field.value}
                  onChange={field.onChange}
                  error={
                    !!props.errors.CondicoesSaudeCandidato?.TelefoneEmergencia2
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name={`CondicoesSaudeCandidato.Alergia`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-1`}
                label="É alérgico a alguma substância ou medicamento?"
                color="primary"
                variant="outlined"
                {...field}
                error={!!props.errors.CondicoesSaudeCandidato?.Alergia}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name={`CondicoesSaudeCandidato.SitMedicaEspecial`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-12321`}
                label="Possui alguma situação médica especial?"
                color="primary"
                variant="outlined"
                {...field}
                error={
                  !!props.errors.CondicoesSaudeCandidato?.SitMedicaEspecial
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name={`CondicoesSaudeCandidato.FraturasCirurgias`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-334`}
                label="Possui fraturas ou cirurgias recentes?"
                color="primary"
                variant="outlined"
                {...field}
                error={
                  !!props.errors.CondicoesSaudeCandidato?.FraturasCirurgias
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSaudeCandidato.MedicacaoControlada`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-2`}
                label="Faz uso de medicação controlada?"
                color="primary"
                variant="outlined"
                {...field}
                error={
                  !!props.errors.CondicoesSaudeCandidato?.MedicacaoControlada
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSaudeCandidato.ProvidenciaRecomendada`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-2132`}
                label="Alguma providência recomendada em caso de emergência médica?"
                color="primary"
                variant="outlined"
                {...field}
                error={
                  !!props.errors.CondicoesSaudeCandidato?.ProvidenciaRecomendada
                }
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
