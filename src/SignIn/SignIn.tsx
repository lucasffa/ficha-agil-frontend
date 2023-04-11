import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import itakaLogo from '../assets/images/logo-itaka.png';
import InputErrors from '../components/Errors/Errors';
import { ButtonLink } from '../components/Button/Button';

import './signIn.scss';

type SignInProps = {
  urlBase?: string;
};
type SignInForm = {
  Email: string;
  Senha: string;
};

export default function SignIn({ urlBase }: SignInProps) {
  const validationSchema = Yup.object().shape({
    Email: Yup.string().required('E-mail obrigatório'),
    Senha: Yup.string().required('Senha obrigatória'),
  });
  console.log(urlBase);
  const resolver = yupResolver(validationSchema);

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
  });

  return (
    <div id="page-auth">
      <main>
        <div className="main-content">
          <img
            className="logo-itaka"
            src={itakaLogo}
            alt="Ilustração simbolizando perguntas e respostas"
          />
          {/* <div className="separator">ou entre em uma sala</div> */}
          <form
            onSubmit={handleSubmit((data, event) => {
              event?.preventDefault();

              if (data) {
                console.log(data);
              }
            })}
          >
            <Controller
              control={control}
              name="Email"
              render={({ field }) => {
                return <input type="text" placeholder="E-mail" {...field} />;
              }}
            />
            <InputErrors error={errors.Email?.message} />
            <br />
            <Controller
              control={control}
              name="Senha"
              render={({ field }) => {
                return <input type="text" placeholder="Senha" {...field} />;
              }}
            />
            <InputErrors error={errors.Senha?.message} />
            <div className="container-checkbox">
              <input type="checkbox" /> <label>Lembrar-me</label>
            </div>
            <ButtonLink className="button" name="Entrar" path="/dashboard" />
            <ButtonLink
              className="lost-password"
              name="Esqueceu sua senha?"
              path="#"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
