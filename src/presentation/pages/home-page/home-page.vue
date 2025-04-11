<template>
  <CarouselImage></CarouselImage>

  <div class="container">
    <CardInfo
      v-for="(card, index) in homeCardContent"
      :key="index"
      :icon="card.icon"
      :title="card.title"
      :description="card.description"
      :linkHref="card.linkHref"
      :linkText="card.linkText"
    />
  </div>
</template>

<script lang="ts" setup>
import CardInfo from '@/presentation/organisms/card-info/card-info.vue';
import CarouselImage from '@/presentation/organisms/carousel-image/carousel-image.vue';

const homeCardContent = [
  {
    icon: 'mdi mdi-file',
    title: 'INICIO DE ESTÁGIO',
    description:
      'Para iniciar seu estágio, preencha e submeta toda a documentação necessária, incluindo o Termo de Compromisso. Esse processo garante que todas as partes estejam cientes das responsabilidades e expectativas. Clique em "Saiba mais" para acessar os formulários e instruções detalhadas.',
    linkHref: '#',
    linkText: 'saiba mais',
  },
  {
    icon: 'mdi mdi-calendar',
    title: 'FIM DE ESTÁGIO',
    description:
      'Ao finalizar seu estágio, é essencial concluir todas as atividades e submeter o relatório final. Esse documento é necessário para validar as horas de estágio e avaliar seu desempenho. Para mais informações e acesso ao relatório, clique em "Saiba mais".',
    linkHref: '#',
    linkText: 'saiba mais',
  },
  {
    icon: 'mdi mdi-file-check-outline',
    title: 'CREDITAR ESTÁGIO',
    description:
      'Após a conclusão do estágio, solicite o crédito das horas cumpridas em seu histórico escolar. É preciso submeter a documentação comprobatória e o relatório final. Acesse o passo a passo completo clicando em "Saiba mais".',
    linkHref: '#',
    linkText: 'saiba mais',
  },
  {
    icon: 'mdi mdi-update',
    title: 'ACOMPANHAR PROCESSOS',
    description:
      'Mantenha-se atualizado sobre o andamento dos seus processos de estágio. Acompanhe desde a aprovação da documentação até a finalização do estágio. Verifique o status de cada etapa clicando em "Saiba mais".',
    linkHref: '#',
    linkText: 'saiba mais',
  },
];
</script>

<style
  src="@/presentation/pages/home-page/home-page.scss"
  lang="scss"
  scoped
></style>
