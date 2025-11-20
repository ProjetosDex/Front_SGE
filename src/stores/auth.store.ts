// src/stores/auth.store.ts
import type { User } from '@/core/domain/entities/user.entity';
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
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

  const register = async (formRegister: any) => {
    try {
      const validatedFields = await validateFormFields(formRegister);
      await axiosBackEndInstance.post('/user/student', validatedFields);
      await login({
        email: validatedFields.email,
        password: validatedFields.password,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

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

  const validateFormFields = async (form: any) => {
    function isValidCPF(cpf: string): boolean {
      cpf = cpf.replace(/[\D]/g, '');
      if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
      let sum = 0,
        rest;
      for (let i = 1; i <= 9; i++)
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(cpf.substring(9, 10))) return false;
      sum = 0;
      for (let i = 1; i <= 10; i++)
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;
      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    }

    function isValidPhone(phone: string): boolean {
      return /^(\(?\d{2}\)?\s?)?(9?\d{4})-?\d{4}$/.test(
        phone.replace(/\D/g, ''),
      );
    }

    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const academicRegistrationCode = form.academicRegistrationCode.value;
    const cpf = form.cpf.value;
    const birthDateRaw = form.birthDate.value;
    const courseStudy = form.courseStudy.value;
    const name = form.name.value;
    const rg = form.rg.value;
    const telephone = form.telephone.value;

    const requiredFields = [
      email,
      password,
      confirmPassword,
      academicRegistrationCode,
      cpf,
      birthDateRaw,
      courseStudy,
      name,
      rg,
      telephone,
    ];
    const hasEmpty = requiredFields.some(
      (v) => v === undefined || v === null || v === '',
    );
    if (hasEmpty) {
      throw new Error('Todos os campos são obrigatórios');
    }

    let birthDate: string;
    try {
      birthDate = new Date(birthDateRaw).toISOString();
    } catch {
      throw new Error('Data de nascimento inválida.');
    }

    if (!isValidCPF(cpf)) {
      throw new Error('CPF inválido.');
    }

    if (!isValidPhone(telephone)) {
      throw new Error('Telefone inválido.');
    }

    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem.');
    }

    return {
      email,
      password,
      confirmPassword,
      academicRegistrationCode,
      cpf,
      birthDate,
      courseStudy,
      name,
      rg,
      telephone,
    };
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
        '/auth/refresh-token',
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
    register,
    login,
    logout,
    refreshToken,
    checkAuth,
    clearAuth,
    hasRole,
    hasAnyRole,
  };
});
