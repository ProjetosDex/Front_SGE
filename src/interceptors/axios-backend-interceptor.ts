import { useAuthStore } from '@/stores/auth.store';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosBackEndClient = axios.create({
  baseURL: import.meta.env.VITE_ESTAGIO_LEGAL_API,
  withCredentials: true,
});

axiosBackEndClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _isRetry?: boolean;
      _retryCount?: number;
    };

    const authStore = useAuthStore();

    if (isNetworkError(error)) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._isRetry &&
      (originalRequest._retryCount || 0) < 3
    ) {
      originalRequest._isRetry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      try {
        console.log('tentei mas fui mlk');
        await authStore.refreshToken();
        return axiosBackEndClient(originalRequest);
      } catch (refreshError) {
        return handleRefreshError(authStore, refreshError);
      }
    }

    return Promise.reject(error);
  },
);

function isNetworkError(error: AxiosError): boolean {
  return (
    !error.response ||
    error.code === 'ECONNABORTED' ||
    error.code === 'ERR_NETWORK'
  );
}

function handleRefreshError(authStore: any, error: unknown) {
  const axiosError = error as AxiosError;
  const isUnauthorized = axiosError.response?.status === 401;

  if (!isNetworkError(axiosError) && !isUnauthorized) {
    authStore.logout();
  }

  return Promise.reject(error);
}

export default axiosBackEndClient;
