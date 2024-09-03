import UserAutenticate from '../views/user-authenticate/user-authenticate.vue';

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
];
