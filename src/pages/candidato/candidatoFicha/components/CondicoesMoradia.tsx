import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { CoberturaMoradia, Ficha, Parentesco } from '../CandidatoFicha';
import CurrencyFieldInput from '../../../../Shared/InputMaskCurrency';
interface CondicoesMoradiaProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
  coberturaMoradia: CoberturaMoradia[] | undefined;
  parentesco: Parentesco[] | undefined;
}

//7. CONDIÇÕES DE MORADIA
export default function CondicoesMoradia(props: CondicoesMoradiaProps) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">7. CONDIÇÕES DE MORADIA</div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="CondicoesMoradia.AguaPotavel"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Possuí agua potável
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Possuí agua potável"
                    {...field}
                  >
                    return (<MenuItem value="S">Sim</MenuItem>
                    <MenuItem value="N">Não</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="CondicoesMoradia.RedeEsgoto"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Possuí rede de esgoto
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Possuí rede de esgoto"
                    {...field}
                  >
                    return (<MenuItem value="S">Sim</MenuItem>
                    <MenuItem value="N">Não</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="CondicoesMoradia.IdCoberturaMoradia"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tipo da cobertura da moradia
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo da cobertura da moradia"
                    {...field}
                  >
                    {props?.coberturaMoradia?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDCOBERTURAMORADIA}>
                          {item.DESCRICAO}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="CondicoesMoradia.RuaPavimentada"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    A rua é pavimentada
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="A rua é pavimentada"
                    {...field}
                  >
                    return (<MenuItem value="S">Sim</MenuItem>
                    <MenuItem value="N">Não</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="CondicoesMoradia.PossuiEletricidade"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Possuí eletricidade
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Possuí agua potável"
                    {...field}
                  >
                    return (<MenuItem value="S">Sim</MenuItem>
                    <MenuItem value="N">Não</MenuItem>
                    <MenuItem value="C">Coletiva</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name={`CondicoesMoradia.ComodosMoradia`}
            render={({ field }) => (
              <TextField
                fullWidth
                id={`outlined-basic-11232`}
                label="Número de cômodos da moradia"
                color="primary"
                variant="outlined"
                type="number"
                {...field}
              />
            )}
          />
        </Grid>
        <Grid
          item
          xs={
            props.watch('CondicoesMoradia.TipoImovelResidencia') !== '' &&
            props.watch('CondicoesMoradia.TipoImovelResidencia') !== 'P'
              ? 6
              : 12
          }
        >
          <Controller
            control={props.control}
            name="CondicoesMoradia.TipoImovelResidencia"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    O imóvel em que o candidato reside é
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Situação Trabalhista"
                    {...field}
                  >
                    return (<MenuItem value="P">Próprio</MenuItem>
                    <MenuItem value="A">Alugado</MenuItem>
                    <MenuItem value="C">Cedido</MenuItem>
                    <MenuItem value="F">Financiado</MenuItem>
                    );
                  </Select>
                </FormControl>
              );
            }}
          />
        </Grid>
        {props.getValues('CondicoesMoradia.TipoImovelResidencia') === 'A' ? (
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.ValorAluguel"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <CurrencyFieldInput label="Valor do Aluguel" {...field} />
                  </FormControl>
                );
              }}
            />
          </Grid>
        ) : null}
        {props.getValues('CondicoesMoradia.TipoImovelResidencia') === 'C' ? (
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.IdParentescoProprietario"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Parentesco com o proprietário
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Parentesco com o proprietário"
                      {...field}
                    >
                      {props?.parentesco?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.IDPARENTESCO}>
                            {item.DESCRICAO}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
              }}
            />
          </Grid>
        ) : null}
        {props.getValues('CondicoesMoradia.TipoImovelResidencia') === 'F' ? (
          <Grid item xs={6}>
            <Controller
              control={props.control}
              name="CondicoesMoradia.PrestacaoFinanciamento"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-basic 3"
                      label="Valor da prestação"
                      color="primary"
                      variant="outlined"
                      {...field}
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
        ) : null}
      </Grid>
    </React.Fragment>
  );
}
