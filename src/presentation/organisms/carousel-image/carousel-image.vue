<template>
  <v-carousel
    :show-arrows="false"
    cycle
    height="350"
    width="100vh"
    hide-delimiter-background
    hide-delimiters
  >
    <div class="text_overlay">
      <h1>SEJA BEM VINDO AO SYSTAGIO</h1>
      <h2>
        Este sistema foi desenvolvido para simplificar e centralizar todas as
        etapas do seu estágio. Desde o início do processo, com a geração do
        Termo de Compromisso de Estágio (TCE), passando pelo acompanhamento de
        todas as atividades e documentações, até a conclusão final, tudo é
        gerido de forma integrada e acessível. Nosso objetivo é oferecer uma
        experiência mais eficiente e organizada, permitindo que você se
        concentre no que realmente importa: o seu desenvolvimento profissional.
        Explore as funcionalidades disponíveis e aproveite ao máximo as
        ferramentas que foram pensadas para facilitar sua jornada de estágio.
      </h2>
      <br />
      <v-btn color="#078640" @click="dialog = !dialog"> Guia do Sistema </v-btn>
      <GuideModal v-model:dialog="dialog" />
    </div>

    <template v-for="(item, i) in items" :key="i">
      <CarouselItem :src="item.src" />
    </template>
  </v-carousel>
</template>

<script setup lang="ts">
import CarouselItem from '@/presentation/molecules/carousel-item/carousel-item.vue';
import GuideModal from '../guide-modal/guide-modal.vue';
import { ref } from 'vue';

const dialog = ref(false);
const items = [
  { src: '/images/ifpa-front.png' },
  { src: '/images/ifpa-fachada.png' },
  { src: '/images/biblioteca-ifpa.png' },
  { src: '/images/fachada-dti.png' },
];
</script>

<style
  lang="scss"
  src="@/presentation/organisms/carousel-image/carousel-image.scss"
  scoped
></style>
