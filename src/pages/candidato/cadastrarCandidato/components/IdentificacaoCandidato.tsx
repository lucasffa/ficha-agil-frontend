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
import React, { useCallback, useEffect, useState } from 'react';
import {
  InputMaskCep,
  InputMaskCpf,
  InputMaskTelefone,
  InputMaskTelefoneRecado,
  InputMaskTelefoneResidencial,
} from '../../../../Shared/InputPadraoForm';
import { Ficha } from '../CadastrarCandidato';
import { toast } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axiosInstance from '../../../../components/utils/axios';

interface IdentificacaoCandidatoProps {
  control: Control<Ficha>;
  getValues: UseFormGetValues<Ficha>;
  setValue: UseFormSetValue<Ficha>;
  watch: UseFormWatch<Ficha>;
}

type SituacaoTrabalhista = {
  IDSITTRABALHISTA: number;
  DESCRICAO: string;
  ATIVO: string;
};

type RacaEtnia = {
  IDRACAETNIA: number;
  DESCRICAO: string;
  ATIVO: string;
};

type EstadoCivil = {
  IDESTADOCIVIL: number;
  DESCRICAO: string;
  ATIVO: string;
};

//1. IDENTIFICAÇÃO DO CANDIDATO
export function IdentificacaoCandidato(props: IdentificacaoCandidatoProps) {
  const [situacaoTrabalhista, setSituacaoTrabalhista] =
    useState<SituacaoTrabalhista[]>();
  const [racaEtnia, setRacaEtnia] = useState<RacaEtnia[]>();
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>();

  const getRacaEtnia = useCallback(async () => {
    try {
      await axiosInstance.get(`/racaEtnia`).then(res => {
        setRacaEtnia(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getSituacaoTrabalhista = useCallback(async () => {
    try {
      await axiosInstance.get(`/situacaoTrabalhista`).then(res => {
        setSituacaoTrabalhista(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  const getEstadoCivil = useCallback(async () => {
    try {
      await axiosInstance.get(`/estadocivil`).then(res => {
        setEstadoCivil(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  useEffect(() => {
    getRacaEtnia();
    getSituacaoTrabalhista();
    getEstadoCivil();
  }, [getRacaEtnia, getSituacaoTrabalhista, getEstadoCivil]);

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
        <Grid item xs={12}>
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
                  //error={!!errors?.name}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.Cpf"
            render={() => {
              return (
                <InputMaskCpf
                  value={props.getValues('IdentificacaoCandidato.Cpf')}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setValue(
                      'IdentificacaoCandidato.Cpf',
                      event.target.value
                    );
                  }}
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
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Data de Nascimento"
                    onChange={newValue => {
                      props.setValue(
                        'IdentificacaoCandidato.DataNascimento',
                        newValue
                      );
                      calcularIdade(newValue);
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
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
                    value={
                      props.control._fields[
                        'IdentificacaoCandidato.IdRacaEtnia'
                      ]
                    }
                  >
                    {racaEtnia?.map((item, index) => {
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
                    value={
                      props.control._fields[
                        'IdentificacaoCandidato.IdSitTrabalhista'
                      ]
                    }
                  >
                    {situacaoTrabalhista?.map((item, index) => {
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
                    value={
                      props.control._fields[
                        'IdentificacaoCandidato.IdEstadoCivil'
                      ]
                    }
                  >
                    {estadoCivil?.map((item, index) => {
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
                <InputMaskCep
                  value={props.getValues('IdentificacaoCandidato.Cep')}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setValue(
                      'IdentificacaoCandidato.Cep',
                      event.target.value
                    );
                  }}
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
                <InputMaskTelefoneResidencial
                  value={props.getValues(
                    'IdentificacaoCandidato.TelefoneResidencial'
                  )}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setValue(
                      'IdentificacaoCandidato.TelefoneResidencial',
                      event.target.value
                    );
                  }}
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
                <InputMaskTelefoneRecado
                  value={props.getValues(
                    'IdentificacaoCandidato.TelefoneRecado'
                  )}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setValue(
                      'IdentificacaoCandidato.TelefoneRecado',
                      event.target.value
                    );
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            control={props.control}
            name="IdentificacaoCandidato.TelefoneCelular"
            render={() => {
              return (
                <InputMaskTelefone
                  value={props.getValues(
                    'IdentificacaoCandidato.TelefoneCelular'
                  )}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setValue(
                      'IdentificacaoCandidato.TelefoneCelular',
                      event.target.value
                    );
                  }}
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
  const [estadoCivil, setEstadoCivil] = useState<EstadoCivil[]>();
  const getEstadoCivil = useCallback(async () => {
    try {
      await axiosInstance.get(`/estadocivil`).then(res => {
        setEstadoCivil(res.data);
      });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }, []);

  useEffect(() => {
    getEstadoCivil();
  }, [getEstadoCivil]);
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
                <TextField
                  fullWidth
                  id="outlined-basic 10"
                  label="Cpf Pai"
                  color="primary"
                  variant="outlined"
                  {...field}
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
                <TextField
                  fullWidth
                  id="outlined-basic 12"
                  label="Cpf Mãe"
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
            name="IdentificacaoCandidato.NomeResponsavel"
            render={({ field }) => {
              return (
                <TextField
                  fullWidth
                  id="outlined-basic 13"
                  label="Responsável pelo candidato (nome e parentesco)"
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
                    value={
                      props.control._fields[
                        'IdentificacaoCandidato.IdEstadoCivilPai'
                      ]
                    }
                  >
                    {estadoCivil?.map((item, index) => {
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
                    value={
                      props.control._fields[
                        'IdentificacaoCandidato.IdEstadoCivilMae'
                      ]
                    }
                  >
                    {estadoCivil?.map((item, index) => {
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
