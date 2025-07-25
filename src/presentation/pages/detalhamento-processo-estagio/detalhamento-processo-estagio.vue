<template>
  <div class="info-processo-container">
    <h1 class="title1">Processo De Estágio</h1>
    <v-container>
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
          <h3>Informações adicionais:</h3>
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

        <div class="process-documents">
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
              internshipEndStepStatus === InternshipProcessStatus.UNDER_REVIEW) ||
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
            internshipStartStepStatus !== InternshipProcessStatus.COMPLETED &&
            internshipStartStepStatus !== InternshipProcessStatus.REJECTED
          "
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
          <button class="reject-button" @click="handleRejectTermCommitment">
            Recusar Documentos
          </button>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import StepProgressBar from "@/presentation/organisms/step-progress-bar/step-progress-bar.vue";
import InputFile from "@/components/input-file/input-file.vue";
import downloadFileButton from "@/components/download-file-button/download-file-button.vue";
import { createInternshipProcessDetailsBloc } from "@/presentation/blocs/internship-process-details/create-internship-process-details-bloc";
import { computed, onMounted, ref } from "vue";
import { Step } from "@/presentation/blocs/internship-process-details/state/internship-process-details-state-interface";
import { useAuthStore } from "@/stores/auth.store";
import { InternshipProcessStatus } from "@/core/domain/entities/internshipProcess.entity";
import FormTce from "@/components/Form-TCE/form-tce.vue";

import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const userRole = ref(authStore.userRole);
const remark = ref("");
const internshipProcessId = router.currentRoute.value.params.id as string;

const internshipStartStepStatus = computed(() => {
  return steps.value.find((step) => step.index === Step.INTERNSHIP_START)?.status;
});

const internshipEndStepStatus = computed(() => {
  return steps.value.find((step) => step.index === Step.INTERNSHIP_END)?.status;
});

const internshipProcessDetailsBloc = createInternshipProcessDetailsBloc();
const { steps, selectedStep, currentStep } = internshipProcessDetailsBloc.getState();

const selectedStepIndex = computed(() => selectedStep.value ?? currentStep.value);

const selectedStepData = computed(() => {
  return steps.value.find((step) => step.index === selectedStepIndex.value);
});

const registerAssignTermCommitment = async (files: File[]) => {
  await internshipProcessDetailsBloc.registerAssignTermCommitment(files, userRole.value);
};

const registerAssignEndInternshipProcess = async (files: File[]) => {
  await internshipProcessDetailsBloc.registerAssignEndInternshipProcess(
    files,
    userRole.value
  );
};

const handleUpdateSelectedStep = (stepIndex: Step) => {
  console.log("Selected step index:", stepIndex);
  internshipProcessDetailsBloc.updateSelectedStep(stepIndex);
};

const handleRejectTermCommitment = async () => {
  if (remark.value.trim() === "") {
    alert("Por favor, descreva o motivo da recusa.");
    return;
  }
  await internshipProcessDetailsBloc.rejectTermCommitment(remark.value);
  remark.value = "";
};

onMounted(async () => {
  await internshipProcessDetailsBloc.loadInternshipProcessDetails();
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
