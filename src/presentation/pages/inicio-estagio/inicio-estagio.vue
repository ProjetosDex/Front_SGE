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
        <v-btn type="submit" class="buttonTCE" to="/formulario/tce"
          >Cadastrar Termo de Compromisso</v-btn
        >
      </section>
    </div>
    <GuideModal />
  </div>
</template>
<script lang="ts" setup>
import GuideModal from '@/presentation/organisms/guide-modal/guide-modal.vue';
import StepGuide from '@/presentation/organisms/step-guide/step-guide.vue';
import { ref } from 'vue';

const dialog = ref(false);

//import formTCE from "../../components/Form-TCE/form-tce.vue";
</script>

<style src="./style.scss" lang="scss" scoped></style>
