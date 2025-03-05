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

        <div v-if="currentStepContent.actionRequired">
          <h3>Ação necessária:</h3>
          <p>{{ currentStepContent.actionRequired }}</p>
        </div>

        <!-- Documentos para download na etapa de Análise -->
        <div
          v-if="
            currentStepContent.status === InternshipProcessStatus.EM_ANALISE &&
            relatedDocuments.length
          "
        >
          <h3>Documentos para Download:</h3>
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
          <h3>Ação necessária:</h3>
          <p>
            Se os arquivos estiverem corretos, faça o upload do documento
            necessário. Caso identifique inconsistências, descreva os motivos da
            recusa e prossiga com a rejeição.
          </p>
        </div>

        <!-- Componente de upload de arquivo, exibido no status EM ANALISE -->
        <div
          v-if="
            internshipProcess?.movement ===
            InternshipProcessMovement.INICIO_ESTAGIO
          "
        >
          <input-file
            :uploadUrl="uploadUrlComputed"
            :uploadOption="InternshipProcessMovement.INICIO_ESTAGIO"
            :internshipProcessId="internshipProcess?.id"
            :multiple="false"
          />
        </div>

        <div
          v-if="
            internshipProcess?.movement ===
            InternshipProcessMovement.FIM_ESTAGIO
          "
        >
          <input-file
            :uploadUrl="uploadUrlComputed"
            :uploadOption="InternshipProcessMovement.FIM_ESTAGIO"
            :uploadStatus="InternshipProcessStatus.EM_ANALISE"
            :internshipProcessId="internshipProcess?.id"
            :multiple="false"
          />
        </div>

        <!-- Botão de recusa de documentos -->
        <div
          v-if="
            currentStepContent.status === InternshipProcessStatus.EM_ANALISE
          "
          class="div-reject-button"
        >
          <v-form>
            <v-container>
              <v-text-field v-model="remark">
                <template v-slot:label>
                  <span>
                    Descreva o motivo da <strong>Recusa</strong> dos documentos
                    <v-icon icon="mdi-close-circle"></v-icon>
                  </span>
                </template>
              </v-text-field>
            </v-container>
          </v-form>
          <button class="reject-button" @click="recusarDoc">
            Recusar Documentos
          </button>
        </div>

        <!-- Componente de diálogo do Vuetify -->
        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-update"
            text="Os documentos foram recusados com sucesso e o aluno foi notificado."
            title="Recusa de Documentos"
          >
            <template v-slot:actions>
              <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </template>
          </v-card>
        </v-dialog>

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
const remark = ref('');

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

const connectorStyles = ref<
  { width: string; animation: string; backgroundColor: string }[]
>([]);
const currentStepContent = ref<StepContent | null>(null);

const getFilePathId = (fileType: string, movement: string) => {
  let history = internshipProcess.value?.statusHistory;

  // Se o histórico não estiver definido, retorne null
  if (!history) return null;

  // Ordenar o histórico do mais recente para o mais antigo
  history = history.filter((history) => {
    if (history.movement === movement) return history;
  });

  history = history.sort((a, b) => {
    // Converte as strings de data ou usa um valor padrão (como 0) se for null
    const startDateA = a.startDate ? new Date(a.startDate).getTime() : 0; // Retorna 0 se startDate for null
    const startDateB = b.startDate ? new Date(b.startDate).getTime() : 0; // Retorna 0 se startDate for null
    return startDateB - startDateA; // Ordena do mais recente para o mais antigo
  });

  console.log(history);

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

//refatorar tudo
// Documentos relacionados a cada etapa
const documentMap = computed(() => {
  const templateTermfileId = getFilePathId(
    'TERM_COMMITMENT',
    InternshipProcessMovement.INICIO_ESTAGIO,
  );
  const templateAutoAvaliacaoAlunoId = getFilePathId(
    FileTypeBackend.STUDENT_SELF_EVALUATION,
    InternshipProcessMovement.FIM_ESTAGIO,
  );
  const templateAvaliacaoConcedenteId = getFilePathId(
    FileTypeBackend.INTERNSHIP_GRANTOR_EVALUATION,
    InternshipProcessMovement.FIM_ESTAGIO,
  );
  const templateProfOrientadorId = getFilePathId(
    FileTypeBackend.SUPERVISOR_EVALUATION,
    InternshipProcessMovement.FIM_ESTAGIO,
  );
  const url = templateTermfileId?.length ? templateTermfileId[0] : [''];
  const urlAutoAvaliacaoAluno = templateAutoAvaliacaoAlunoId?.length
    ? templateAutoAvaliacaoAlunoId[0]
    : [''];

  return {
    INICIO_DE_ESTAGIO: [
      {
        name: 'Termo de Compromisso de Estágio',
        url: `http://localhost:4001/file/download/term?path=${url}`,
      },
    ],
    RENOVACAO: [
      {
        name: 'Termo de Compromisso de Estágio',
        url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
      },
    ],
    FIM_ESTAGIO: [
      {
        name: 'Termo de Compromisso de Estágio',
        url: `http://localhost:4001/file/download/term?path=${url}`,
      },
      {
        name: 'Auto-Avaliação do Aluno',
        url: `http://localhost:4001/file/download/internship/evaluation?path=${urlAutoAvaliacaoAluno}`,
      },
      {
        name: 'Avaliação da Concedente',
        url: `http://localhost:4001/file/download/internship/evaluation?path=${templateAvaliacaoConcedenteId}`,
      },
      {
        name: 'Avaliação do Orientador',
        url: `http://localhost:4001/file/download/internship/evaluation?path=${templateProfOrientadorId}`,
      },
      {
        name: 'Atestado de Estágio',
        url: 'https://sigaa.ifpa.edu.br/sigaa/verProducao?idProducao=1045921&&key=36338608351fb343fa69a03f1ba0b512',
      },
    ],
  };
});

// Propriedade computada para verificar se a etapa atual está concluída
const isCompleted = computed(
  () => currentStepContent.value?.status === 'CONCLUÍDO',
);

// Propriedade computada para obter os documentos relacionados à etapa atual
const relatedDocuments = computed(() => {
  const document = documentMap.value;
  console.log(document);
  let documentKey;
  const currentTitle = currentStepContent.value?.title || '';
  const currentStatus = currentStepContent.value?.status || '';

  if (currentTitle === InternshipProcessMovement.FIM_ESTAGIO) {
    if (currentStatus === 'CONCLUÍDO') {
      // Exibe todos os documentos, incluindo o Atestado de Estágio
      return document.FIM_ESTAGIO;
    } else if (currentStatus === InternshipProcessStatus.EM_ANALISE) {
      // Exibe apenas o Termo, Auto-Avaliação, Avaliação da Concedente e Avaliação do Orientador
      return document.FIM_ESTAGIO.filter(
        (doc) => doc.name !== 'Atestado de Estágio',
      );
    }
  }

  switch (currentTitle) {
    case InternshipProcessMovement.INICIO_ESTAGIO:
      documentKey = document.INICIO_DE_ESTAGIO;
      break;
    case InternshipProcessMovement.RENOVACAO:
      documentKey = document.RENOVACAO;
      break;
    case InternshipProcessMovement.FIM_ESTAGIO:
      documentKey = document.FIM_ESTAGIO;
      break;
  }
  // Para as outras etapas, retornar os documentos normais
  return documentKey || [];
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
    case InternshipProcessMovement.INICIO_ESTAGIO:
      baseContent.description =
        'Esta etapa é a qual o Aluno irá realizar o preenchimento de todos os dados necessários para o Termo de Compromisso de Estágio e o envio do mesmo.';
      if (status === InternshipProcessStatus.EM_ANALISE) {
        baseContent.additionalInfo =
          'O Termo de Compromisso de Estágio foi submetido pelo aluno para análise. Realize a verificação das informações preenchidas e das assinaturas presentes no documento. Após a avaliação, favor proceder com a assinatura e devolução do mesmo.';
        baseContent.showUploadButton = true;
      }
      break;

    case InternshipProcessMovement.RENOVACAO:
      baseContent.description =
        'Esta etapa é para a renovação do Termo de Compromisso de Estágio do aluno.';
      if (status === InternshipProcessStatus.EM_ANALISE) {
        baseContent.additionalInfo =
          'O Termo de Compromisso de Estágio foi enviado para renovação. Por favor, revise o documento e, após a análise, realize o upload do termo assinado, caso todas as informações estejam corretas e completas.';
        baseContent.showUploadButton = true;
      }
      break;

    case InternshipProcessMovement.FIM_ESTAGIO:
      baseContent.description =
        'Esta é a última etapa do processo para a conclusão do período de estágio.';
      if (status === InternshipProcessStatus.EM_ANALISE) {
        baseContent.additionalInfo =
          'Revise os documentos finais do estágio, incluindo o Termo de Compromisso, a Auto-Avaliação, e as Avaliações do Concedente e Orientador. Caso todos os itens estejam corretos, finalize o processo enviando o Atestado de Estágio.';
        baseContent.showUploadButton = true;
      }
      break;

    default:
      break;
  }

  return baseContent;
};

const recusarDoc = async () => {
  if (
    internshipProcess.value?.movement === InternshipProcessMovement.FIM_ESTAGIO
  ) {
    await axiosBackEndInstance.post(
      '/processo/estagio/validate/assign-end-internship',
      {
        validate: false,
        remark: remark.value,
        internshipProcessId: internshipProcessID,
      },
    );
  } else if (
    internshipProcess.value?.movement ===
    InternshipProcessMovement.INICIO_ESTAGIO
  ) {
    await axiosBackEndInstance.post('/termCommitment/validate/assign', {
      validate: false,
      remark: remark.value,
      internshipProcessId: internshipProcessID,
    });
  }
  window.location.reload();
};

// Função para atualizar o conteúdo exibido com base na etapa selecionada
const updateCurrentStepContent = (stepIndex: number) => {
  const step = steps.value[stepIndex];
  currentStepContent.value = getContentForStep(step.label, step.status);
  console.log(currentStepContent.value);
};

// Buscar informações do processo de estágio ao montar o componente
const findinternshipProcessById = async () => {
  const { data } = await axiosBackEndInstance.get(
    `processo/estagio/${internshipProcessID}`,
  );
  internshipProcess.value = data;

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
