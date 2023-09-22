import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

axiosInstance.interceptors.response.use(
  response => response, // Não faça nada se a resposta for bem-sucedida
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Se a resposta for status 401, limpe o token do localStorage
      // Você pode redirecionar o usuário para a página de login aqui, se desejar
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
