import axios from 'axios';
import axiosBackEndInstance from './axios-backend-client';

const axiosFileApiInstance = axios.create({
  baseURL: import.meta.env.VITE_FILE_API,
});

axiosFileApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const response = await axiosBackEndInstance.post('auth/refresh-token', {
          refresh_token: localStorage.getItem('refresh_token'),
        });

        if (response.status === 200) {
          axiosFileApiInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.access_token}`;

          localStorage.setItem('access_token', response.data.access_token);

          localStorage.setItem('refresh_token', response.data.refresh_token);

          return axiosFileApiInstance(error.config);
        }
      } catch (refreshError) {
        console.error('error on refresh token:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosFileApiInstance;
