// src/stores/auth.store.ts
import type { User } from '@/core/domain/entities/user.entity';
import axiosBackEndInstance from '@/interceptors/axios-backend-interceptor';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type TokenResolver = (value?: string) => void;

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuth = ref(false);
  const isRefreshing = ref(false);
  const pendingRequests = ref<TokenResolver[]>([]);

  const userRole = computed(() => user.value?.role || null);
  const hasRole = (role: string) => userRole.value === role;
  const hasAnyRole = (roles: string[]) =>
    roles.includes(userRole.value as string);
  const username = computed(() => user.value?.name || '');
  const userId = computed(() => user.value?.id || '');
  const isAdmin = computed(() => userRole.value === 'ADMIN');

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await axiosBackEndInstance.post(
        '/auth/login',
        credentials,
      );
      setUser(data);
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const refreshToken = async () => {
    if (isRefreshing.value) {
      return new Promise<string>((resolve) => {
        pendingRequests.value.push(resolve as TokenResolver);
      });
    }

    try {
      isRefreshing.value = true;
      const { data } = await axiosBackEndInstance.post(
        '/auth/refresh',
        {},
        {
          withCredentials: true,
        },
      );

      setUser(data.user);
      processPendingRequests(data.accessToken);
      return data.accessToken;
    } catch (error) {
      processPendingRequests();
      throw error;
    } finally {
      isRefreshing.value = false;
    }
  };

  const logout = async () => {
    try {
      await axiosBackEndInstance.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );
    } finally {
      clearAuth();
      window.location.assign('/login');
    }
  };

  const checkAuth = async (force = false) => {
    try {
      if ((!isAuth.value || force) && !isRefreshing.value) {
        const { data } = await axiosBackEndInstance.get('/auth/verify');
        if (data) {
          setUser(data);
          return true;
        }
        clearAuth();
        return false;
      }
      return isAuth.value;
    } catch {
      clearAuth();
      return false;
    }
  };

  const setUser = (userData: User | null) => {
    user.value = userData;
    isAuth.value = !!userData;
  };

  const clearAuth = () => {
    setUser(null);
    clearPersistedData();
  };

  const clearPersistedData = () => {
    localStorage.removeItem('user_preferences');
    sessionStorage.clear();
  };

  const processPendingRequests = (token?: string) => {
    pendingRequests.value.forEach((resolve) => resolve(token));
    pendingRequests.value = [];
  };

  return {
    user,
    isAuth,
    userRole,
    username,
    userId,
    isAdmin,
    isRefreshing,
    login,
    logout,
    refreshToken,
    checkAuth,
    clearAuth,
    hasRole,
    hasAnyRole,
  };
});
