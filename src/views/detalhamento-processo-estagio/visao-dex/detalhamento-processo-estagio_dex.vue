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
            <div v-if="index < steps.length - 1" class="connector" :style="connectorStyles[index]"></div>
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

        <div v-if="currentStepContent.additionalInfo">
          <h3>Informações adicionais:</h3>
          <p>{{ currentStepContent.additionalInfo }}</p>
        </div>

        <div v-if="currentStepContent.actionRequired">
          <h3>Ação necessária:</h3>
          <p>{{ currentStepContent.actionRequired }}</p>
        </div>

        <!-- Documentos para download na etapa de Análise -->
        <div v-if="currentStepContent.status === 'EM ANALISE' && relatedDocuments.length">
          <h3>Documentos para Download:</h3>
          <section class="uploaded-area">
            <li class="row" v-for="(doc, index) in relatedDocuments" :key="index">
              <div class="fileUpload">
                <div class="content upload">
                  <i class="mdi mdi-file-document"></i>
                  <span class="name">{{ doc.name }}</span>
                  <a :href="doc.url" download class="download-link">
                    <v-icon small class="download-icon">mdi-download</v-icon>
                  </a>
                </div>
              </div>
            </li>
          </section>
          <h3>Ação necessária:</h3>
          <p>Se os arquivos estiverem corretos, faça o upload do documento necessário. Caso identifique inconsistências, descreva os motivos da recusa e prossiga com a rejeição.</p>
        </div>

        <!-- Componente de upload de arquivo, exibido no status EM ANALISE -->
        <div v-if="currentStepContent.showUploadButton">
          <input-file :uploadUrl="uploadUrlComputed" />
        </div>

          <!-- Botão de recusa de documentos -->
          <div v-if="currentStepContent.status === 'EM ANALISE'" class="div-reject-button">
            <v-form>
              <v-container>
                <v-text-field>
                  <template v-slot:label>
                    <span>
                      Descreva o motivo da <strong>Recusa</strong> dos documentos <v-icon icon="mdi-close-circle"></v-icon>
                    </span>
                  </template>
                </v-text-field>
              </v-container>
            </v-form>
            <button class="reject-button" @click="dialog = true">Recusar Documentos</button>
          </div>

          <!-- Componente de diálogo do Vuetify -->
          <v-dialog
            v-model="dialog"
            width="auto"
          >
            <v-card
              max-width="400"
              prepend-icon="mdi-update"
              text="Os documentos foram recusados com sucesso e o aluno foi notificado."
              title="Recusa de Documentos"
            >
              <template v-slot:actions>
                <v-btn
                  class="ms-auto"
                  text="Ok"
                  @click="dialog = false"
                ></v-btn>
              </template>
            </v-card>
          </v-dialog>

        <!-- Documentos do processo - exibido quando o status é CONCLUÍDO -->
        <div v-if="isCompleted && relatedDocuments.length" class="process-documents">
          <h3>Documentos do processo:</h3>
          <section class="uploaded-area">
            <li class="row" v-for="(doc, index) in relatedDocuments" :key="index">
              <div class="fileUpload">
                <div class="content upload">
                  <i class="mdi mdi-file-document"></i>
                  <span class="name">{{ doc.name }}</span>
                  <a :href="doc.url" download class="download-link">
                    <v-icon small class="download-icon">mdi-download</v-icon>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { InternshipProcess } from '@/api/internshipProcess.interface';
import axiosInstance from '@/interceptors/axios-interceptor';
import InputFile from '../../../components/input-file/input-file.vue';

const dialog = ref(false);
// Tipos para o conteúdo da etapa
interface StepContent {
  title: string;
  description: string;
  additionalInfo?: string;
  actionRequired?: string;
  showUploadButton?: boolean;
  status: string;
}

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
const currentStepContent = ref<StepContent | null>(null);

// Propriedade computada para retornar a URL de upload correta
const uploadUrlComputed = computed(() => {
  if (!currentStepContent.value) return '';

  switch (currentStepContent.value.title) {
    case 'INÍCIO DE ESTÁGIO':
      return 'https://minha-api.com/upload/inicio-estagio';
    case 'RENOVAÇÃO DE ESTÁGIO':
      return 'https://minha-api.com/upload/renovacao-estagio';
    case 'FIM DE ESTÁGIO':
      return 'https://minha-api.com/upload/fim-estagio';
    default:
      return '';
  }
});

// Função para rejeitar documentos

// Documentos relacionados a cada etapa
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
    { name: 'Atestado de Estágio', url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512' },
  ],
};

// Propriedade computada para verificar se a etapa atual está concluída
const isCompleted = computed(() => currentStepContent.value?.status === 'CONCLUÍDO');

// Propriedade computada para obter os documentos relacionados à etapa atual
const relatedDocuments = computed(() => {
  const currentTitle = currentStepContent.value?.title || '';
  const currentStatus = currentStepContent.value?.status || '';

  if (currentTitle === 'FIM DE ESTÁGIO') {
    if (currentStatus === 'CONCLUÍDO') {
      // Exibe todos os documentos, incluindo o Atestado de Estágio
      return documentMap['FIM DE ESTÁGIO'];
    } else if (currentStatus === 'EM ANALISE') {
      // Exibe apenas o Termo, Auto-Avaliação, Avaliação da Concedente e Avaliação do Orientador
      return documentMap['FIM DE ESTÁGIO'].filter(doc => doc.name !== 'Atestado de Estágio');
    }
  }

  // Para as outras etapas, retornar os documentos normais
  return documentMap[currentTitle] || [];
});

// Função para mapear o conteúdo baseado na etapa
const getContentForStep = (label: string, status: string): StepContent => {
  const baseContent: StepContent = {
    title: label,
    description: '',
    additionalInfo: '',
    actionRequired: '',
    showUploadButton: false,
    status,
  };

  switch (label) {
    case 'INÍCIO DE ESTÁGIO':
      baseContent.description = 'Esta etapa é a qual o Aluno irá realizar o preenchimento de todos os dados necessários para o Termo de Compromisso de Estágio e o envio do mesmo.';
      if (status === 'EM ANALISE') {
        baseContent.additionalInfo = 'O Termo de Compromisso de Estágio foi submetido pelo aluno para análise. Realize a verificação das informações preenchidas e das assinaturas presentes no documento. Após a avaliação, favor proceder com a assinatura e devolução do mesmo.';
        baseContent.showUploadButton = true;
      }
      break;

    case 'RENOVAÇÃO DE ESTÁGIO':
      baseContent.description = 'Esta etapa é para a renovação do Termo de Compromisso de Estágio do aluno.';
      if (status === 'EM ANALISE') {
        baseContent.additionalInfo = 'O Termo de Compromisso de Estágio foi enviado para renovação. Por favor, revise o documento e, após a análise, realize o upload do termo assinado, caso todas as informações estejam corretas e completas.';
        baseContent.showUploadButton = true;
      }
      break;

    case 'FIM DE ESTÁGIO':
      baseContent.description = 'Esta é a última etapa do processo para a conclusão do período de estágio.';
      if (status === 'EM ANALISE') {
        baseContent.additionalInfo = 'Revise os documentos finais do estágio, incluindo o Termo de Compromisso, a Auto-Avaliação, e as Avaliações do Concedente e Orientador. Caso todos os itens estejam corretos, finalize o processo enviando o Atestado de Estágio.';
        baseContent.showUploadButton = true;
      }
      break;

    default:
      break;
  }

  return baseContent;
};

// Função para atualizar o conteúdo exibido com base na etapa selecionada
const updateCurrentStepContent = (stepIndex: number) => {
  const step = steps.value[stepIndex];
  currentStepContent.value = getContentForStep(step.label, step.status);
};

// Buscar informações do processo de estágio ao montar o componente
const findinternshipProcessById = async () => {
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
};

onMounted(findinternshipProcessById);
</script>

<style src="./style.scss" lang="scss" scoped></style>
