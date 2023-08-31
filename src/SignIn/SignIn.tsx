import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';

import itakaLogo from '../assets/images/logo-itaka.png';
import InputErrors from '../components/Errors/Errors';
import { ButtonLink } from '../components/Button/Button';
import PrivateRoutes from '../components/utils/PrivateRoutes';

import './signIn.scss';
import { toast } from 'react-toastify';

type SignInProps = {
  urlBase: string;
};

type SignInForm = {
  Email: string;
  Senha: string;
};

export default function SignIn({ urlBase }: SignInProps) {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    Email: Yup.string().required('E-mail obrigatório'),
    Senha: Yup.string().required('Senha obrigatória'),
  });

  const navigate = useNavigate();
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const resolver = yupResolver(validationSchema);

  async function postSignIn(email: string, password: string) {
    try {
      await axios
        .post(`${urlBase}/login`, JSON.stringify({ email, password }), {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
          toast.success('Login feito com sucesso!');
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', res.data.user.USUARIO);
          PrivateRoutes(res.data.length > 1 ? true : false);
          navigate('/dashboard');
        });
    } catch (err: any) {
      const error = err.response?.data;
      Object.keys(error).map(key => {
        return toast.error(error[key]);
      });
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver,
    mode: 'onBlur',
    defaultValues: {
      Email: '',
      Senha: '',
    },
    criteriaMode: 'all',
  });

  return (
    <div id="page-auth">
      <main>
        <div className="conteiner">
          <img
            className="logo-itaka"
            src={itakaLogo}
            alt="Ilustração simbolizando perguntas e respostas"
          />
          <form
            onSubmit={handleSubmit((data, event) => {
              event?.preventDefault();
              if (data) {
                postSignIn(data.Email, data.Senha);
              }
            })}
          >
            <Controller
              control={control}
              name="Email"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
                    label="E-mail"
                    color="primary"
                    variant="outlined"
                    {...field}
                    error={!!errors.Email}
                  />
                );
              }}
            />
            <InputErrors error={errors.Email?.message} />
            <br />
            <Controller
              control={control}
              name="Senha"
              render={({ field }) => {
                return (
                  <TextField
                    id="outlined-basic"
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
                    error={!!errors.Senha}
                  />
                );
              }}
            />
            <InputErrors error={errors.Senha?.message} />
            <div className="container-checkbox">
              <input type="checkbox" /> <label>Lembrar-me</label>
            </div>
            <button className="button" type="submit">
              Entrar
            </button>
            <ButtonLink
              className="lost-password"
              name="Esqueceu sua senha?"
              pathname="#"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
