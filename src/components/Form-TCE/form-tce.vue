<template>
  <!-- falta apenas separar os modais, deixar o template por ultimo focar na parte lógica por enquanto -->
  <div class="main">
    <div class="title">
      <h1 class="title1">
        Formulário de Solicitação Do Termo de Compromisso de Estágio (TCE)
      </h1>
      <v-btn
        density="compact"
        icon="mdi-help"
        color="#078640"
        @click="dialog = !dialog"
      ></v-btn>
      <GuideModal v-model:dialog="dialog" />
    </div>
    <div class="form">
      <v-form>
        <FormSection
          v-for="(section, sectionKey) in sections"
          :key="sectionKey"
          :section-data="section.sectionData"
          :section-title="section.sectionTitle"
          @update:field="(value) => handleFieldUpdate(value, sectionKey)"
        />
        <div>
          <div v-if="props.internshipProcessId" class="main-btn">
            <v-btn class="buttonTCE" to="/inicio/estagio">Voltar</v-btn>
            <v-btn type="submit" class="buttonTCE" @click.prevent="updateTCE"
              >Atualizar</v-btn
            >
          </div>
          <div v-else class="main-btn">
            <v-btn class="buttonTCE" to="/inicio/estagio">Voltar</v-btn>
            <v-btn type="submit" class="buttonTCE" @click.prevent="registerTCE"
              >Cadastrar</v-btn
            >
          </div>
        </div>
        <v-overlay :model-value="loading" class="align-center justify-center">
          <v-progress-circular
            color="#078640"
            size="64"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-form>
      <v-dialog
        v-if="showSuccessModal && filePathId && createdInternshipProcessId"
        v-model="showSuccessModal"
        persistent
        width="640"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Novo Processo Gerado!</span>
          </v-card-title>
          <v-card-text>
            Faça o download do termo de compromisso e faça upload do modelo
            assinado pelas partes interessadas para dar prosseguimento no
            processo de estágio.
          </v-card-text>
          <section class="uploaded-area">
            <download-file-button
              :fileId="filePathId"
              :fileType="FileType.TERM_COMMITMENT"
            ></download-file-button>
          </section>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              @click="openInternshipProcessDetails"
            >
              Acompanhar Processo
            </v-btn>
            <v-btn
              color="#078640"
              variant="text"
              @click="showSuccessModal = false"
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
            <span class="text-h5" style="color: red"
              >Erro ao gerar processo!</span
            >
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import downloadFileButton from '../download-file-button/download-file-button.vue';
import FormSection from '@/presentation/molecules/form-section/form-section.vue';
import { createTermCommitmentBloc } from '@/presentation/blocs/termCommitment-form/create-term-commitment-bloc';
import GuideModal from '@/presentation/organisms/guide-modal/guide-modal.vue';
import { FileType } from '@/core/domain/entities/file.entity';

const formTermCommitmentBloc = createTermCommitmentBloc();

const props = defineProps<{
  internshipProcessId?: string;
  termCommitmentId?: string;
}>();

const dialog = ref(false);

const {
  sections,
  filePathId,
  showSuccessModal,
  showErrorModal,
  loading,
  messageError,
  createdInternshipProcessId,
} = formTermCommitmentBloc.getState();

const handleFieldUpdate = (fieldUpdateEvent: any, section: any) => {
  formTermCommitmentBloc.updateFormField({
    value: fieldUpdateEvent.value,
    fieldIndex: fieldUpdateEvent.fieldIndex,
    sectionIndex: section,
  });
};

const openInternshipProcessDetails = () => {
  formTermCommitmentBloc.openInternshipProcessDetails(
    createdInternshipProcessId.value as string,
  );
};

const updateTCE = async () => {
  await formTermCommitmentBloc.updateTermCommitment();
};

const registerTCE = async () => {
  await formTermCommitmentBloc.createTermCommitment();
};

onMounted(async () => {
  //apenas um mock para testar a criação do termo remover para produção
  window.addEventListener('keydown', (event: any) => {
    if (event.ctrlKey && event.key === 'm') {
      event.preventDefault();
      formTermCommitmentBloc.fillFormMock();
    }
  });

  if (!props.internshipProcessId) {
    await formTermCommitmentBloc.loadUserData();
  } else {
    await formTermCommitmentBloc.fillDataUpdateForm(props.internshipProcessId);
  }
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
