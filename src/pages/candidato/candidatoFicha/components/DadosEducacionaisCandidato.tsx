import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Escolaridade, Ficha } from "../CandidatoFicha";

interface DadosEducacionaisCandidatoProps {
  errors: any;
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
  escolaridade: Escolaridade[] | undefined;
}

//3. DADOS EDUCACIONAIS DO CANDIDATO
export default function DadosEducacionaisCandidato(
  props: DadosEducacionaisCandidatoProps
) {
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
                    error={!!props.errors.DadosEducacionaisCandidato?.Estuda}
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
                    error={
                      !!props.errors.DadosEducacionaisCandidato
                        ?.InstituicaoEnsino
                    }
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
            name="DadosEducacionaisCandidato.NomeInstituicao"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Nome da Escola/Instituição de Ensino"
                  color="primary"
                  variant="outlined"
                  error={
                    !!props.errors.DadosEducacionaisCandidato?.NomeInstituicao
                  }
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
                  error={
                    !!props.errors.DadosEducacionaisCandidato
                      ?.EnderecoInstituicao
                  }
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
                  error={
                    !!props.errors.DadosEducacionaisCandidato?.BairroInstituicao
                  }
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="DadosEducacionaisCandidato.SerieAtual"
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
                  error={!!props.errors.DadosEducacionaisCandidato?.SerieAtual}
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
                  error={!!props.errors.DadosEducacionaisCandidato?.Turma}
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
                    error={!!props.errors.DadosEducacionaisCandidato?.Turno}
                    {...field}
                  >
                    return (<MenuItem value="M">Manhã</MenuItem>
                    <MenuItem value="T">Tarde</MenuItem>{" "}
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
                    error={
                      !!props.errors.DadosEducacionaisCandidato?.IdEscolaridade
                    }
                    {...field}
                  >
                    {props?.escolaridade?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.IDESCOLARIDADE}>
                          {item?.DESCRICAO}
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
                  error={
                    !!props.errors.DadosEducacionaisCandidato
                      ?.OutrosCursosRealizados
                  }
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
