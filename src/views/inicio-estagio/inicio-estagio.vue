<template>
  <div class="main">
    <div class="tce-box">
      <section>
        <h1 class="title1">Inicio de Estágio</h1>
        <h2 class="description">
          Bem-vindo à página de inicio de estágio em nosso sistema de
          gerenciamento de documentação! Aqui, facilitamos o pontapé inicial da
          sua jornada profissional com um recurso essencial: a geração
          simplificada do Termo de Compromisso de Estágio (TCE).
        </h2>
        <input
          class="file-input"
          type="file"
          name="file"
          ref="files"
          multiple
          hidden
        />
        <v-btn
          type="submit"
          class="buttonTCE"
          to="/formulario/tce"
          onclick="generatePDF"
          >Cadastrar Termo de Compromisso</v-btn
        >
      </section>
    </div>
    <div class="container">
      <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
          <div class="card card1">
            <button v-bind="props" class="overlay">
              <h1 class="title-card1">
                Inicio de Estágio: Guia Visual do Sistema
              </h1>
            </button>
            <img src="../../assets/formTCE.png" alt="" />
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Guia Visual do Sistema</span>
          </v-card-title>
          <div class="carrosel">
            <v-carousel
              cycle
              height="350"
              width="100vh"
              show-arrows="hover"
              hide-delimiters
            >
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              >
              </v-carousel-item>
            </v-carousel>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#078640" variant="text" @click="dialog = false">
              Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="card card2">
        <img src="../../assets/filesIcon.png" alt="" class="img-card2" />
        <h1 class="title-card2">Inicio de Estágio: Guia Detalhado</h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const dialog = ref(false);

const items = [
  {
    src: '/src/assets/ifpa-front.png',
  },
  {
    src: '/src/assets/ifpa-fachada.png',
  },
  {
    src: '/src/assets/biblioteca-ifpa.png',
  },
  {
    src: '/src/assets/fachada-dti.png',
  },
];

//import formTCE from "../../components/Form-TCE/form-tce.vue";
</script>

<style src="./style.scss" lang="scss" scoped></style>
