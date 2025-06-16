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
        v-model="selected"
        :headers="headers"
        :items="desserts"
        select-strategy="single"
        item-value="id"
        items-per-page="5"
        return-object
        show-select
        no-data-text="não há processos aptos a serem finalizados."
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
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
import inputFile from '@/components/input-file/input-file.vue';
import GuideModal from '@/presentation/organisms/guide-modal/guide-modal.vue';
const uploadOption = InternshipProcessMovement.STAGE_END;
// URL de upload
const uploadUrl = 'upload/internship/evaluation';
const getAccessToken = () => localStorage.getItem('access_token');
const userAuthStore = useAuthStore();
const userRole = ref(userAuthStore.userRole);
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

import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { InternshipProcessMovement } from '@/core/domain/entities/internshipProcess.entity';

// Reactive state for selected items and dessert data
const selected = ref([]);
const headers = ref([
  {
    title: 'Concedente',
    align: 'start',
    key: 'termCommitment.grantingCompanyName',
  },
  { title: 'Movimentação', align: 'end', key: 'movement' },
  { title: 'Inicio Processo', align: 'end', key: 'startDateProcess' },
  { title: 'Status', align: 'end', key: 'status' },
  { title: 'Detalhes', align: 'center', value: 'actions' },
]);
const desserts = ref<any>([
  {
    id: '00805f2f-3e94-4c86-b4a6-a29a5f9ba56e',
    movement: 'INÍCIO DE ESTÁGIO',
    status: 'CONCLUÍDO',
    startDateProcess: '18/04/2025',
    endDateProcess: null,
    id_termCommitment: 'ba3bb594-900b-46f2-bdc7-8eb0e065f20e',
    createdAt: '2025-06-13T12:11:41.000Z',
    updatedAt: '2025-06-13T12:11:41.000Z',
    id_user: '0478bf8b-042a-4cf7-906f-da987ff9b2f5',
    user: {
      id: '0478bf8b-042a-4cf7-906f-da987ff9b2f5',
      name: 'Rafael',
      cpf: '12354476876',
      registration: '20190796543',
      email: 'rafael@gmail.com',
      telephone: '3278163183618736',
      courseStudy: 'TECNOLOGIA EM ANÁLISE E DESENVOLVIMENTO DE SISTEMAS',
      password: '$2b$10$3VbVfdZC6f7JKj8v5.aKMeQ.30n1Y1agUQ37NEJK9fwhLDcvNxTf.',
      role: 'STUDENT',
      createdAt: '2025-06-04T01:11:56.000Z',
      updatedAt: '2025-06-04T01:11:56.000Z',
      id_institution: null,
    },
    termCommitment: {
      id: 'ba3bb594-900b-46f2-bdc7-8eb0e065f20e',
      insurancePolicyNumber: '1234',
      insuranceCompanyName: 'seguradora do balaco baco',
      advisorProfessor: null,
      siapeCode: null,
      internshipStartDate: '2025-04-18T00:00:00.000Z',
      internshipEndDate: '2025-04-18T00:00:00.000Z',
      internshipStartTime: '1970-01-01T08:00:00.000Z',
      internshipEndTime: '1970-01-01T12:00:00.000Z',
      weeklyWorkload: 20,
      isMandatory: true,
      internshipGrant: 800,
      transportationAllowance: 100,
      internshipActivityPlan:
        '["atividade 1","atividade 2","atividade 3","atividade 4","atividade 5"]',
      grantingCompanyName: 'AGU',
      grantingCompanyCNPJ: '49892589000179',
      grantingCompanyPostalCode: '67145855',
      grantingCompanyDistrict: 'Paar',
      grantingCompanyCity: 'Ananindeua',
      grantingCompanyState: 'PA',
      grantingCompanyAddress: 'tv.esquina',
      grantingCompanyEmail: 'rafa.teste@email.com',
      grantingCompanyLegalRepresentative: 'Afonso',
      legalRepresentativeRole: 'Product Owner',
      supervisor: 'Afonso',
      supervisorPosition: 'Product Owner',
      filePath: null,
      id_user: '0478bf8b-042a-4cf7-906f-da987ff9b2f5',
    },
  },
]);

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
