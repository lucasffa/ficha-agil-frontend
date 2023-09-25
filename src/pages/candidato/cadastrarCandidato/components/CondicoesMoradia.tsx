import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Ficha } from '../CadastrarCandidato';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../components/utils/axios';

interface CondicoesMoradiaProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}
type CoberturaMoradia = {
  DESCRICAO: string;
  IDCOBERTURAMORADIA: number;
};
//7. CONDIÇÕES DE MORADIA
export default function CondicoesMoradia(props: CondicoesMoradiaProps) {
  const [coberturaMoradia, setCoberturaMoradia] =
    useState<CoberturaMoradia[]>();
  const getCoberturaMoradia = useCallback(async () => {
    try {
      await axiosInstance.get(`/coberturamoradia`).then(res => {
        setCoberturaMoradia(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  useEffect(() => {
    getCoberturaMoradia();
  }, [getCoberturaMoradia]);

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
                    value={
                      props.control._fields[
                        'CondicoesMoradia.IdCoberturaMoradia'
                      ]
                    }
                  >
                    {coberturaMoradia?.map((item, index) => {
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
      </Grid>
    </React.Fragment>
  );
}
