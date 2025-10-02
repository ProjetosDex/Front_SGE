<template>
  <div class="info-processo-container">
    <h1 class="title1">Processo De Estágio</h1>
    <v-container :loading="loading">
      <StepProgressBar
        :steps="steps"
        :currentStep="currentStep"
        @updateSelectedStep="handleUpdateSelectedStep"
      />

      <br />

      <!-- Seção para exibir conteúdo com base na etapa atual -->
      <div class="step-content" v-if="selectedStepData">
        <h2>{{ selectedStepData.title }}</h2>
        <p>{{ selectedStepData.description }}</p>

        <div v-if="selectedStepData.additionalInfo">
          <h3>Orientações:</h3>
          <p>{{ selectedStepData.additionalInfo }}</p>
        </div>

        <div v-if="selectedStepData.rejectionReason">
          <h3>Motivo da Recusa:</h3>
          <p class="rejection-reason">
            {{ selectedStepData.rejectionReason }}
          </p>
        </div>

        <div v-if="selectedStepData.actionRequired">
          <h3>Ação necessária:</h3>
          <p>{{ selectedStepData.actionRequired }}</p>
        </div>

        <div
          class="process-documents"
          v-if="selectedStepData.documents.some((doc) => !doc.isRejected)"
        >
          <h3>Documentos do processo:</h3>
          <section class="uploaded-area">
            <li
              class="row"
              v-for="(doc, index) in selectedStepData.documents"
              :key="index"
            >
              <div class="fileUpload">
                <section class="uploaded-area">
                  <download-file-button
                    :fileId="doc.id"
                    :fileType="doc.fileType"
                  ></download-file-button>
                </section>
              </div>
            </li>
          </section>
        </div>

        <div
          class="process-documents"
          v-if="selectedStepData.documents.some((doc) => doc.isRejected)"
        >
          <h3>Documentos do Recusados:</h3>
          <section class="uploaded-area">
            <li
              class="row"
              v-for="(doc, index) in selectedStepData.documents"
              :key="index"
            >
              <div class="fileUpload" v-if="doc.isRejected">
                <section class="uploaded-area">
                  <download-file-button
                    :fileId="doc.id"
                    :fileType="doc.fileType"
                    :isRejected="doc.isRejected"
                  ></download-file-button>
                </section>
              </div>
            </li>
          </section>
        </div>

        <div
          class="model-files"
          v-if="
            currentStep === Step.INTERNSHIP_END &&
            internshipEndStepStatus === InternshipProcessStatus.REJECTED &&
            userRole === 'STUDENT'
          "
        >
          <p>
            Utilize o modelo dos arquivos necessários para uma nova solicitação
            de fim de estágio:
          </p>
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

        <div
          v-if="
            currentStep === Step.INTERNSHIP_START &&
            internshipStartStepStatus === InternshipProcessStatus.REJECTED &&
            userRole === 'STUDENT'
          "
        >
          <FormTce :internshipProcessId="internshipProcessId" />
        </div>

        <div
          v-if="
            currentStep === Step.INTERNSHIP_START &&
            internshipStartStepStatus !== InternshipProcessStatus.COMPLETED &&
            internshipStartStepStatus !== InternshipProcessStatus.REJECTED &&
            !(
              userRole === 'STUDENT' &&
              internshipStartStepStatus === InternshipProcessStatus.UNDER_REVIEW
            ) &&
            !(
              (userRole === 'ADMINISTRATOR' || userRole === 'EMPLOYEE') &&
              internshipStartStepStatus === InternshipProcessStatus.IN_PROGRESS
            ) &&
            (userRole === 'STUDENT' ||
              userRole === 'ADMINISTRATOR' ||
              userRole === 'EMPLOYEE')
          "
        >
          <input-file
            :actionButtonLabel="'Enviar Arquivos'"
            @uploadedFiles="registerAssignTermCommitment"
          />
        </div>

        <div
          v-if="
            currentStep === Step.INTERNSHIP_END &&
            (((userRole === 'ADMINISTRATOR' || userRole === 'EMPLOYEE') &&
              internshipEndStepStatus ===
                InternshipProcessStatus.UNDER_REVIEW) ||
              (userRole === 'STUDENT' &&
                internshipEndStepStatus === InternshipProcessStatus.REJECTED))
          "
        >
          <input-file
            :actionButtonLabel="'Enviar Certificado de Estágio'"
            @uploadedFiles="registerAssignEndInternshipProcess"
          />
        </div>

        <div
          class="div-reject-button"
          v-if="
            currentStep === Step.INTERNSHIP_START &&
            (userRole === 'ADMINISTRATOR' || userRole === 'EMPLOYEE') &&
            internshipStartStepStatus !== InternshipProcessStatus.IN_PROGRESS &&
            internshipStartStepStatus !== InternshipProcessStatus.COMPLETED &&
            internshipStartStepStatus !== InternshipProcessStatus.REJECTED
          "
        >
          <v-form>
            <v-container>
              <v-text-field
                v-model="remark"
                @keyup.enter="handleRejectTermCommitment"
              >
                <template v-slot:label>
                  <span>
                    Descreva o motivo da <strong>Recusa</strong> dos documentos
                    <v-icon icon="mdi-close-circle"></v-icon>
                  </span>
                </template>
              </v-text-field>
            </v-container>
          </v-form>
          <button class="reject-button" @click="handleRejectTermCommitment">
            Recusar Documentos
          </button>
        </div>

        <div
          class="div-reject-button"
          v-if="
            currentStep === Step.INTERNSHIP_END &&
            (userRole === 'ADMINISTRATOR' || userRole === 'EMPLOYEE') &&
            internshipEndStepStatus !== InternshipProcessStatus.COMPLETED &&
            internshipEndStepStatus !== InternshipProcessStatus.REJECTED
          "
        >
          <v-form>
            <v-container>
              <v-text-field
                v-model="remark"
                @keyup.enter="handleRejectEndInternshipProcess"
              >
                <template v-slot:label>
                  <span>
                    Descreva o motivo da <strong>Recusa</strong> dos documentos
                    <v-icon icon="mdi-close-circle"></v-icon>
                  </span>
                </template>
              </v-text-field>
            </v-container>
          </v-form>
          <button
            class="reject-button"
            @click="handleRejectEndInternshipProcess"
          >
            Recusar Documentos
          </button>
        </div>
      </div>

      <v-dialog
        v-if="showSuccessModal"
        v-model="showSuccessModal"
        persistent
        width="640"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Documento submetido!</span>
          </v-card-title>
          <v-card-text>
            {{ successMessage }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              @click="handleCloseSuccessModal"
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
            <span class="text-h5" style="color: red">Erro!</span>
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
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import StepProgressBar from '@/presentation/organisms/step-progress-bar/step-progress-bar.vue';
import InputFile from '@/components/input-file/input-file.vue';
import downloadFileButton from '@/components/download-file-button/download-file-button.vue';
import { createInternshipProcessDetailsBloc } from '@/presentation/blocs/internship-process-details/create-internship-process-details-bloc';
import { computed, onMounted, ref, watch } from 'vue';
import { Step } from '@/presentation/blocs/internship-process-details/state/internship-process-details-state-interface';
import { useAuthStore } from '@/stores/auth.store';
import { InternshipProcessStatus } from '@/core/domain/entities/internshipProcess.entity';
import FormTce from '@/components/Form-TCE/form-tce.vue';

import { useRouter } from 'vue-router';
import { UserRole } from '@/core/domain/entities/user.entity';
import { useNotificationStore } from '@/stores/notification.store';
const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const userRole = ref(authStore.userRole);
const remark = ref('');
const internshipProcessId = router.currentRoute.value.params.id as string;
let lastNotificationIds: string[] = [];

interface Notification {
  id: string;
  message: string;
  read: boolean;

  createdAt: string;
}

watch(
  () => notificationStore.notifications,
  async (newNotifications) => {
    console.log('Notifications updated:', newNotifications);
    if (Array.isArray(newNotifications.data)) {
      const novas = newNotifications.data.filter(
        (n: Notification) => !lastNotificationIds.includes(n.id),
      );
      const hasRelatedNotification = novas.some(
        (n: any) => !n.read && n.id_internshipProcess === internshipProcessId,
      );
      if (hasRelatedNotification) {
        await internshipProcessDetailsBloc.loadInternshipProcessDetails(
          userRole.value,
        );
      }
      lastNotificationIds = newNotifications.data.map(
        (n: Notification) => n.id,
      );
    }
  },
  { deep: true },
);

watch(
  () => router.currentRoute.value.params.id,
  async (newId) => {
    if (newId) {
      await internshipProcessDetailsBloc.loadInternshipProcessDetails(
        userRole.value,
      );
    }
  },
);

const handleCloseSuccessModal = async () => {
  showSuccessModal.value = false;
  await internshipProcessDetailsBloc.loadInternshipProcessDetails(
    userRole.value,
  );
};

const internshipStartStepStatus = computed(() => {
  return steps.value.find((step) => step.index === Step.INTERNSHIP_START)
    ?.status;
});

const internshipEndStepStatus = computed(() => {
  return steps.value.find((step) => step.index === Step.INTERNSHIP_END)?.status;
});

const internshipProcessDetailsBloc = createInternshipProcessDetailsBloc();
const {
  steps,
  selectedStep,
  currentStep,
  showErrorModal,
  messageError,
  successMessage,
  showSuccessModal,
  loading,
} = internshipProcessDetailsBloc.getState();

const selectedStepIndex = computed(
  () => selectedStep.value ?? currentStep.value,
);

const selectedStepData = computed(() => {
  return steps.value.find((step) => step.index === selectedStepIndex.value);
});

const registerAssignTermCommitment = async (files: File[]) => {
  await internshipProcessDetailsBloc.registerAssignTermCommitment(
    files,
    userRole.value,
  );
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

//ajustar o modal nessa rotina
const registerAssignEndInternshipProcess = async (files: File[]) => {
  const validate =
    userRole.value === UserRole.ADMINISTRATOR ||
    userRole.value === UserRole.EMPLOYEE
      ? true
      : false;

  await internshipProcessDetailsBloc.registerAssignEndInternshipProcess(
    validate,
    userRole.value as UserRole,
    undefined,
    files,
  );
};

const handleUpdateSelectedStep = (stepIndex: Step) => {
  console.log('Selected step index:', stepIndex);
  internshipProcessDetailsBloc.updateSelectedStep(stepIndex);
};

const handleRejectTermCommitment = async () => {
  if (remark.value.trim() === '') {
    messageError.value = 'Por favor, descreva o motivo da recusa.';
    showErrorModal.value = true;
    return;
  }
  await internshipProcessDetailsBloc.rejectTermCommitment(
    remark.value,
    userRole.value,
  );
  remark.value = '';
};

const handleRejectEndInternshipProcess = async () => {
  if (remark.value.trim() === '') {
    messageError.value = 'Por favor, descreva o motivo da recusa.';
    showErrorModal.value = true;
    return;
  }
  await internshipProcessDetailsBloc.registerAssignEndInternshipProcess(
    false,
    userRole.value as UserRole,
    remark.value,
    undefined,
  );
  remark.value = '';
};

onMounted(async () => {
  await internshipProcessDetailsBloc.loadInternshipProcessDetails(
    userRole.value,
  );
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
