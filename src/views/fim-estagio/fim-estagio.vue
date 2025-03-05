<template>
  <div class="container">
    <v-card class="table-container">
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
        v-model="selected"
        :headers="headers"
        :items="desserts"
        select-strategy="single"
        item-value="id"
        items-per-page="5"
        return-object
        show-select
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
        :uploadUrl="uploadUrl"
        :uploadOption="uploadOption"
        :multiple="true"
        :internshipProcessId="selected[0]?.id"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axiosBackEndInstance from '@/interceptors/axios-backend-interceptor';
import inputFile from '../../components/input-file/input-file.vue';
const uploadOption = InternshipProcessMovement.FIM_ESTAGIO;
// URL de upload
const uploadUrl = 'upload/internship/evaluation';
const getAccessToken = () => localStorage.getItem('access_token');
const userAuthStore = useUserAuthStore();
const userRole = ref(userAuthStore.storedUserRole);

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

import { ref, onMounted } from 'vue';
import { useUserAuthStore } from '@/stores/userAuth.store';
import { InternshipProcessMovement } from '@/api/internshipProcess.interface';

// Reactive state for selected items and dessert data
const selected = ref([]);
const headers = ref([
  {
    title: 'Concedente',
    align: 'start',
    key: 'termCommitment.razaoSocialConcedente',
  },
  { title: 'Movimentação', align: 'end', key: 'movement' },
  { title: 'Inicio Processo', align: 'end', key: 'startDateProcess' },
  { title: 'Status', align: 'end', key: 'status' },
  { title: 'Detalhes', align: 'center', value: 'actions' },
]);
const desserts = ref<any>([]);

async function findElegibleForCompletationProcess() {
  let response;
  if (userRole.value === 'ALUNO') {
    response = await axiosBackEndInstance.get(
      'processo/estagio/elegible-for-completation',
      {
        params: {
          page: 1,
          pageSize: 10,
        },
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    console.log(response.data);
    desserts.value = response.data;
  }
}

onMounted(async () => {
  await findElegibleForCompletationProcess();
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
