import { FormControl, Grid, TextField } from '@mui/material';
import React from 'react';
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Ficha } from '../CandidatoFicha';
import CurrencyFieldInput from '../../../../Shared/InputMaskCurrency';

interface DespesasProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

//9. DESPESAS
export default function Despesas(props: DespesasProps) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">9. DESPESAS</div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasDescontos"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput
                    label="Descontos obrigatórios"
                    {...field}
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasRendaBruta"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Renda bruta" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasMoradia"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Moradia" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasRendaLiquida"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Renda líquida" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasEducacao"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Educação" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasPessoasResidencia"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="outlined-basic 3"
                    label="Número de pessoas na residência"
                    color="primary"
                    variant="outlined"
                    type="number"
                    {...field}
                  />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasSaude"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Saúde" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasRpc"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="RPC" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasTotal"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <CurrencyFieldInput label="Total" {...field} />
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="Despesas.DespesasObs"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    id="outlined-basic 3"
                    label="Observações"
                    color="primary"
                    variant="outlined"
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
