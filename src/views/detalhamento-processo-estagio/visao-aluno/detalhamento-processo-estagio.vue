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
            <div
              :class="[
                'circle',
                stepClasses[step.status as keyof typeof stepClasses],
              ]"
            >
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

        <div v-if="currentStepContent.additionalInfo">
          <h3>Informações adicionais:</h3>
          <p>{{ currentStepContent.additionalInfo }}</p>
        </div>

        <div v-if="currentStepContent.rejectionReason">
          <h3>Motivo da Recusa:</h3>
          <p class="rejection-reason">
            {{ currentStepContent.rejectionReason }}
          </p>
        </div>

        <div v-if="currentStepContent.actionRequired">
          <h3>Ação necessária:</h3>
          <p>{{ currentStepContent.actionRequired }}</p>
        </div>

        <div
          v-if="
            currentStepContent.rejectionReason &&
            internshipProcess?.movement === 'INÍCIO DE ESTÁGIO'
          "
        >
          <formTCE
            :internshipProcessId="internshipProcess?.id"
            :termCommitmentId="internshipProcess?.id_termCommitment"
          />
        </div>

        <div v-if="currentStepContent.showUploadButton">
          <div v-if="internshipProcess?.movement === 'FIM DE ESTÁGIO'">
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
          </div>
          <!-- refatorar -->
          <div v-if="internshipProcess?.movement === 'FIM DE ESTÁGIO'">
            <input-file
              :uploadUrl="uploadUrlComputed"
              :uploadOption="'FIM_ESTAGIO'"
              :internshipProcessId="internshipProcess?.id"
            />
          </div>
          <div v-else>
            <input-file
              :uploadUrl="uploadUrlComputed"
              :uploadOption="'INICIO_ESTAGIO'"
              :internshipProcessId="internshipProcess?.id"
            />
          </div>
        </div>

        <!-- Documentos do processo - exibido quando o status é CONCLUÍDO -->
        <div
          v-if="isCompleted && relatedDocuments.length"
          class="process-documents"
        >
          <h3>Documentos do processo:</h3>
          <section class="uploaded-area">
            <li
              class="row"
              v-for="(doc, index) in relatedDocuments"
              :key="index"
            >
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
import formTCE from '@/components/Form-TCE/form-tce.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { InternshipProcess } from '@/api/internshipProcess.interface';
import axiosInstance from '@/interceptors/axios-interceptor';
import InputFile from '../../../components/input-file/input-file.vue';

// Tipos para o conteúdo da etapa
interface StepContent {
  title: string;
  description: string;
  additionalInfo?: string;
  rejectionReason?: string;
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
  CONCLUÍDO: 'completed-step',
  'EM ANDAMENTO': 'in-progress-step',
  'EM ANALISE': 'in-analysis-step',
  RECUSADO: 'rejected-step',
  'NÃO INICIADO': 'pending-step',
};

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

const connectorStyles = ref<
  { width: string; animation: string; backgroundColor: string }[]
>([]);
const currentStepContent = ref<StepContent | null>(null);

// Propriedade computada para retornar a URL de upload correta
const uploadUrlComputed = computed(() => {
  if (!currentStepContent.value) return '';

  switch (currentStepContent.value.title) {
    case 'INÍCIO DE ESTÁGIO':
      return 'https://localhost:4001/file/upload/term';
    case 'RENOVAÇÃO DE ESTÁGIO':
      return 'https://minha-api.com/upload/renovacao-estagio';
    case 'FIM DE ESTÁGIO':
      return 'https://minha-api.com/upload/fim-estagio';
    default:
      return '';
  }
});

// Documentos relacionados a cada etapa
const documentMap: Record<string, { name: string; url: string }[]> = {
  'INÍCIO DE ESTÁGIO': [
    {
      name: 'Termo de Compromisso de Estágio',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
  ],
  'RENOVAÇÃO DE ESTÁGIO': [
    {
      name: 'Termo de Compromisso de Estágio',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
  ],
  'FIM DE ESTÁGIO': [
    {
      name: 'Termo de Compromisso de Estágio',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
    {
      name: 'Auto-Avaliação do Aluno',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
    {
      name: 'Avaliação da Concedente',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
    {
      name: 'Avaliação do Orientador',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
    {
      name: 'Atestado de Estágio',
      url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
    },
  ],
};

// Propriedade computada para verificar se a etapa atual está concluída
const isCompleted = computed(
  () => currentStepContent.value?.status === 'CONCLUÍDO',
);

// Propriedade computada para obter os documentos relacionados à etapa atual
const relatedDocuments = computed(() => {
  return isCompleted.value
    ? documentMap[currentStepContent.value?.title || ''] || []
    : [];
});

// Função para mapear o conteúdo baseado na etapa
const getContentForStep = (label: string, status: string): StepContent => {
  const baseContent: StepContent = {
    title: label,
    description: '',
    additionalInfo: '',
    rejectionReason: '',
    actionRequired: '',
    showUploadButton: false,
    status,
  };

  switch (label) {
    case 'INÍCIO DE ESTÁGIO':
      baseContent.description =
        'Esta etapa é crucial para o início do seu estágio, no qual deverá ser realizado o preenchimento de todos os dados necessários para concluir o processo.';
      if (status === 'EM ANDAMENTO') {
        baseContent.actionRequired =
          'Finalize o preenchimento do TCE com as assinaturas do Aluno e Concedente e realize o upload do documento preenchido.';
        baseContent.showUploadButton = true;
      } else if (status === 'EM ANALISE') {
        baseContent.additionalInfo =
          'O documento está sendo analisado pelo departamento de estágio. Aguarde o retorno do Termo de Compromisso de Estágio assinado, caso tudo esteja em conformidade.';
      } else if (status === 'RECUSADO') {
        baseContent.additionalInfo =
          'O documento enviado foi recusado. Por favor, revise as informações e realize o upload novamente.';
        baseContent.rejectionReason = 'aoba';
        baseContent.actionRequired =
          'Corrija as informações no TCE e realize o upload do documento corrigido.';
        baseContent.showUploadButton = false;
      } else if (status === 'CONCLUÍDO') {
        baseContent.additionalInfo =
          'Etapa concluída com sucesso! Seu estágio está ativo. Você pode avançar para a próxima etapa do processo, seja para renovação ou finalização do estágio, conforme necessário.';
      }
      break;

    case 'RENOVAÇÃO DE ESTÁGIO':
      baseContent.description =
        'Esta etapa é para a renovação do seu contrato de estágio.';
      baseContent.additionalInfo =
        'Reveja os termos, atualize sua documentação.';
      if (status === 'EM ANDAMENTO') {
        baseContent.actionRequired =
          'Atualize a documentação do Termo de Compromisso de Estágio e realize o upload para análise.';
        baseContent.showUploadButton = true;
      } else if (status === 'EM ANALISE') {
        baseContent.additionalInfo =
          'O documento está sendo analisado pelo departamento de estágio. Aguarde o retorno do documento de renovação assinado, caso tudo esteja em conformidade.';
      } else if (status === 'RECUSADO') {
        baseContent.additionalInfo =
          'O documento enviado foi recusado. Por favor, revise as informações e realize o upload novamente.';
        baseContent.rejectionReason = 'Motivo da recusa será exibido aqui.';
        baseContent.actionRequired =
          'Corrija os documentos e realize o upload novamente.';
        baseContent.showUploadButton = true;
      } else if (status === 'CONCLUÍDO') {
        baseContent.additionalInfo =
          'Etapa concluída com sucesso! Seu estágio foi renovado. Você pode avançar para a próxima etapa do processo, para finalização do estágio, conforme a data prevista no TCE.';
      }
      break;

    case 'FIM DE ESTÁGIO':
      baseContent.description =
        'Esta é a última etapa do processo para a conclusão do seu período de estágio.';
      if (status === 'EM ANDAMENTO') {
        baseContent.actionRequired =
          'Submeta os relatórios finais e a documentação para conclusão.';
        baseContent.showUploadButton = true;
      } else if (status === 'EM ANALISE') {
        baseContent.additionalInfo =
          'O documento está em análise pelo departamento de estágio, aguarde a validação e o retorno do Atestado de Estágio. ';
      } else if (status === 'RECUSADO') {
        baseContent.additionalInfo =
          'Os relatórios finais foram recusados por algumas inconsistências de informações.';
        baseContent.rejectionReason = 'Motivo da recusa será exibido aqui.';
        baseContent.actionRequired = 'Revise-os e realize o upload novamente.';
        baseContent.showUploadButton = true;
      } else if (status === 'CONCLUÍDO') {
        baseContent.additionalInfo =
          'Etapa concluída com sucesso! Todos os requisitos foram cumpridos e o seu estágio foi finalizado.';
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
  const { data } = await axiosInstance.get(
    `processo/estagio/${internshipProcessID}`,
  );
  internshipProcess.value = data;

  const currentStepIndex = steps.value.findIndex(
    (s) => s.label === internshipProcess.value?.movement,
  );

  steps.value.forEach((step, index) => {
    step.status =
      index < currentStepIndex
        ? 'CONCLUÍDO'
        : step.status === 'NÃO INICIADO' &&
          step.label === internshipProcess.value?.movement
        ? internshipProcess.value?.status || 'NÃO INICIADO'
        : step.status;
  });

  updateCurrentStepContent(currentStepIndex);

  connectorStyles.value = steps.value.slice(0, -1).map((_, index) => {
    const nextStepStatus = steps.value[index + 1]?.status;
    return {
      width: '100%',
      animation: 'grow 2s ease-out forwards',
      backgroundColor:
        nextStepStatus === 'CONCLUÍDO'
          ? 'green'
          : nextStepStatus === 'EM ANDAMENTO' || nextStepStatus === 'EM ANALISE'
          ? 'orange'
          : '#d3d3d3',
    };
  });
};

onMounted(findinternshipProcessById);
</script>

<style src="./style.scss" lang="scss" scoped></style>
