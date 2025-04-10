import testePdfVue from '@/presentation/pages/inicio-estagio/teste-pdf.vue';
import UserAutenticate from '@/presentation/pages/user-authenticate/user-authenticate.vue';

export const publicRoutes = [
  {
    path: '',
    redirect: '/authenticate',
  },
  {
    path: '/',
    redirect: '/authenticate',
  },
  {
    path: '/authenticate',
    name: 'authenticate',
    component: UserAutenticate,
  },
  {
    path: '/teste',
    component: testePdfVue,
  },
];
