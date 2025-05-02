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
                v-if="step.status === InternshipProcessStatus.COMPLETED"
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
        <div>
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
              InternshipProcessMovement.STAGE_START &&
            internshipProcess?.status !== InternshipProcessStatus.REJECTED &&
            internshipProcess?.status !== InternshipProcessStatus.COMPLETED
          "
        >
          <input-file
            :uploadUrl="uploadUrlComputed"
            :uploadOption="InternshipProcessMovement.STAGE_START"
            :internshipProcessId="internshipProcess?.id"
            :multiple="false"
          />
        </div>

        <div
          v-if="
            internshipProcess?.movement ===
              InternshipProcessMovement.STAGE_END &&
            internshipProcess?.status !== InternshipProcessStatus.COMPLETED
          "
        >
          <input-file
            :uploadUrl="uploadUrlComputed"
            :uploadOption="InternshipProcessMovement.STAGE_END"
            :uploadStatus="InternshipProcessStatus.UNDER_REVIEW"
            :internshipProcessId="internshipProcess?.id"
            :multiple="false"
          />
        </div>

        <!-- Botão de recusa de documentos -->
        <div
          v-if="
            currentStepContent.status === InternshipProcessStatus.UNDER_REVIEW
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
      <v-dialog v-model="intervalErrorDialog" persistent width="640">
        <v-card>
          <v-card-title>
            <span class="text-h5" style="color: red"
              >Erro ao Recusar Processo!</span
            >
          </v-card-title>
          <v-card-text> {{ messageError }} </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              @click="intervalErrorDialog = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
} from '@/core/domain/entities/internshipProcess.entity';
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
import InputFile from '@/components/input-file/input-file.vue';
import { FileType } from '@/core/domain/entities/file.entity';

const dialog = ref(false);
const intervalErrorDialog = ref(false);
const messageError = ref('');
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
  { label: InternshipProcessMovement.STAGE_START, status: 'NÃO INICIADO' },
  { label: InternshipProcessMovement.RENEWAL, status: 'NÃO INICIADO' },
  { label: InternshipProcessMovement.STAGE_END, status: 'NÃO INICIADO' },
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
  if (
    movement === InternshipProcessMovement.STAGE_END &&
    fileType !== FileType.INTERNSHIP_CERTIFICATE
  ) {
    history = history.filter((history) => {
      if (
        history.movement === movement &&
        history.status === InternshipProcessStatus.UNDER_REVIEW
      ) {
        return history;
      }
    });
  } else {
    history = history.filter((history) => {
      if (history.movement === movement) {
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

// Propriedade computada para retornar a URL de upload correta
const uploadUrlComputed = computed(() => {
  if (!currentStepContent.value) return '';

  switch (currentStepContent.value.title) {
    case InternshipProcessMovement.STAGE_START:
      return 'https://localhost:4001/file/upload/term';
    case InternshipProcessMovement.RENEWAL:
      return 'https://minha-api.com/upload/renovacao-estagio';
    case InternshipProcessMovement.STAGE_END:
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
    InternshipProcessMovement.STAGE_START,
  );
  const templateAutoAvaliacaoAlunoId = getFilePathId(
    FileType.STUDENT_SELF_EVALUATION,
    InternshipProcessMovement.STAGE_END,
  );
  const certificadoEstagioPath = getFilePathId(
    FileType.INTERNSHIP_CERTIFICATE,
    InternshipProcessMovement.STAGE_END,
  );

  const autoAvaliacaoAlunoPath = getFilePathId(
    FileType.STUDENT_SELF_EVALUATION,
    InternshipProcessMovement.STAGE_END,
  );

  const avaliacaoConcedentePath = getFilePathId(
    FileType.INTERNSHIP_GRANTOR_EVALUATION,
    InternshipProcessMovement.STAGE_END,
  );

  const avaliacaoProfOrientadorPath = getFilePathId(
    FileType.SUPERVISOR_EVALUATION,
    InternshipProcessMovement.STAGE_END,
  );
  const url = templateTermfileId?.length ? templateTermfileId[0] : [''];

  return {
    INICIO_DE_ESTAGIO: [
      {
        name: 'Termo de Compromisso de Estágio',
        url: `http://localhost:4001/file/download/term?path=${templateTermfileId}`,
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
  () => currentStepContent.value?.status === 'CONCLUÍDO',
);

// Propriedade computada para obter os documentos relacionados à etapa atual
const relatedDocuments = computed(() => {
  const document = documentMap.value;
  console.log(document);
  let documentKey;
  const currentTitle = currentStepContent.value?.title || '';
  const currentStatus = currentStepContent.value?.status || '';

  if (currentTitle === InternshipProcessMovement.STAGE_END) {
    if (currentStatus === 'CONCLUÍDO') {
      // Exibe todos os documentos, incluindo o Atestado de Estágio
      return document.FIM_ESTAGIO;
    } else if (currentStatus === InternshipProcessStatus.UNDER_REVIEW) {
      // Exibe apenas o Termo, Auto-Avaliação, Avaliação da Concedente e Avaliação do Orientador
      return document.FIM_ESTAGIO.filter(
        (doc) => doc.name !== 'Atestado de Estágio',
      );
    }
  }

  switch (currentTitle) {
    case InternshipProcessMovement.STAGE_START:
      documentKey = document.INICIO_DE_ESTAGIO;
      break;
    case InternshipProcessMovement.RENEWAL:
      documentKey = document.RENOVACAO;
      break;
    case InternshipProcessMovement.STAGE_END:
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
    case InternshipProcessMovement.STAGE_START:
      baseContent.description =
        'Esta etapa é a qual o Aluno irá realizar o preenchimento de todos os dados necessários para o Termo de Compromisso de Estágio e o envio do mesmo.';
      if (status === InternshipProcessStatus.UNDER_REVIEW) {
        baseContent.additionalInfo =
          'O Termo de Compromisso de Estágio foi submetido pelo aluno para análise. Realize a verificação das informações preenchidas e das assinaturas presentes no documento. Após a avaliação, favor proceder com a assinatura e devolução do mesmo.';
        baseContent.showUploadButton = true;
      }
      if (status === InternshipProcessStatus.REJECTED) {
        baseContent.additionalInfo =
          'O Termo de Compromisso de Estágio foi devolvido ao aluno para as devidas correções.';
      }
      break;

    case InternshipProcessMovement.RENEWAL:
      baseContent.description =
        'Esta etapa é para a renovação do Termo de Compromisso de Estágio do aluno.';
      if (status === InternshipProcessStatus.UNDER_REVIEW) {
        baseContent.additionalInfo =
          'O Termo de Compromisso de Estágio foi enviado para renovação. Por favor, revise o documento e, após a análise, realize o upload do termo assinado, caso todas as informações estejam corretas e completas.';
        baseContent.showUploadButton = true;
      }
      break;

    case InternshipProcessMovement.STAGE_END:
      baseContent.description =
        'Esta é a última etapa do processo para a conclusão do período de estágio.';
      if (status === InternshipProcessStatus.UNDER_REVIEW) {
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
    internshipProcess.value?.movement === InternshipProcessMovement.STAGE_END
  ) {
    try {
      await axiosBackEndInstance.post(
        '/processo/estagio/validate/assign-end-internship',
        {
          validate: false,
          remark: remark.value,
          internshipProcessId: internshipProcessID,
        },
      );
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  } else if (
    internshipProcess.value?.movement === InternshipProcessMovement.STAGE_START
  ) {
    try {
      await axiosBackEndInstance.post('/termCommitment/validate/assign', {
        validate: false,
        remark: remark.value,
        internshipProcessId: internshipProcessID,
      });
      window.location.reload();
    } catch (error: any) {
      if (error.isAxiosError && error.response) {
        const responseError = error.response.data.message;

        if (responseError === 'remark is required') {
          intervalErrorDialog.value = true;
          messageError.value =
            'é obrigatório o envio de uma observação para instruir a correção do aluno';
        }
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }
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
        ? InternshipProcessStatus.COMPLETED
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
        nextStepStatus === InternshipProcessStatus.COMPLETED
          ? 'green'
          : nextStepStatus === InternshipProcessStatus.IN_PROGRESS ||
            nextStepStatus === InternshipProcessStatus.UNDER_REVIEW
          ? 'orange'
          : '#d3d3d3',
    };
  });
};

onMounted(findinternshipProcessById);
</script>

<style src="./style.scss" lang="scss" scoped></style>
