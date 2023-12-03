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
  FieldErrors,
} from 'react-hook-form';
import React, { useEffect } from 'react';
import {
  InputComMascara,
  MascaraInput,
} from '../../../../Shared/InputPadraoForm';
import {
  EstadoCivil,
  Ficha,
  Parentesco,
  RacaEtnia,
  SituacaoTrabalhista,
} from '../CandidatoFicha';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';

interface IdentificacaoCandidatoProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
  situacaoTrabalhista: SituacaoTrabalhista[] | undefined;
  racaEtnia: RacaEtnia[] | undefined;
  estadoCivil: EstadoCivil[] | undefined;
  parentesco: Parentesco[] | undefined;
  errors: FieldErrors<Ficha>;
}

//1. IDENTIFICAÇÃO DO CANDIDATO
export function IdentificacaoCandidato(props: IdentificacaoCandidatoProps) {
  useEffect(() => {
    registerLocale('pt-BR', ptBR);
  }, []);

  function calcularIdade(dataNascimento: Date | null) {
    if (dataNascimento === null) {
      return '';
    }
    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    // Verificar se o aniversário já ocorreu neste ano
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNasc = dataNasc.getMonth();
    const diaNasc = dataNasc.getDate();

    if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
      idade--;
    }

    return idade + ' anos';
  }

  return (
    <React.Fragment>
      <div className="cabecalho-form">1. IDENTIFICAÇÃO DO CANDIDATO</div>

      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.NomeCompleto"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 1"
                  label="Nome Completo"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.NomeCompleto}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.CadUnico"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 1"
                  label="Nº Cad. Único"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.CadUnico}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Cpf"
            render={({ field }) => {
              return (
                <InputComMascara
                  name="Cpf"
                  mask={MascaraInput.cpf}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!props.errors.IdentificacaoCandidato?.Cpf}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.DocIdentidade"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 2"
                  label="Doc. Identidade"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.DocIdentidade}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.DataNascimento"
            render={({ field }) => {
              const dateValue = field.value ? new Date(field.value) : null;
              return (
                <DatePicker
                  selected={dateValue}
                  onChange={(date: Date) => {
                    field.onChange(date);
                  }}
                  locale="pt-BR"
                  dateFormat="P"
                  popperClassName="datePickerPopper"
                  customInput={
                    <TextField
                      fullWidth
                      id="outlined-basic 3123"
                      label="Data de Nascimento"
                      color="primary"
                      variant="outlined"
                      value={
                        field.value
                          ? new Date(field.value).toLocaleDateString('pt-BR')
                          : ''
                      }
                      error={
                        !!props.errors.IdentificacaoCandidato?.DataNascimento
                      }
                    />
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Naturalidade"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 3"
                  label="Naturalidade"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.Naturalidade}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            id="outlined-basic 3"
            label="Idade"
            color="primary"
            variant="outlined"
            value={`${calcularIdade(
              props.watch('IdentificacaoCandidato.DataNascimento')
            )}`}
            disabled
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.IdRacaEtnia"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Raça/Etnia
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Raça/Etnia"
                    {...field}
                    error={!!props.errors.IdentificacaoCandidato?.IdRacaEtnia}
                  >
                    {props?.racaEtnia?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDRACAETNIA}>
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
        <Grid
          item
          xs={
            props.watch('IdentificacaoCandidato.IdSitTrabalhista') === 1 ? 2 : 4
          }
        >
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.IdSitTrabalhista"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Situação Trabalhista
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Situação Trabalhista"
                    {...field}
                    error={
                      !!props.errors.IdentificacaoCandidato?.IdSitTrabalhista
                    }
                  >
                    {props?.situacaoTrabalhista?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDSITTRABALHISTA}>
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
        {props.getValues('IdentificacaoCandidato.IdSitTrabalhista') === 1 ? (
          <Grid item xs={2}>
            <Controller
              control={props.control}
              name="IdentificacaoCandidato.OutraSitTrabalhista"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      id="outlined-basic 3"
                      label="Outro"
                      color="primary"
                      variant="outlined"
                      {...field}
                      error={
                        !!props.errors.IdentificacaoCandidato
                          ?.OutraSitTrabalhista
                      }
                    />
                  </FormControl>
                );
              }}
            />
          </Grid>
        ) : null}
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.IdEstadoCivil"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Estado Civil
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Estado Civil"
                    {...field}
                    error={!!props.errors.IdentificacaoCandidato?.IdEstadoCivil}
                  >
                    {props?.estadoCivil?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDESTADOCIVIL}>
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
            name="IdentificacaoCandidato.Email"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 3"
                  label="Email"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.Email}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.NecessidadeEspecial"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 4"
                  label="Alguma Necessidade Especial"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={
                    !!props.errors.IdentificacaoCandidato?.NecessidadeEspecial
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.EnderecoResidencial"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 5"
                  label="Endereço Residencial"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={
                    !!props.errors.IdentificacaoCandidato?.EnderecoResidencial
                  }
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Numero"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 6"
                  label="Número"
                  color="primary"
                  variant="outlined"
                  type="number"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.Numero}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Bairro"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 8"
                  label="Bairro"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.Bairro}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Complemento"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 7"
                  label="Complemento (Casa, Bloco, Ap.)"
                  color="primary"
                  variant="outlined"
                  {...field}
                  error={!!props.errors.IdentificacaoCandidato?.Complemento}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Cep"
            render={({ field }) => {
              return (
                <InputComMascara
                  name="Cep"
                  mask={MascaraInput.cep}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!props.errors.IdentificacaoCandidato?.Cep}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.TelefoneResidencial"
            render={({ field }) => {
              return (
                <InputComMascara
                  name="Telefone Residencial"
                  mask={MascaraInput.telefoneResidencial}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.TelefoneRecado"
            render={({ field }) => {
              return (
                <InputComMascara
                  name="Telefone Recado"
                  mask={MascaraInput.telefoneRecado}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.TelefoneCelular"
            render={({ field }) => {
              return (
                <InputComMascara
                  name="Telefone Celular"
                  mask={MascaraInput.telefone}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export function IdentificacaoCandidatoPaiMae(
  props: IdentificacaoCandidatoProps
) {
  return (
    <React.Fragment>
      <div className="cabecalho-form">
        1. IDENTIFICAÇÃO DO CANDIDATO (CONTINUAÇÃO)
      </div>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.NomePai"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 9"
                  label="Nome do Pai"
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
            name="IdentificacaoCandidato.CpfPai"
            render={({ field }) => {
              return (
                <InputComMascara
                  mask={MascaraInput.cpf}
                  name="Cpf Pai"
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.NomeMae"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 11"
                  label="Nome da Mãe"
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
            name="IdentificacaoCandidato.CpfMae"
            render={({ field }) => {
              return (
                <InputComMascara
                  mask={MascaraInput.cpf}
                  name="Cpf Mãe"
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.NomeResponsavel"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 13"
                  label="Responsável pelo candidato"
                  color="primary"
                  variant="outlined"
                  {...field}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.IdParentescoResponsavel"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Parentesco
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Parentesco"
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
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.IdEstadoCivilPai"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Estado Civil Pai
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Estado Civil"
                    {...field}
                  >
                    {props?.estadoCivil?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDESTADOCIVIL}>
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
        <Grid item xs={6}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.IdEstadoCivilMae"
            render={({ field }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Estado Civil Mãe
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Estado Civil"
                    {...field}
                  >
                    {props?.estadoCivil?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.IDESTADOCIVIL}>
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
      </Grid>
    </React.Fragment>
  );
}
