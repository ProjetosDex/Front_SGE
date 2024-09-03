import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ESTAGIO_LEGAL_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Evitar loop infinito

      try {
        const response = await axiosInstance.post('auth/refresh/token', {
          refresh_token: localStorage.getItem('refresh_token'),
        });

        if (response.status === 200) {
          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;

          // Atualiza os tokens no localStorage
          localStorage.setItem('access_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);
          console.log(newAccessToken);
          // Aplica o novo token ao cabeçalho Authorization da requisição original
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Reenvia a requisição original
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Erro ao renovar token:', refreshError);
        // Opcional: Redirecionar para a página de login ou outra ação
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
