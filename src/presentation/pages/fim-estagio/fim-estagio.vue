<template>
  <div class="container">
    <v-card class="table-container">
      <div class="title">
        <h1 class="title1">Solicitação de Fim de Estágio</h1>
        <v-btn
          density="compact"
          icon="mdi-help"
          color="#078640"
          @click="dialog = !dialog"
        ></v-btn>
        <GuideModal v-model:dialog="dialog" :initial-step="'2'" />
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
      </div>

      <h2>Selecione um processo para finalização</h2>

      <v-data-table
        class="data-table"
        :headers="headers"
        :items="data"
        select-strategy="single"
        item-value="id"
        items-per-page="5"
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
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
import inputFile from '@/components/input-file/input-file.vue';
import GuideModal from '@/presentation/organisms/guide-modal/guide-modal.vue';
import { ref, onMounted } from 'vue';
import { createEndInternshipProcessBloc } from '@/presentation/blocs/end-internship-process/create-end-internship-process-bloc';
import type { EndInternshipProcessDataTableDto } from '@/core/application/dtos/end-internship-process-data-table-dto';
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

const { data, headers, selectedProcess } = endInternshipProcessBloc.getState();

onMounted(async () => {
  await endInternshipProcessBloc.getEligibleInternshipFinalizationProcesses();
});

const handleSelectionChange = (
  selectedProcess: EndInternshipProcessDataTableDto[],
) => {
  endInternshipProcessBloc.setSelectedProcess(selectedProcess);
};

const registerAssignEndInternshipProcess = async (files: File[]) => {
  endInternshipProcessBloc.registerAssignEndInternshipProcess(
    selectedProcess.value,
    files,
  );
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
