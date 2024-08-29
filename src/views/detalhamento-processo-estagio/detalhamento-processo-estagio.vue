<template>
  <div class="info-processo-container">
      <h1 class="title1">Processo De Estágio</h1>
      <v-container>
          <div class="steps-container">
              <div
                  v-for="(step, index) in steps"
                  :key="index"
                  class="step-item"
                  @click="updateCurrentStepContent(index)"
              >
                  <div class="circle-container">
                      <div :class="['circle', stepClasses[step.status as keyof typeof stepClasses]]">
                          <template v-if="step.status === 'CONCLUÍDO'">
                              <v-icon small color="white">mdi-check</v-icon>
                          </template>
                          <template v-else>
                              {{ index + 1 }}
                          </template>
                      </div>
                      <div
                          v-if="index < steps.length - 1"
                          class="connector"
                          :style="connectorStyles[index]"
                      ></div>
                  </div>
                  <div class="step-text">
                      <div class="step-label">{{ step.label }}</div>
                      <div class="step-status">{{ step.status }}</div>
                  </div>
              </div>
          </div>

          <!-- Seção para exibir conteúdo com base na etapa atual -->
          <div class="step-content" v-if="currentStepContent">
              <h2>{{ currentStepContent.title }}</h2>
              <p>{{ currentStepContent.description }}</p>

              <!-- Informações adicionais com base na etapa -->
              <div v-if="currentStepContent.additionalInfo">
                  <h3>Informações adicionais:</h3>
                  <p>{{ currentStepContent.additionalInfo }}</p>
              </div>

              <!-- Ação necessária com base no status da etapa -->
              <div v-if="currentStepContent.actionRequired">
                  <h3>Ação necessária:</h3>
                  <p>{{ currentStepContent.actionRequired }}</p>
              </div>

              <!-- Substituindo o upload inline pelo componente de upload -->
              <div v-if="currentStepContent.showUploadButton">
                  <input-file :uploadUrl="uploadUrl" />
              </div>

              <!-- Documentos do processo - exibido quando o status é CONCLUÍDO -->
              <div v-if="currentStepContent.status === 'CONCLUÍDO' && processDocuments.length > 0" class="process-documents">
                  <h3>Documentos do processo:</h3>
                  <section class="uploaded-area">
                      <li class="row" v-for="(doc, index) in processDocuments" :key="index">
                          <div class="fileUpload">
                              <div class="content upload">
                                  <i class="mdi mdi-file-document"></i>
                                  <span class="name">{{ doc.name }}</span>
                                  <a :href="doc.url" download class="download-link">
                                      <v-icon small color="green">mdi-download</v-icon>
                                  </a>
                              </div>
                          </div>
                      </li>
                  </section>
              </div>
          </div>
      </v-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { InternshipProcess } from '@/api/internshipProcess.interface';
import axiosInstance from '@/interceptors/axios-interceptor';

// Importando o componente de upload
import InputFile from '../../components/input-file/input-file.vue';

const router = useRouter();
const internshipProcessID = router.currentRoute.value.params?.id;
const internshipProcess = ref<InternshipProcess>();

const steps = ref([
  { label: 'INÍCIO DE ESTÁGIO', status: 'NÃO INICIADO' },
  { label: 'RENOVAÇÃO DE ESTÁGIO', status: 'NÃO INICIADO' },
  { label: 'FIM DE ESTÁGIO', status: 'NÃO INICIADO' },
]);

const stepClasses: Record<string, string> = {
  'CONCLUÍDO': 'completed-step',
  'EM ANDAMENTO': 'in-progress-step',
  'EM ANALISE': 'in-analysis-step',
  'RECUSADO': 'rejected-step',
  'NÃO INICIADO': 'pending-step',
};

const connectorStyles = ref<{ width: string; animation: string; backgroundColor: string }[]>([]);
const currentStepContent = ref<{ title: string; description: string; additionalInfo?: string; actionRequired?: string; showUploadButton?: boolean; status?: string } | null>(null);
const uploadUrl = ref('https://minha-api.com/upload'); // URL para onde os arquivos serão enviados

// Mapeamento dos documentos relacionados a cada etapa
const documentMap: Record<string, { name: string; url: string }[]> = {
  'INÍCIO DE ESTÁGIO': [
    { name: 'Termo de Compromisso de Estágio', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
  ],
  'RENOVAÇÃO DE ESTÁGIO': [
    { name: 'Termo de Compromisso de Estágio', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
  ],
  'FIM DE ESTÁGIO': [
    { name: 'Termo de Compromisso de Estágio', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
    { name: 'Auto-Avaliação do Aluno', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
    { name: 'Avaliação da Concedente', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
    { name: 'Avaliação do Orientador', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
  ],
};

const processDocuments = ref<{ name: string; url: string }[]>([]);

const contentMap: Record<string, (status: string) => { title: string; description: string; additionalInfo?: string; actionRequired?: string; showUploadButton?: boolean; status?: string }> = {
  'INÍCIO DE ESTÁGIO': (status: string) => {
      let description = 'Esta etapa é crucial para o início do seu estágio, no qual deverá ser realizado o preenchimento de todos os dados necessários para concluir o processo.';
      let additionalInfo = 'Documentos necessários, preparação para o primeiro dia, etc.';
      let actionRequired = '';
      let showUploadButton = false;

      if (status === 'EM ANDAMENTO') {
          description = 'Você está no início do estágio. Por favor, finalize o preenchimento do TCE, obtenha as assinaturas do aluno e da concedente, e realize o upload para análise.';
          actionRequired = 'Finalize o preenchimento do TCE e realize o upload do documento assinado.';
          showUploadButton = true;
      } else if (status === 'EM_ANALISE') {
          description = 'O seu documento foi enviado e está em análise pela gestão de estágio.';
          additionalInfo = 'Aguarde o retorno da análise para os próximos passos.';
      } else if (status === 'RECUSADO') {
          description = 'O documento enviado foi recusado. Por favor, revise as informações e realize o upload novamente.';
          actionRequired = 'Corrija as informações no TCE e realize o upload do documento corrigido.';
          showUploadButton = true;
      } else if (status === 'CONCLUÍDO') {
          description = 'Esta etapa foi concluída com sucesso.';
          additionalInfo = 'Você pode prosseguir para a próxima etapa do processo.';
          processDocuments.value = documentMap['INÍCIO DE ESTÁGIO'];
      }

      return { title: 'Início de Estágio', description, additionalInfo, actionRequired, showUploadButton, status };
  },
  'RENOVAÇÃO DE ESTÁGIO': (status: string) => {
      let description = 'Esta etapa é para a renovação do seu contrato de estágio.';
      let additionalInfo = 'Reveja os termos, atualize sua documentação.';
      let actionRequired = '';
      let showUploadButton = false;

      if (status === 'EM ANDAMENTO') {
          description = 'Você está no processo de renovação do estágio. Certifique-se de revisar os termos e atualizar a documentação necessária.';
          actionRequired = 'Atualize a documentação e realize o upload para análise.';
          showUploadButton = true;
      } else if (status === 'EM_ANALISE') {
          description = 'Os documentos de renovação foram enviados e estão em análise.';
          additionalInfo = 'Aguarde a aprovação para continuar.';
      } else if (status === 'RECUSADO') {
          description = 'Os documentos enviados para renovação foram recusados. Por favor, revise-os e realize o upload novamente.';
          actionRequired = 'Corrija os documentos e realize o upload novamente.';
          showUploadButton = true;
      } else if (status === 'CONCLUÍDO') {
          description = 'A renovação do estágio foi concluída com sucesso.';
          additionalInfo = 'Seu contrato de estágio foi renovado com sucesso.';
          processDocuments.value = documentMap['RENOVAÇÃO DE ESTÁGIO'];
      }

      return { title: 'Renovação de Estágio', description, additionalInfo, actionRequired, showUploadButton, status };
  },
  'FIM DE ESTÁGIO': (status: string) => {
      let description = 'Esta etapa finaliza o seu período de estágio.';
      let additionalInfo = 'Procedimentos de saída, entrega de relatórios finais, etc.';
      let actionRequired = '';
      let showUploadButton = false;

      if (status === 'EM ANDAMENTO') {
          description = 'Você está na etapa final do estágio. Por favor, entregue todos os relatórios finais e a documentação necessária.';
          actionRequired = 'Submeta os relatórios finais e a documentação para conclusão.';
          showUploadButton = true;
      } else if (status === 'EM_ANALISE') {
          description = 'Os relatórios finais foram enviados e estão em análise.';
          additionalInfo = 'Aguarde a aprovação para finalizar o estágio.';
      } else if (status === 'RECUSADO') {
          description = 'Os relatórios finais foram recusados. Revise-os e realize o upload novamente.';
          actionRequired = 'Corrija os relatórios e realize o upload novamente.';
          showUploadButton = true;
      } else if (status === 'CONCLUÍDO') {
          description = 'Você concluiu o estágio com sucesso. Parabéns!';
          additionalInfo = 'Todos os requisitos foram cumpridos e o estágio está encerrado.';
          processDocuments.value = documentMap['FIM DE ESTÁGIO'];
      }

      return { title: 'Fim de Estágio', description, additionalInfo, actionRequired, showUploadButton, status };
  }
};

// Função para atualizar o conteúdo exibido com base na etapa selecionada
function updateCurrentStepContent(stepIndex: number) {
  const step = steps.value[stepIndex];
  const { title, description, additionalInfo, actionRequired, showUploadButton, status } = contentMap[step.label](step.status);

  currentStepContent.value = {
      title,
      description,
      additionalInfo,
      actionRequired,
      showUploadButton,
      status
  };
}

// Buscar informações do processo de estágio ao montar o componente
async function findinternshipProcessById() {
  const { data } = await axiosInstance.get(`processo/estagio/${internshipProcessID}`);
  internshipProcess.value = data;

  const currentStepIndex = steps.value.findIndex(s => s.label === internshipProcess.value?.movement);

  steps.value.forEach((step, index) => {
      step.status = index < currentStepIndex ? 'CONCLUÍDO' : step.status === 'NÃO INICIADO' && step.label === internshipProcess.value?.movement ? internshipProcess.value?.status || 'NÃO INICIADO' : step.status;
  });

  updateCurrentStepContent(currentStepIndex);

  connectorStyles.value = steps.value.slice(0, -1).map((_, index) => {
      const nextStepStatus = steps.value[index + 1]?.status;
      return {
          width: '100%',
          animation: 'grow 2s ease-out forwards',
          backgroundColor: nextStepStatus === 'CONCLUÍDO' ? 'green' : nextStepStatus === 'EM ANDAMENTO' || nextStepStatus === 'EM ANALISE' ? 'orange' : '#d3d3d3',
      };
  });
}

onMounted(findinternshipProcessById);
</script>

<style src="./style.scss" lang="scss">
</style>
