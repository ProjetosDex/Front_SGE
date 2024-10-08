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
          Este sistema foi desenvolvido para simplificar e centralizar todas as etapas do seu estágio. Desde o início do processo, com a geração do Termo de Compromisso de Estágio (TCE), passando pelo acompanhamento de todas as atividades e documentações, até a conclusão final, tudo é gerido de forma integrada e acessível. Nosso objetivo é oferecer uma experiência mais eficiente e organizada, permitindo que você se concentre no que realmente importa: o seu desenvolvimento profissional. Explore as funcionalidades disponíveis e aproveite ao máximo as ferramentas que foram pensadas para facilitar sua jornada de estágio.
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
      <div class="title-container">
        <i class="mdi mdi-file"></i>
        <h1>INICIO DE ESTÁGIO</h1>
      </div>
      <p>
        Para iniciar seu estágio, preencha e submeta toda a documentação necessária, incluindo o Termo de Compromisso. Esse processo garante que todas as partes estejam cientes das responsabilidades e expectativas. Clique em "Saiba mais" para acessar os formulários e instruções detalhadas.
      </p>
      <a href="#">saiba mais</a>
    </v-card>

    <v-card class="row">
      <div class="title-container">
        <i class="mdi mdi-calendar"></i>
        <h1>FIM DE ESTÁGIO</h1>
      </div>
      <p>
        Ao finalizar seu estágio, é essencial concluir todas as atividades e submeter o relatório final. Esse documento é necessário para validar as horas de estágio e avaliar seu desempenho. Para mais informações e acesso ao relatório, clique em "Saiba mais".
      </p>
      <a href="#">saiba mais</a>
    </v-card>

    <v-card class="row">
      <div class="title-container">
        <i class="mdi mdi-file-check-outline"></i>
        <h1>CREDITAR ESTÁGIO</h1>
      </div>
      <p>
        Após a conclusão do estágio, solicite o crédito das horas cumpridas em seu histórico escolar. É preciso submeter a documentação comprobatória e o relatório final. Acesse o passo a passo completo clicando em "Saiba mais".
      </p>
      <a href="#">saiba mais</a>
    </v-card>

    <v-card class="row">
      <div class="title-container">
        <i class="mdi mdi-update"></i>
        <h1>ACOMPANHAR PROCESSOS</h1>
      </div>
      <p>
        Mantenha-se atualizado sobre o andamento dos seus processos de estágio. Acompanhe desde a aprovação da documentação até a finalização do estágio. Verifique o status de cada etapa clicando em "Saiba mais".
      </p>
      <a href="#">saiba mais</a>
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
