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
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import './editarUsuario.scss';
import {
  InputMaskCpf,
  InputMaskTelefone,
} from '../../../Shared/InputPadraoForm';
import { useState } from 'react';
import { UsuarioProps } from '../UsuarioDashboard/UsuarioDashboard';

type EditarUsuarioProps = {
  urlBase: string;
};

export default function EditarUsuario({ urlBase }: EditarUsuarioProps) {
  const location = useLocation();
  const ValuesRefDadosUsuario: UsuarioProps =
    location.state?.ValuesRefDadosUsuario;

  const [cpf, setCpf] = useState(ValuesRefDadosUsuario?.CPF);
  const [telefone, setTelefone] = useState('');

  // function removeMask(value: string) {
  //   return value?.replace(/[.-\s]/g, '');
  // }

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
    TELEFONE?: string
  ) {
    try {
      await axios
        .put(
          `${urlBase}/updateUser`,
          JSON.stringify({
            USUARIO,
            CPF,
            EMAIL,
            ATIVO,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(res => {
          toast.success(`Usuário ${res.data} salvo com sucesso!`);
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }

  return (
    <div className="container-editar-usuario">
      <h1>Editar Usuário</h1>
      <form
        id="form-editar-usuario"
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          if (data) {
            salvarUsuario(data.USUARIO, data.CPF, data.EMAIL, data.ATIVO);
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

          <Grid item xs={6}>
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
          </Grid>

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
          <Grid item xs={6}>
            <Button type="submit">Salvar</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
