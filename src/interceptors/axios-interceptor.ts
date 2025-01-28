import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ESTAGIO_LEGAL_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const response = await axiosInstance.post('auth/refresh-token', {
          refresh_token: localStorage.getItem('refresh_token'),
        });

        if (response.status === 200) {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.access_token}`;

          localStorage.setItem('access_token', response.data.access_token);

          localStorage.setItem('refresh_token', response.data.refresh_token);

          //reenvia a requisição que falhou por expiração do token
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error('Erro ao renovar token:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
