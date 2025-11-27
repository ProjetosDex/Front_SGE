<template>
  <CarouselImage></CarouselImage>

  <div class="container">
    <CardInfo
      v-for="(card, index) in homeCardContent"
      :key="index"
      :icon="card.icon"
      :title="card.title"
      :description="card.description as string"
      :linkHref="card.linkHref"
    />
  </div>
</template>

<script lang="ts" setup>
import { UserRole } from '@/core/domain/entities/user.entity';
import CardInfo from '@/presentation/organisms/card-info/card-info.vue';
import CarouselImage from '@/presentation/organisms/carousel-image/carousel-image.vue';
import { useAuthStore } from '@/stores/auth.store';
import { usePageNavigationStore } from '@/stores/page-navitagion/page-navigation.store';
import { onMounted } from 'vue';

const useAuth = useAuthStore();
const userRole = useAuth.userRole;
const pageNavigationStore = usePageNavigationStore();

onMounted(() => {
  pageNavigationStore.setLoading(false);
});

const homeCardContent = [
  {
    icon: 'mdi mdi-file',
    title: 'INICIO DE ESTÁGIO',
    description: getDescriptionByUserRole(userRole, 'INICIO DE ESTÁGIO'),
    linkHref: '#',
  },
  {
    icon: 'mdi mdi-calendar',
    title: 'FIM DE ESTÁGIO',
    description: getDescriptionByUserRole(userRole, 'FIM DE ESTÁGIO'),
    linkHref: '#',
  },
  {
    icon: 'mdi mdi-update',
    title: 'ACOMPANHAR PROCESSOS',
    description: getDescriptionByUserRole(userRole, 'ACOMPANHAR PROCESSOS'),
    linkHref: '#',
  },
];

function getDescriptionByUserRole(userRole: string | null, cardTitle: string) {
  if (cardTitle === 'INICIO DE ESTÁGIO') {
    if (userRole === UserRole.STUDENT) {
      return 'Para iniciar seu estágio, preencha e submeta toda a documentação necessária, incluindo o Termo de Compromisso. Esse processo garante que todas as partes estejam cientes das responsabilidades e expectativas.';
    } else if (
      userRole === UserRole.EMPLOYEE ||
      userRole === UserRole.ADMINISTRATOR
    ) {
      return 'Para aceitar estagiários, revise e aprove os termos de compromisso enviados pelos estudantes. Garanta que todas as responsabilidades e expectativas estejam claras para ambas as partes.';
    }
  } else if (cardTitle === 'FIM DE ESTÁGIO') {
    if (userRole === UserRole.STUDENT) {
      return 'Ao finalizar seu estágio, é essencial concluir todas as atividades e submeter o relatório final. Esse documento é necessário para validar as horas de estágio e avaliar seu desempenho.';
    } else if (
      userRole === UserRole.EMPLOYEE ||
      userRole === UserRole.ADMINISTRATOR
    ) {
      return 'Nesta etapa, revise atentamente as avaliações de estágio realizadas pela concedente, pelo orientador e a autoavaliação do aluno. Após a conferência, realize a submissão do certificado de conclusão de estágio para finalizar o processo.';
    }
  } else if (cardTitle === 'ACOMPANHAR PROCESSOS') {
    if (userRole === UserRole.STUDENT) {
      return 'Mantenha-se atualizado sobre o andamento dos seus processos de estágio. Acompanhe desde a aprovação da documentação até a finalização do estágio.';
    } else if (
      userRole === UserRole.EMPLOYEE ||
      userRole === UserRole.ADMINISTRATOR
    ) {
      return 'Acompanhe o status dos estagiários sob sua supervisão, garantindo que todos os processos estejam em conformidade com as políticas da empresa e da instituição.';
    }
  }
}
</script>

<style
  src="@/presentation/pages/home-page/home-page.scss"
  lang="scss"
  scoped
></style>
