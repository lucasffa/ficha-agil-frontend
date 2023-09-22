import React from 'react';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { Ficha } from '../CadastrarCandidato';

interface OutrasFichasGrupoFamiliarProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

//2. OUTRAS FICHAS DO GRUPO FAMILIAR
export default function OutrasFichasGrupoFamiliar(
  props: OutrasFichasGrupoFamiliarProps
) {
  // const  candidato: Ficha['IdentificacaoCandidato'] = {

  // }
  // console.log(candidato);
  return (
    <React.Fragment>
      <div>2. OUTRAS FICHAS DO GRUPO FAMILIAR</div>
      <OutrasFichasGrupoFamiliarComponent
        control={props.control}
        getValues={props.getValues}
        setValue={props.setValue}
        watch={props.watch}
      />
    </React.Fragment>
  );
}

function OutrasFichasGrupoFamiliarComponent(
  props: OutrasFichasGrupoFamiliarProps
) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Controller
          control={props.control}
          name="OutrasFichasGrupoFamiliar.IdFicha"
          render={({ field }) => {
            return (
              <TextField
                fullWidth
                id="outlined-basic 1"
                label="Número"
                color="primary"
                variant="outlined"
                {...field}
                //error={!!errors?.name}
              />
            );
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <Controller
          control={props.control}
          name="OutrasFichasGrupoFamiliar.NomeCompleto"
          render={({ field }) => {
            return (
              <TextField
                fullWidth
                id="outlined-basic 1"
                label="Nome Completo"
                color="primary"
                variant="outlined"
                {...field}
                //error={!!errors?.name}
              />
            );
          }}
        />
      </Grid>

      <Grid item xs={2}>
        <Controller
          control={props.control}
          name="OutrasFichasGrupoFamiliar.IdParentesco"
          render={({ field }) => {
            return (
              <TextField
                fullWidth
                id="outlined-basic 1"
                label="Parentesco"
                color="primary"
                variant="outlined"
                {...field}
                //error={!!errors?.name}
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
}
