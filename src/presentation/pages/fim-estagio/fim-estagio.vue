<template>
  <div class="container">
    <v-card class="table-container">
      <v-overlay :model-value="loading" class="align-center justify-center">
        <v-progress-circular
          color="#078640"
          size="64"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
      <div class="title">
        <h1 class="title1">Solicitação de Fim de Estágio</h1>
        <v-btn
          density="compact"
          icon="mdi-help"
          color="#078640"
          @click="dialog = !dialog"
        ></v-btn>
        <GuideModal v-if="dialog" v-model:dialog="dialog" :initial-step="'2'" />
      </div>
      <!-- <p>Faça Upload dos Arquivos Preenchidos para Solicitar o Atestado de Estágio</p> -->

      <!-- Seção para mostrar os arquivos modelo -->
      <div class="model-files">
        <p>Modelo dos arquivos necessários:</p>
        <div class="model-file-items">
          <v-btn
            v-for="file in modelFiles"
            :key="file.name"
            :href="file.url"
            download
            class="buttonUpload"
          >
            {{ file.name }}
          </v-btn>
        </div>
        <div></div>
        <div
          style="
            background: #fef450;
            border: 1px solid #fef450;
            border-radius: 8px;
            padding: 16px;
            margin-top: 16px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
          "
        >
          <v-icon style="color: #faad14; font-size: 28px; margin-right: 8px"
            >mdi-alert</v-icon
          >
          <div>
            <strong style="color: #333; font-size: 18px">Atenção!</strong>
            <div style="color: #333; margin-top: 4px">
              Os arquivos devem conter os nomes: AutoAvaliacaoEstagiario,
              AvaliacaoConcedente e AvaliacaoProfessorOrientador. (todos em
              formato PDF)
            </div>
          </div>
        </div>
      </div>

      <h2>Selecione um processo para finalização</h2>

      <v-data-table
        class="data-table"
        :headers="headers"
        :items="data"
        select-strategy="single"
        item-value="id"
        items-per-page="5"
        items-per-page-text="Itens por página:"
        return-object
        show-select
        no-data-text="não há processos aptos a serem finalizados."
        @update:model-value="
          (value) =>
            handleSelectionChange(value as EndInternshipProcessDataTableDto[])
        "
      >
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="{
              name: 'detalhamentoProcessoEstagio',
              params: { id: item.id },
            }"
          >
            <v-icon icon="mdi-file" style="color: #078640"></v-icon>
          </router-link>
        </template>
      </v-data-table>

      <!-- Componente de upload -->
      <input-file
        :actionButtonLabel="'Enviar Arquivos'"
        @uploadedFiles="registerAssignEndInternshipProcess"
      />

      <v-dialog
        v-if="showSuccessModal"
        v-model="showSuccessModal"
        persistent
        width="640"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5"
              >Nova Solicitação de fim de estágio submetida!</span
            >
          </v-card-title>
          <v-card-text>
            aguarde a análise da sua solicitação para receber seu atestado de
            estágio.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              @click="openInternshipProcessDetails"
            >
              Acompanhar Processo
            </v-btn>
            <v-btn
              color="#078640"
              variant="text"
              @click="showSuccessModal = false"
            >
              Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-if="messageError && showErrorModal"
        v-model="showErrorModal"
        persistent
        width="640"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5" style="color: red"
              >Erro ao solicitar finalização do processo!</span
            >
          </v-card-title>
          <v-card-text> {{ messageError }} </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              @click="showErrorModal = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import inputFile from '@/components/input-file/input-file.vue';
import GuideModal from '@/presentation/organisms/guide-modal/guide-modal.vue';
import { ref, onMounted } from 'vue';
import { createEndInternshipProcessBloc } from '@/presentation/blocs/end-internship-process/create-end-internship-process-bloc';
import type { EndInternshipProcessDataTableDto } from '@/core/application/dtos/end-internship-process-data-table-dto';
import { usePageNavigationStore } from '@/stores/page-navitagion/page-navigation.store';
const pageNavigationStore = usePageNavigationStore();
const dialog = ref(false);

// Arquivos modelo
const modelFiles = [
  {
    name: 'Auto Avaliação do Estagiário',
    url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1097275&&key=bd64adf971f7a8d62aa58966f6f14f1d',
  },
  {
    name: 'Avaliação do Estagiário - Concedente',
    url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1097276&&key=ecead2273608bcb87a428cd6b737d1ef',
  },
  {
    name: 'Avaliação do Estagiário - Professor Orientador',
    url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1097278&&key=2f4cee6135e4b5e4f256fb861bc8751c',
  },
];

const endInternshipProcessBloc = createEndInternshipProcessBloc();

const {
  data,
  headers,
  selectedProcess,
  showSuccessModal,
  showErrorModal,
  messageError,
  loading,
} = endInternshipProcessBloc.getState();

onMounted(async () => {
  await endInternshipProcessBloc.getEligibleInternshipFinalizationProcesses();
  pageNavigationStore.setLoading(false);
});

const handleSelectionChange = (
  selectedProcess: EndInternshipProcessDataTableDto[],
) => {
  endInternshipProcessBloc.setSelectedProcess(selectedProcess);
};

const openInternshipProcessDetails = () => {
  if (selectedProcess.value) {
    const processId = selectedProcess.value[0].id;
    endInternshipProcessBloc.navigateToInternshipProcessDetails(processId);
  }
};

const registerAssignEndInternshipProcess = async (files: File[]) => {
  console.log('aqui');
  endInternshipProcessBloc.registerAssignEndInternshipProcess(
    selectedProcess.value,
    files,
  );
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
