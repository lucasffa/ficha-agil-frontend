import { Controller, useForm } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { Button } from '../../../components/Button/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './adicionarUsuario.scss';
type AdicionarUsuarioProps = {
  urlBase: string;
};

export interface UsuarioProps {
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  datNasc: Date;
  genero: string;
  password: string;
  confirmarSenha: string;
}

export default function AdicionarUsuario({ urlBase }: AdicionarUsuarioProps) {
  const navigate = useNavigate();

  function mascaraCpf(cpfValue: any) {
    cpfValue.value = cpfValue.value.replace(/\D/g, '');
    cpfValue.value = cpfValue.value.substring(0, 11);
    cpfValue.value = cpfValue.value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );

    return cpfValue;
  }

  function mascarCelular(celular: any) {
    console.log(celular.value);
    const cleanedCellphone = celular.value.replace(/\D/g, '');

    if (cleanedCellphone.length === 11) {
      return `(${cleanedCellphone.substring(
        0,
        2
      )}) ${cleanedCellphone.substring(2, 6)}-${cleanedCellphone.substring(6)}`;
    }

    return celular.value;
  }

  function removeMask(value: string) {
    return value?.replace(/[.-\s]/g, '');
  }

  const {
    control,
    handleSubmit,
    //formState: { errors },
  } = useForm<UsuarioProps>({
    //resolver,
    mode: 'onBlur',
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      telefone: '',
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
      await axios
        .post(
          `${urlBase}/createUser`,
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
    }
  }

  return (
    <div className="container-adiconar-usuario">
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
                    id="outlined-basic"
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
              name="cpf"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label="Cpf"
                    color="primary"
                    variant="outlined"
                    onInput={e => mascaraCpf(e.target)}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
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
              name="telefone"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label="Telefone"
                    color="primary"
                    variant="outlined"
                    onInput={e => mascarCelular(e.target)}
                    {...field}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label="Senha"
                    color="primary"
                    variant="outlined"
                    {...field}
                    // error={!!errors.Senha}
                  />
                );
              }}
            />
            {/* <InputErrors error={errors.Senha?.message} /> */}
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="confirmarSenha"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label="Confirmar Senha"
                    color="primary"
                    variant="outlined"
                    {...field}
                    // error={!!errors.Senha}
                  />
                );
              }}
            />
            {/* <InputErrors error={errors.Senha?.message} /> */}
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Button type="submit">Adicionar</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
