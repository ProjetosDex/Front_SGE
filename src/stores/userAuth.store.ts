import axiosBackEndInstance from '@/interceptors/axios-backend-interceptor';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserAuthStore = defineStore('userAuth', () => {
  const isAuth = ref(false);

  const user = ref(JSON.parse(sessionStorage.getItem('user') || '{}'));

  const storedUuidUser = sessionStorage.getItem('uuid_user');
  const storedUserRole = ref(sessionStorage.getItem('user_role') || '');

  const storedAccessToken = localStorage.getItem('access_token');
  const access_token = ref(storedAccessToken ? storedAccessToken : null);

  const storedRefreshToken = localStorage.getItem('refresh_token');
  const refresh_token = ref(storedRefreshToken ? storedRefreshToken : null);

  async function checkToken() {
    const tokenAuth = 'Bearer ' + access_token.value;
    const { data } = await axiosBackEndInstance.get('user/me', {
      headers: {
        Authorization: tokenAuth,
      },
    });
    return data;
  }

  function setUuidUser(uuidUser: string) {
    sessionStorage.setItem('uuid_user', uuidUser);
  }

  function setUserRole(userRole: string) {
    sessionStorage.setItem('user_role', userRole);
    storedUserRole.value = userRole;
  }

  function setUser(userValue: any) {
    const userStringfy = JSON.stringify(userValue);
    localStorage.setItem('user', userStringfy);
    user.value = userValue;
  }

  function setIsAuth(auth: any) {
    isAuth.value = auth;
  }

  function setAccessToken(accessTokenValue: any) {
    localStorage.setItem('access_token', accessTokenValue);
    access_token.value = accessTokenValue;
  }

  function setRefreshToken(refreshTokenValue: any) {
    localStorage.setItem('refresh_token', refreshTokenValue);
    refresh_token.value = refreshTokenValue;
  }

  function clear() {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('uuid_user');
    sessionStorage.removeItem('user_role');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    isAuth.value = false;
    access_token.value = '';
    refresh_token.value = '';
    user.value = '';
    storedUserRole.value = '';
  }

  return {
    isAuth,
    user,
    storedUuidUser,
    access_token,
    refresh_token,
    storedUserRole,
    checkToken,
    setUser,
    setUuidUser,
    setUserRole,
    setIsAuth,
    setAccessToken,
    setRefreshToken,
    clear,
  };
});
