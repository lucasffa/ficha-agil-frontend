import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Ficha } from '../CandidatoFicha';
import React from 'react';
import { FormControl, Grid } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

interface SituacaoSocioEconomicaFamiliarProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

//11. SITUAÇÃO SOCIOECONÔMICA FAMILIAR
export default function SituacaoSocioEconomicaFamiliar(
  props: SituacaoSocioEconomicaFamiliarProps
) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">11. SITUAÇÃO SOCIOECONÔMICA FAMILIAR</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="SitSocioEconomicoFamiliar"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <TextareaAutosize
                    minRows={7}
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
      </Grid>
    </React.Fragment>
  );
}
