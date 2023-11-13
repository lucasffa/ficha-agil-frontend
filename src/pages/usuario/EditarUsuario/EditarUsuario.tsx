import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Button } from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import './editarUsuario.scss';
import { InputMaskCpf } from '../../../Shared/InputPadraoForm';
import { useState } from 'react';
import { UsuarioProps } from '../UsuarioDashboard/UsuarioDashboard';
import axiosInstance from '../../../components/utils/axios';
import BlockUI from '../../../components/utils/BlockUI/BlockUI';

export default function EditarUsuario() {
  const navigate = useNavigate();
  const location = useLocation();
  const ValuesRefDadosUsuario: UsuarioProps =
    location.state?.ValuesRefDadosUsuario;

  const [cpf, setCpf] = useState(ValuesRefDadosUsuario?.CPF);
  //const [telefone, setTelefone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    //formState: { errors },
  } = useForm<UsuarioProps>({
    //resolver,
    mode: 'onBlur',
    defaultValues: {
      USUARIO: ValuesRefDadosUsuario?.USUARIO,
      CPF: cpf,
      EMAIL: ValuesRefDadosUsuario?.EMAIL,
      ATIVO: ValuesRefDadosUsuario?.ATIVO,
      TELEFONE: undefined,
    },
    criteriaMode: 'all',
  });

  async function salvarUsuario(
    USUARIO: string,
    CPF: string,
    EMAIL: string,
    ATIVO: string,
    IDUSUARIOREQ: string,
    TELEFONE?: string
  ) {
    try {
      setIsLoading(true);
      await axiosInstance
        .put(
          `/updateUser`,
          JSON.stringify({
            USUARIO,
            CPF,
            EMAIL,
            ATIVO,
            IDUSUARIOREQ,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(res => {
          toast.success(`Usuário ${res.data} salvo com sucesso!`);
          navigate('/usuario');
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container-editar-usuario">
      <BlockUI blocking={isLoading} />
      <h1>Editar Usuário</h1>
      <form
        id="form-editar-usuario"
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          if (data) {
            salvarUsuario(
              data.USUARIO,
              data.CPF,
              data.EMAIL,
              data.ATIVO,
              localStorage.getItem('idUsuarioLogado') ?? ''
            );
          }
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="USUARIO"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 1"
                    label="Nome"
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
              control={control}
              name="CPF"
              render={({ field }) => {
                return (
                  <InputMaskCpf
                    value={cpf}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setCpf(event.target.value);
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="EMAIL"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 2"
                    label="E-mail"
                    color="primary"
                    variant="outlined"
                    {...field}
                  />
                );
              }}
            />
          </Grid>

          {/* <Grid item xs={6}>
            <Controller
              control={control}
              name="TELEFONE"
              render={({ field }) => {
                return (
                  <InputMaskTelefone
                    value={telefone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setTelefone(event.target.value);
                    }}
                  />
                );
              }}
            />
          </Grid> */}

          <Grid item xs={6}>
            <Controller
              control={control}
              name="ATIVO"
              render={({ field }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //value={age}
                      label="Age"
                      //onChange={handleChange}
                      {...field}
                    >
                      <MenuItem value="S">Ativo</MenuItem>
                      <MenuItem value="N">Inativo</MenuItem>
                    </Select>
                  </FormControl>
                );
              }}
            />
            {/* <InputErrors error={errors.Senha?.message} /> */}
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Button type="submit">Salvar</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
