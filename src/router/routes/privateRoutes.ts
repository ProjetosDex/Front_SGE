import MasterMenu from '@/presentation/pages/layout/master-menu/master-menu.vue';
import HomePage from '@/presentation/pages/home-page/home-page.vue';
import AcompanharProcessosDex from '@/presentation/pages/acompanhar-processos/visao-dex/acompanhar-processos.vue';
import FimEstagioPage from '@/presentation/pages/fim-estagio/fim-estagio.vue';
import DetalhamentoProcessoEstagio from '@/presentation/pages/detalhamento-processo-estagio/detalhamento-processo-estagio.vue';
import StartInternship from '@/presentation/pages/start-internship/start-internship.vue';

export const privateRoutes = [
  {
    path: '/menu',
    name: 'menu',
    component: MasterMenu,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: {
          auth: true,
        },
      },
      {
        path: '/inicio/estagio',
        name: 'inicioEstagio',
        component: StartInternship,
        meta: {
          auth: true,
        },
      },
      {
        path: '/acompanhar/processos',
        name: 'acompanharProcessos',
        component: AcompanharProcessosDex,
        meta: {
          auth: true,
        },
      },
      {
        path: '/fim/estagio',
        name: 'fimEstagio',
        component: FimEstagioPage,
        meta: {
          auth: true,
        },
      },
      {
        path: '/detalhamento/processo/:id',
        name: 'detalhamentoProcessoEstagio',
        component: DetalhamentoProcessoEstagio,
        meta: {
          auth: true,
        },
      },
    ],
  },
];
