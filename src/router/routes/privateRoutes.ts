import MasterMenu from '@/presentation/pages/layout/master-menu/master-menu.vue';
import HomePage from '@/presentation/pages/home-page/home-page.vue';
import InicioEstagioPage from '@/presentation/pages/inicio-estagio/inicio-estagio.vue';
import AcompanharProcessosDex from '@/presentation/pages/acompanhar-processos/visao-dex/acompanhar-processos.vue';
import FimEstagioPage from '@/presentation/pages/fim-estagio/fim-estagio.vue';
import DetalhamentoProcessoEstagio from '@/presentation/pages/detalhamento-processo-estagio/visao-aluno/detalhamento-processo-estagio.vue';
import DetalhamentoProcessoEstagioDEX from '@/presentation/pages/detalhamento-processo-estagio/visao-dex/detalhamento-processo-estagio_dex.vue';
import FormTCE from '@/presentation/pages/FormTCE/form-tce.vue';

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
        component: InicioEstagioPage,
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
      {
        path: '/detalhamento/processo/dex/:id',
        name: 'detalhamentoProcessoEstagioDEX',
        component: DetalhamentoProcessoEstagioDEX,
        meta: {
          auth: true,
        },
      },
      {
        path: '/formulario/tce',
        name: 'formulariotce',
        component: FormTCE,
        meta: {
          auth: true,
        },
      },
    ],
  },
];
