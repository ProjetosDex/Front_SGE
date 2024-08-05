<template>
  <div class="teste">
    <v-carousel
      :show-arrows="false"
      cycle
      height="350"
      width="100vh"
      hide-delimiter-background
      hide-delimiters
    >
      <div class="text_overlay">
        <h1>SEJA BEM VINDO AO ESTÁGIO LEGAL</h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim.
        </h2>
      </div>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        cover
      >
        <div class="image_overlay"></div>
      </v-carousel-item>
    </v-carousel>
  </div>

  <div class="container">
    <v-card class="row">
      <i class="mdi mdi-file"></i>
      <h1>INICIO DE ESTÁGIO</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit. Aenean commodo ligula eget dolor.
      </p>
      <a href="">saiba mais</a>
    </v-card>
    <v-card class="row">
      <i class="mdi mdi-calendar"></i>
      <h1>FIM DE ESTÁGIO</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit. Aenean commodo ligula eget dolor.
      </p>
      <a href="">saiba mais</a>
    </v-card>
    <v-card class="row">
      <i class="mdi mdi-file-check-outline"></i>
      <h1>CREDITAR ESTÁGIO</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit. Aenean commodo ligula eget dolor.
      </p>
      <a href="">saiba mais</a>
    </v-card>
    <v-card class="row">
      <i class="mdi mdi-update"></i>
      <h1>ACOMPANHAR PROCESSOS</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit. Aenean commodo ligula eget dolor.
      </p>
      <a href="">saiba mais</a>
    </v-card>
    <testePdfVue />
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    src: 'src/assets/ifpa-front.png',
  },
  {
    src: 'src/assets/ifpa-fachada.png',
  },
  {
    src: 'src/assets/biblioteca-ifpa.png',
  },
  {
    src: 'src/assets/fachada-dti.png',
  },
];
</script>

<style src="./style.scss" lang="scss" scoped></style>
