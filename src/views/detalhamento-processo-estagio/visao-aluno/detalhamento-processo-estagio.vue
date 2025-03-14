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
              <template
                v-if="step.status === InternshipProcessStatus.CONCLUIDO"
              >
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

        <div class="process-documents">
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

        <div
          v-if="
            currentStepContent.rejectionReason &&
            internshipProcess?.movement ===
              InternshipProcessMovement.INICIO_ESTAGIO
          "
        >
          <formTCE
            :internshipProcessId="internshipProcess?.id"
            :termCommitmentId="internshipProcess?.id_termCommitment"
          />
        </div>

        <div v-if="currentStepContent.showUploadButton">
          <div
            v-if="
              internshipProcess?.movement ===
              InternshipProcessMovement.FIM_ESTAGIO
            "
          >
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
          <div
            v-if="
              internshipProcess?.movement ===
              InternshipProcessMovement.FIM_ESTAGIO
            "
          >
            <input-file
              :uploadUrl="uploadUrlComputed"
              :uploadOption="InternshipProcessMovement.FIM_ESTAGIO"
              :internshipProcessId="internshipProcess?.id"
            />
          </div>
          <div v-else>
            <input-file
              :uploadUrl="uploadUrlComputed"
              :multiple="false"
              :uploadOption="InternshipProcessMovement.INICIO_ESTAGIO"
              :internshipProcessId="internshipProcess?.id"
            />
          </div>
        </div>

        <!-- Documentos do processo - exibido quando o status é CONCLUÍDO -->
        <!-- <div
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
        </div> -->
      </div>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import formTCE from '@/components/Form-TCE/form-tce.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
  type InternshipProcess,
} from '@/api/internshipProcess.interface';
import axiosBackEndInstance from '@/interceptors/axios-backend-interceptor';
import InputFile from '../../../components/input-file/input-file.vue';
import { FileTypeBackend } from '@/api/fileType.enum';

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
const filePathId = ref<string | undefined>('');

const steps = ref([
  { label: InternshipProcessMovement.INICIO_ESTAGIO, status: 'NÃO INICIADO' },
  { label: InternshipProcessMovement.RENOVACAO, status: 'NÃO INICIADO' },
  { label: InternshipProcessMovement.FIM_ESTAGIO, status: 'NÃO INICIADO' },
]);

const stepClasses: Record<string, string> = {
  CONCLUIDO: 'completed-step',
  EM_ANDAMENTO: 'in-progress-step',
  EM_ANALISE: 'in-analysis-step',
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
    case InternshipProcessMovement.INICIO_ESTAGIO:
      return 'https://localhost:4001/file/upload/term';
    case InternshipProcessMovement.RENOVACAO:
      return 'https://minha-api.com/upload/renovacao-estagio';
    case InternshipProcessMovement.FIM_ESTAGIO:
      return 'https://minha-api.com/upload/fim-estagio';
    default:
      return '';
  }
});

// Documentos relacionados a cada etapa
const documentMap = computed(() => {
  const templateTermfileId = getFilePathId(
    FileTypeBackend.TERM_COMMITMENT,
    InternshipProcessMovement.INICIO_ESTAGIO,
  );

  const certificadoEstagioPath = getFilePathId(
    FileTypeBackend.INTERNSHIP_CERTIFICATE,
    InternshipProcessMovement.FIM_ESTAGIO,
  );

  const autoAvaliacaoAlunoPath = getFilePathId(
    FileTypeBackend.STUDENT_SELF_EVALUATION,
    InternshipProcessMovement.FIM_ESTAGIO,
  );

  const avaliacaoConcedentePath = getFilePathId(
    FileTypeBackend.INTERNSHIP_GRANTOR_EVALUATION,
    InternshipProcessMovement.FIM_ESTAGIO,
  );

  const avaliacaoProfOrientadorPath = getFilePathId(
    FileTypeBackend.SUPERVISOR_EVALUATION,
    InternshipProcessMovement.FIM_ESTAGIO,
  );

  return {
    INICIO_DE_ESTAGIO: [
      {
        name: 'Termo de Compromisso de Estágio',
        url: `http://localhost:4001/file/download/term?path=${templateTermfileId}`,
      },
    ],
    'RENOVAÇÃO DE ESTÁGIO': [
      {
        name: 'Termo de Compromisso de Estágio',
        url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
      },
    ],
    FIM_DE_ESTAGIO: [
      {
        name: 'Termo de Compromisso de Estágio',
        url: `http://localhost:4001/file/download/term?path=${templateTermfileId}`,
      },
      {
        name: 'Auto-Avaliação do Aluno',
        url: `http://localhost:4001/file/download/internship/evaluation?path=${autoAvaliacaoAlunoPath}`,
      },
      {
        name: 'Avaliação da Concedente',
        url: `http://localhost:4001/file/download/internship/evaluation?path=${avaliacaoConcedentePath}`,
      },
      {
        name: 'Avaliação do Orientador',
        url: `http://localhost:4001/file/download/internship/evaluation?path=${avaliacaoProfOrientadorPath}`,
      },
      {
        name: 'Atestado de Estágio',
        url: `http://localhost:4001/file/download/internship-certificate?path=${certificadoEstagioPath}`,
      },
    ],
  };
});

// Propriedade computada para verificar se a etapa atual está concluída
const isCompleted = computed(
  () => currentStepContent.value?.status === InternshipProcessStatus.CONCLUIDO,
);

// Propriedade computada para obter os documentos relacionados à etapa atual
const relatedDocuments = computed(() => {
  //colocar condição para em andamento e inicio de estagio retornar o primeiro file com id de file vindo do processo
  console.log(currentStepContent.value?.title);
  return documentMap.value[currentStepContent.value?.title || ''];
});

const getMotivoRecusa = (movement: string): string => {
  let history = internshipProcess.value?.statusHistory;

  // Se o histórico não estiver definido, retorne null
  if (!history) return '';

  // Ordenar o histórico do mais recente para o mais antigo
  history = history.filter((history) => {
    if (
      history.movement === movement &&
      history.status === InternshipProcessStatus.RECUSADO
    ) {
      return history;
    }
  });

  history = history.sort((a, b) => {
    // Converte as strings de data ou usa um valor padrão (como 0) se for null
    const startDateA = a.startDate ? new Date(a.startDate).getTime() : 0; // Retorna 0 se startDate for null
    const startDateB = b.startDate ? new Date(b.startDate).getTime() : 0; // Retorna 0 se startDate for null
    return startDateB - startDateA; // Ordena do mais recente para o mais antigo
  });

  const mostRecentHistory = history[0]; // O primeiro após ordenar é o mais recente

  return mostRecentHistory.observacoes ?? '';
};

const getFilePathId = (fileType: string, movement: string) => {
  let history = internshipProcess.value?.statusHistory;

  // Se o histórico não estiver definido, retorne null
  if (!history) return null;

  // Ordenar o histórico do mais recente para o mais antigo
  if (
    movement === InternshipProcessMovement.FIM_ESTAGIO &&
    fileType !== FileTypeBackend.INTERNSHIP_CERTIFICATE
  ) {
    history = history.filter((history) => {
      if (
        history.movement === movement &&
        history.status === InternshipProcessStatus.EM_ANALISE
      ) {
        return history;
      }
    });
  } else {
    history = history.filter((history) => {
      if (
        history.movement === movement &&
        history.status !== InternshipProcessStatus.EM_ANALISE
      ) {
        return history;
      }
    });
  }

  history = history.sort((a, b) => {
    // Converte as strings de data ou usa um valor padrão (como 0) se for null
    const startDateA = a.startDate ? new Date(a.startDate).getTime() : 0; // Retorna 0 se startDate for null
    const startDateB = b.startDate ? new Date(b.startDate).getTime() : 0; // Retorna 0 se startDate for null
    return startDateB - startDateA; // Ordena do mais recente para o mais antigo
  });
  // Pegar o histórico mais recente
  const mostRecentHistory = history[0]; // O primeiro após ordenar é o mais recente

  // Se o histórico mais recente não tiver arquivos, retorne null
  if (!mostRecentHistory || !mostRecentHistory.files) return null;

  // Filtrar os arquivos do tipo desejado
  const files = mostRecentHistory.files.filter(
    (file) => file.fileType === fileType,
  );

  // Retornar apenas os caminhos dos arquivos encontrados (ou retornar null se nenhum arquivo for encontrado)
  return files.length > 0 ? files.map((file) => file.filePath) : null;
};

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
    case InternshipProcessMovement.INICIO_ESTAGIO:
      baseContent.description =
        'Esta etapa é crucial para o início do seu estágio, no qual deverá ser realizado o preenchimento de todos os dados necessários para concluir o processo.';
      if (status === InternshipProcessStatus.EM_ANDAMENTO) {
        baseContent.actionRequired =
          'Finalize o preenchimento do TCE com as assinaturas do Aluno e Concedente e realize o upload do documento preenchido.';
        baseContent.showUploadButton = true;
      } else if (status === InternshipProcessStatus.EM_ANALISE) {
        baseContent.additionalInfo =
          'O documento está sendo analisado pelo departamento de estágio. Aguarde o retorno do Termo de Compromisso de Estágio assinado, caso tudo esteja em conformidade.';
      } else if (status === InternshipProcessStatus.RECUSADO) {
        baseContent.additionalInfo =
          'O documento enviado foi recusado. Por favor, revise as informações e realize o upload novamente.';
        baseContent.rejectionReason = getMotivoRecusa(
          InternshipProcessMovement.INICIO_ESTAGIO,
        );
        baseContent.actionRequired =
          'Corrija as informações no TCE e realize o upload do documento corrigido.';
        baseContent.showUploadButton = false;
      } else if (status === InternshipProcessStatus.CONCLUIDO) {
        baseContent.additionalInfo =
          'Etapa concluída com sucesso! Seu estágio está ativo. Você pode avançar para a próxima etapa do processo, seja para renovação ou finalização do estágio, conforme necessário.';
      }
      break;

    case InternshipProcessMovement.RENOVACAO:
      baseContent.description =
        'Esta etapa é para a renovação do seu contrato de estágio.';
      baseContent.additionalInfo =
        'Reveja os termos, atualize sua documentação.';
      if (status === InternshipProcessStatus.EM_ANDAMENTO) {
        baseContent.actionRequired =
          'Atualize a documentação do Termo de Compromisso de Estágio e realize o upload para análise.';
        baseContent.showUploadButton = true;
      } else if (status === InternshipProcessStatus.EM_ANALISE) {
        baseContent.additionalInfo =
          'O documento está sendo analisado pelo departamento de estágio. Aguarde o retorno do documento de renovação assinado, caso tudo esteja em conformidade.';
      } else if (status === InternshipProcessStatus.RECUSADO) {
        baseContent.additionalInfo =
          'O documento enviado foi recusado. Por favor, revise as informações e realize o upload novamente.';
        baseContent.rejectionReason = 'Motivo da recusa será exibido aqui.';
        baseContent.actionRequired =
          'Corrija os documentos e realize o upload novamente.';
        baseContent.showUploadButton = true;
      } else if (status === InternshipProcessStatus.CONCLUIDO) {
        baseContent.additionalInfo =
          'Etapa concluída com sucesso! Seu estágio foi renovado. Você pode avançar para a próxima etapa do processo, para finalização do estágio, conforme a data prevista no TCE.';
      }
      break;

    case InternshipProcessMovement.FIM_ESTAGIO:
      baseContent.description =
        'Esta é a última etapa do processo para a conclusão do seu período de estágio.';
      if (status === InternshipProcessStatus.EM_ANDAMENTO) {
        baseContent.actionRequired =
          'Submeta os relatórios finais e a documentação para conclusão.';
        baseContent.showUploadButton = true;
      } else if (status === InternshipProcessStatus.EM_ANALISE) {
        baseContent.additionalInfo =
          'O documento está em análise pelo departamento de estágio, aguarde a validação e o retorno do Atestado de Estágio. ';
      } else if (status === InternshipProcessStatus.RECUSADO) {
        baseContent.additionalInfo =
          'Os relatórios finais foram recusados por algumas inconsistências de informações.';
        baseContent.rejectionReason = 'Motivo da recusa será exibido aqui.';
        baseContent.actionRequired = 'Revise-os e realize o upload novamente.';
        baseContent.showUploadButton = true;
      } else if (status === InternshipProcessStatus.CONCLUIDO) {
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
  const { data } = await axiosBackEndInstance.get(
    `processo/estagio/${internshipProcessID}`,
  );
  internshipProcess.value = data;
  console.log(internshipProcess.value);

  const currentStepIndex = steps.value.findIndex(
    (s) => s.label === internshipProcess.value?.movement,
  );

  steps.value.forEach((step, index) => {
    step.status =
      index < currentStepIndex
        ? InternshipProcessStatus.CONCLUIDO
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
        nextStepStatus === InternshipProcessStatus.CONCLUIDO
          ? 'green'
          : nextStepStatus === InternshipProcessStatus.EM_ANDAMENTO ||
            nextStepStatus === InternshipProcessStatus.EM_ANALISE
          ? 'orange'
          : '#d3d3d3',
    };
  });
};

onMounted(findinternshipProcessById);
</script>

<style src="./style.scss" lang="scss" scoped></style>
