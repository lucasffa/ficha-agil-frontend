import React, { useCallback, useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Ficha } from '../CadastrarCandidato';
import axiosInstance from '../../../../components/utils/axios';
import { toast } from 'react-toastify';

interface DadosEducacionaisCandidatoProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}
type Escolaridade = {
  IDESCOLARIDADE: number;
  DESCRICAO: string;
};
//3. DADOS EDUCACIONAIS DO CANDIDATO
export default function DadosEducacionaisCandidato(
  props: DadosEducacionaisCandidatoProps
) {
  const [escolaridade, setEscolaridade] = useState<Escolaridade[]>();

  const getEscolaridade = useCallback(async () => {
    try {
      await axiosInstance.get(`/escolaridade`).then(res => {
        setEscolaridade(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  useEffect(() => {
    getEscolaridade();
  }, [getEscolaridade]);
  return (
    <React.Fragment>
      <div className="cabecalho-form">3. DADOS EDUCACIONAIS DO CANDIDATO</div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.Estuda"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Estuda</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Estuda"
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
            name="DadosEducacionaisCandidato.InstituicaoEnsino"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Instituição de Ensino
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Instituição de Ensino"
                    {...field}
                  >
                    return (<MenuItem value="U">Pública</MenuItem>
                    <MenuItem value="I">Privada</MenuItem>
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
            name="DadosEducacionaisCandidato.NomeInstituicaoEnsino"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Nome da Escola/Instituição de Ensino"
                  color="primary"
                  variant="outlined"
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.EnderecoInstituicao"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Endereço da instituição de ensino"
                  color="primary"
                  variant="outlined"
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.BairroInstituicao"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Bairro"
                  color="primary"
                  variant="outlined"
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.BairroInstituicao"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Série atual"
                  color="primary"
                  variant="outlined"
                  type="number"
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.Turma"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Turma"
                  color="primary"
                  variant="outlined"
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.Turno"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Turno</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Turno"
                    {...field}
                  >
                    return (<MenuItem value="M">Manhã</MenuItem>
                    <MenuItem value="T">Tarde</MenuItem>{' '}
                    <MenuItem value="N">Noite</MenuItem>
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
            name="DadosEducacionaisCandidato.IdEscolaridade"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Escolaridade
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Escolaridade"
                    {...field}
                    value={
                      props.control._fields[
                        'DadosEducacionaisCandidato.IdEscolaridade'
                      ]
                    }
                  >
                    {escolaridade?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDESCOLARIDADE}>
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
        <Grid item xs={12}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.OutrosCursosRealizados"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Outros cursos já realizados (em qualquer instituição)"
                  color="primary"
                  variant="outlined"
                  {...field}
                />
              );
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
