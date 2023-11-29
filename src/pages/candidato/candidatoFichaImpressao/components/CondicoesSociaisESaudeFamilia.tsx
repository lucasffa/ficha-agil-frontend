import { Grid, TextField } from '@mui/material';
import React from 'react';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Ficha } from '../CandidatoFichaImpressao';

interface CondicoesSociaisESaudeFamiliaProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}
//6. CONDIÇÕES SOCIAIS E DE SAÚDE DA FAMÍLIA
export default function CondicoesSociaisESaudeFamilia(
  props: CondicoesSociaisESaudeFamiliaProps
) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">
        6. CONDIÇÕES SOCIAIS E DE SAÚDE DA FAMÍLIA
      </div>{' '}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSociaisESaudeFamilia.FamiliarTratamentoMedico`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-11232`}
                label="Alguém da composição familiar está em tratamento médico?"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSociaisESaudeFamilia.FamiliarUsoMedico`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-654232`}
                label="Alguém da composição familiar faz uso contínuo de medicamentos?"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSociaisESaudeFamilia.FamiliarDeficiencia`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-11232`}
                label="Alguém da composição familiar com deficiência (sensorial, auditiva, visual, múltipla, etc.)? (Conforme decreto 3.298/99)"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSociaisESaudeFamilia.FamiliarDependenciaQuimica`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-1564126`}
                label="Alguém na família sofre de dependência química?"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSociaisESaudeFamilia.AcompanhamentoTerapeutico`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-1123121`}
                label="Faz algum tipo de tratamento ou acompanhamento terapêutico/social?"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name={`CondicoesSociaisESaudeFamilia.ProgramaSocial`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-11232`}
                label="Alguém de sua família recebe benefício de programa social?"
                color="primary"
                variant="outlined"
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
