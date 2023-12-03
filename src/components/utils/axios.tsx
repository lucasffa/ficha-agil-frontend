import axios from 'axios';
import { toast } from 'react-toastify';
//const baseUrl = window.location.origin;

const axiosInstance = axios.create({
  baseURL: 'http://itaka.univale.br/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Interceptor que verificar o erro, se for erro do token vencido, ele redireciona para a tela de login com aviso.

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.response.data.message === 'Token is blacklisted' ||
      error.response.data.message === 'Failed to authenticate token'
    ) {
      const countdown = 5;

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      const toastId = toast.info(
        `Sua sessão expirou. Redirecionando para o login em ${countdown} segundos...`,
        {
          autoClose: false,
        }
      );

      const updateCountdown = (count: number) => {
        if (count === 0) {
          toast.dismiss(toastId);
          window.location.href = '/login';
          return;
        }

        toast.update(toastId, {
          render: `Sua sessão expirou. Redirecionando para o login em ${count} segundos...`,
        });

        setTimeout(() => {
          updateCountdown(count - 1);
        }, 1000);
      };

      updateCountdown(countdown);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
