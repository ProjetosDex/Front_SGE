<template>
  <v-stepper class="stepper-full" :model-value="initialStep">
    <template v-slot:default="{ prev, next }">
      <v-stepper-header class="step-header">
        <StepItem :title="'Início de estágio'" :value="'1'" />

        <BaseDivider />

        <StepItem :title="'Fim de estágio'" :value="'2'" />
      </v-stepper-header>

      <v-stepper-window class="step-window">
        <v-stepper-window-item class="step-window-item" value="1">
          <h2>Início de estágio</h2>
          <br />

          <h3>Parte 1: Como iniciar o estágio e gerar o termo ?</h3>
          <p style="text-align: justify">
            Para começar, acesse o formulário de início de estágio clicando no
            menu lateral. Preencha cuidadosamente todos os dados solicitados no
            formulário. O sistema fará validações automáticas para garantir que
            as informações estejam corretas. Se tudo estiver em ordem, o
            processo será concluído e um arquivo PDF do termo de compromisso
            será gerado automaticamente. Você poderá fazer o download desse
            documento clicando na opção disponível na tela. Além disso, também
            pode acessar seus processos na aba "Meus Processos", acessível pelo
            menu lateral, onde encontrará o documento gerado.
          </p>
          <p class="observation">
            <span>Importante:</span> Certifique-se de revisar todas as
            informações antes de finalizar o preenchimento para evitar problemas
            na validação.
          </p>
          <div class="carrosel">
            <v-carousel
              height="400"
              width="100%"
              show-arrows="hover"
              hide-delimiters
              :continuous="false"
            >
              <v-carousel-item
                v-for="(
                  stepNavigationImage, i
                ) in stepNavigationTermRegisterImages"
                :key="i"
                cover
              >
                <v-img
                  :src="stepNavigationImage"
                  class="carrousel-image"
                  contain
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>

          <h3>Parte 2: Como fazer o upload do termo de compromisso</h3>
          <p style="text-align: justify">
            Após o termo de compromisso ser assinado pelas partes interessadas,
            acesse a tela "Meus Processos" pelo menu lateral. Clique na opção de
            detalhes do seu processo. Dentro dessa tela, haverá uma área
            específica para o upload de arquivos. Faça o upload do termo
            assinado clicando na opção de selecionar arquivo e escolhendo o
            documento do seu dispositivo. Após o upload, o documento será
            enviado para análise pelo departamento de estágio.
          </p>
          <p class="observation">
            <span>Dica:</span> Verifique se o arquivo foi carregado corretamente
            antes de sair da tela.
          </p>
          <div class="carrosel">
            <v-carousel
              height="400"
              width="100%"
              show-arrows="hover"
              hide-delimiters
              :continuous="false"
            >
              <v-carousel-item
                v-for="(
                  stepNavigationImage, i
                ) in stepNavigationMyProcessImages"
                :key="i"
                cover
              >
                <v-img
                  :src="stepNavigationImage"
                  contain
                  height="100%"
                  width="100%"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>
          <h3>Parte 3: Acompanhamento da análise e conclusão do estágio</h3>
          <p style="text-align: justify">
            Depois de fazer o upload, aguarde a análise do documento pelo
            departamento de estágio. Você pode acompanhar o status do seu
            processo na mesma tela de "Meus Processos". Quando o departamento
            concluir a análise e o status mudar para "Concluído", seu estágio
            estará oficialmente válido e ativo. Assim que essa mudança ocorrer,
            seu estágio estará em vigor e você poderá continuar com suas
            atividades normalmente.
          </p>
          <p class="observation">
            <span>Lembrete:</span> Fique atento às atualizações de status na
            plataforma para garantir que tudo esteja em ordem.
          </p>
        </v-stepper-window-item>

        <v-stepper-window-item class="step-window-item" value="2">
          <h2>Fim de estágio</h2>
          <br />

          <h3>
            Parte 1: Como acessar a tela de fim de estágio e preencher os
            documentos necessários?
          </h3>
          <p style="text-align: justify">
            Para iniciar o processo de finalização do estágio, acesse o menu
            lateral da aplicação e clique na opção "Fim de Estágio". Isso abrirá
            a tela de fim de estágio, onde você encontrará três modelos de
            documentos necessários para a finalização. Realize o preenchimento
            adequado de cada documento, garantindo que todas as informações
            estejam corretas e completas.
          </p>
          <p>
            Importante: Certifique-se de preencher corretamente cada um dos
            documentos necessários
          </p>
          <div class="carrosel">
            <v-carousel
              height="400"
              width="100%"
              show-arrows="hover"
              hide-delimiters
              :continuous="false"
            >
              <v-carousel-item
                v-for="(
                  stepNavigationImage, i
                ) in stepNavigationInternshipEndImages"
                :key="i"
                cover
              >
                <v-img
                  :src="stepNavigationImage"
                  contain
                  height="100%"
                  width="100%"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>

          <h3>
            Parte 2: Como selecionar o estágio para finalização e fazer o upload
            dos documentos?
          </h3>
          <p style="text-align: justify">
            Na tela de fim de estágio, utilize o seletor de estágios disponíveis
            para escolher o estágio que deseja finalizar. Após selecionar o
            estágio correto, localize a área de upload de documentos e carregue
            os documentos preenchidos. Verifique se todos os arquivos foram
            enviados corretamente e estão no formato exigido.
          </p>
          <p>
            Dica: Verifique se os arquivos foram carregados corretamente antes
            de sair da tela.
          </p>
          <div class="carrosel">
            <v-carousel
              height="400"
              width="100%"
              show-arrows="hover"
              hide-delimiters
              :continuous="false"
            >
              <v-carousel-item
                v-for="(
                  stepNavigationImage, i
                ) in stepNavigationInternshipEndUploadFilesImages"
                :key="i"
                cover
              >
                <v-img
                  :src="stepNavigationImage"
                  contain
                  height="100%"
                  width="100%"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>
          <h3>Parte 3: Como acompanhar a análise dos documentos?</h3>
          <p style="text-align: justify">
            Após enviar os documentos, sua solicitação de fim de estágio estará
            completa. Para acompanhar o andamento e a análise dos documentos,
            acesse a tela "Meus Processos" através do menu lateral. Lá, você
            poderá verificar o status da sua solicitação e receber atualizações
            sobre a análise dos documentos.
          </p>
          <p>
            Lembrete: Fique atento às atualizações de status na plataforma para
            garantir que tudo esteja em ordem.
          </p>
        </v-stepper-window-item>
      </v-stepper-window>
      <div class="actions-buttons">
        <v-btn @click="prev" outlined>Anterior</v-btn>
        <v-btn @click="next" outlined>Próximo</v-btn>
      </div>
    </template>
  </v-stepper>
</template>

<script setup lang="ts">
import BaseDivider from '@/presentation/atoms/base-divider/base-divider.vue';
import StepItem from '@/presentation/atoms/step-item/step-item.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const stepNavigationTermRegisterImagesDesktop = [
  '/src/assets/images/guia_menu_inicio_estagio_desktop.png',
  '/src/assets/images/guia_menu_inicio_estagio_cadastrar_desktop.png',
  '/src/assets/images/popup_termo_desktop.png',
];

const stepNavigationMyProcessImagesDesktop = [
  '/src/assets/images/guia_meus_processos_desktop.png',
  '/src/assets/images/guia_detetalhamento_processo_desktop.png',
  '/src/assets/images/upload_arquivos_detalhamento_processos_desktop.png',
  '/src/assets/images/enviar_tce_detalhamento_processo_desktop.png',
];

const stepNavigationInternshipEndImagesDesktop = [
  '/src/assets/images/guia_sidebar_fim_estagio.png',
  '/src/assets/images/download_modelols_fim_estagio_desktop.png',
];

const stepNavigationInternshipEndUploadFilesImagesDesktop = [
  '/src/assets/images/selecao_processo_desejado_fim_estagio.png',
  '/src/assets/images/upload_arquivos_fim_estagio.png',
  '/src/assets/images/realizar_solicitacao_fim_estagio.png',
];

const stepNavigationTermRegisterImagesMobile = [
  '/src/assets/images/guia_menu_inicio_estagio_mobile.png',
  '/src/assets/images/guia_menu_inicio_estagio_cadastrar_mobile.png',
  '/src/assets/images/popup_termo_mobile.png',
];

const stepNavigationMyProcessImagesMobile = [
  '/src/assets/images/guia_meus_processos_mobile.png',
  '/src/assets/images/guia_detetalhamento_processo_mobile.png',
  '/src/assets/images/upload_arquivos_detalhamento_processos_mobile.png',
  '/src/assets/images/enviar_tce_detalhamento_processo_mobile.png',
];

const stepNavigationInternshipEndImagesMobile = [
  '/src/assets/images/guia_sidebar_fim_estagio_mobile.png',
  '/src/assets/images/download_modelos_fim_estagio_mobile.png',
];

const stepNavigationInternshipEndUploadFilesImagesMobile = [
  '/src/assets/images/selecao_processo_desejado_fim_estagio_mobile.png',
  '/src/assets/images/upload_arquivos_fim_estagio_mobile.png',
  '/src/assets/images/realizar_solicitacao_fim_estagio_mobile.png',
];

const isSmallScreen = ref(false);

const stepNavigationTermRegisterImages = computed(() =>
  isSmallScreen.value
    ? stepNavigationTermRegisterImagesMobile
    : stepNavigationTermRegisterImagesDesktop,
);

const stepNavigationMyProcessImages = computed(() =>
  isSmallScreen.value
    ? stepNavigationMyProcessImagesMobile
    : stepNavigationMyProcessImagesDesktop,
);

const stepNavigationInternshipEndImages = computed(() =>
  isSmallScreen.value
    ? stepNavigationInternshipEndImagesMobile
    : stepNavigationInternshipEndImagesDesktop,
);

const stepNavigationInternshipEndUploadFilesImages = computed(() =>
  isSmallScreen.value
    ? stepNavigationInternshipEndUploadFilesImagesMobile
    : stepNavigationInternshipEndUploadFilesImagesDesktop,
);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

defineProps<{
  initialStep?: string;
}>();

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.step-header {
  display: flex;
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 0;
  padding-bottom: 0;
}

.step-window-item {
  overflow-y: auto;
  max-height: 26em;
}

.carrosel {
  margin: 0.8rem 0 0.8rem 0;
}

.carrousel-image {
  height: 100%;
  width: 100%;
}

.observation {
  margin: 0.2rem 0 0 0;
}

.observation > span {
  font-weight: bold;
}

.actions-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
}

.actions-buttons {
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

@media screen and (max-width: 768px) {
  .step-header {
    padding: 0;
    margin: 0;
  }

  .stepper-full {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .step-window {
    flex: 1;
    overflow-y: auto; /* Permite scroll vertical */
  }

  .step-window-item {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
