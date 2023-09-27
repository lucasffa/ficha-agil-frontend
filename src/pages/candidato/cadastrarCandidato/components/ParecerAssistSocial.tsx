import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Ficha } from '../CadastrarCandidato';
import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

interface ParecerAssistSocialProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

//13. PARECER DO (A) ASSISTENTE SOCIAL
export default function ParecerAssistSocial(props: ParecerAssistSocialProps) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">13. PARECER DO (A) ASSISTENTE SOCIAL</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="ParecerAssistSocial.ParecerAssistSocial"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <TextareaAutosize
                    minRows={3}
                    style={{
                      borderRadius: '12px 12px 0 12px',
                      padding: '12px',
                    }}
                    {...field}
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="ParecerAssistSocial.StatusProcesso"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    O Processo foi{' '}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="O Processo foi  "
                    {...field}
                  >
                    return (<MenuItem value="D">Deferido</MenuItem>
                    <MenuItem value="A">Em Análise</MenuItem>
                    <MenuItem value="I">Indeferido</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
