import { Controller, useForm } from 'react-hook-form';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Button } from '../../../components/Button/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './adicionarUsuario.scss';
import { InputComMascara, MascaraInput } from '../../../Shared/InputPadraoForm';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputErrors from '../../../components/Errors/Errors';
import axiosInstance from '../../../components/utils/axios';
import BlockUI from '../../../components/utils/BlockUI/BlockUI';

export interface UsuarioProps {
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  datNasc: Date;
  genero: string;
  password: string;
  confirmarSenha: string;
  status?: string;
}

export default function AdicionarUsuario() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function removeMask(value: string) {
    return value?.replace(/[.-\s]/g, '');
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    email: Yup.string().required('E-mail é obrigatório'),
    //telefone: Yup.string().required('Telefone obrigatório'),
    //datanasc: Yup.string().required('Data de nascimento obrigatório'),
    //genero: Yup.string().required('Gênero obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
    confirmarSenha: Yup.string()
      .required('Confirmar senha é obrigatória')
      .oneOf([Yup.ref('password'), ''], 'As senhas não coincidem'),
  });

  const resolver = yupResolver(validationSchema);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioProps>({
    resolver,
    mode: 'onBlur',
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      telefone: '',
      password: '',
      confirmarSenha: '',
    },
    criteriaMode: 'all',
  });

  async function createUser(
    name: string,
    cpf: string,
    //created_at: string,
    email: string,
    password: string
  ) {
    try {
      setIsLoading(true);
      await axiosInstance
        .post(
          `/createUser`,
          JSON.stringify({
            name,
            cpf,
            email,
            password,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(res => {
          toast.success(`Usuário ${res.data} adicionado com sucesso!`);
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

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleClickShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className="container-adiconar-usuario">
      <BlockUI blocking={isLoading} />
      <h1>Adicionar Usuário</h1>
      <form
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          if (data) {
            createUser(
              data.name,
              removeMask(data.cpf),
              data.email,
              data.password
            );
          }
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 1"
                    label="Nome"
                    color="primary"
                    variant="outlined"
                    {...field}
                    error={!!errors?.name}
                  />
                );
              }}
            />
            <InputErrors error={errors.name?.message} />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="cpf"
              render={({ field }) => {
                return (
                  <InputComMascara
                    name="Cpf"
                    mask={MascaraInput.cpf}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors?.cpf}
                  />
                );
              }}
            />
            <InputErrors error={errors.cpf?.message} />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 2"
                    label="E-mail"
                    color="primary"
                    variant="outlined"
                    {...field}
                    error={!!errors?.email}
                  />
                );
              }}
            />
            <InputErrors error={errors.email?.message} />
          </Grid>
          {/*  <Grid item xs={6}>
            <Controller
              control={control}
              name="telefone"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 3"
                    label="Telefone"
                    color="primary"
                    variant="outlined"
                    onInput={e => mascarCelular(e.target)}
                    {...field}
                    error={!!errors?.telefone}
                  />
                );
              }}
            />
             <InputErrors error={errors.telefone?.message} />  
          </Grid>*/}
          <Grid item xs={6}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 6"
                    label="Senha"
                    color="primary"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            type="button"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                    error={!!errors?.password}
                  />
                );
              }}
            />
            <InputErrors error={errors.password?.message} />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="confirmarSenha"
              render={({ field }) => {
                return (
                  <TextField
                    fullWidth
                    id="outlined-basic 7"
                    label="Confirmar Senha"
                    color="primary"
                    variant="outlined"
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            type="button"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                    error={!!errors?.confirmarSenha}
                  />
                );
              }}
            />
            <InputErrors error={errors.confirmarSenha?.message} />
          </Grid>

          {/* <Grid item xs={6}></Grid> */}
          <Grid item xs={6}>
            <Button type="submit">Adicionar</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
