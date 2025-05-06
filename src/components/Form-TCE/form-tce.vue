<template>
  <!-- falta apenas separar os modais, deixar o template por ultimo focar na parte lógica por enquanto -->
  <div class="main">
    <div class="title">
      <h1 class="title1">
        Formulário de Solicitação Do Termo de Compromisso de Estágio (TCE)
      </h1>
    </div>
    <div class="form">
      <v-form>
        <FormSection
          v-for="(section, sectionKey) in formSectionsData"
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
      <v-dialog v-model="successDialog" persistent width="640">
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
              :fileId="myProcessId"
              fileType="Termo_compromisso"
            ></download-file-button>
          </section>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              :to="{
                name: 'detalhamentoProcessoEstagio',
                params: { id: registeredInternshipProcessId },
              }"
            >
              Acompanhar Processo
            </v-btn>
            <v-btn
              color="#078640"
              variant="text"
              @click="successDialog = false"
            >
              Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="intervalErrorDialog" persistent width="640">
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
              @click="intervalErrorDialog = false"
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
import { TermCommitmentFormRequestMapper } from '@/core/application/mappers/termCommitmentFormRequestMapper';
import type {
  FieldUpdateEvent,
  FormSectionKey,
} from '@/presentation/types/term-commitment-form-types';
import { TermCommitmentBloc } from '@/presentation/blocs/termCommitment/termCommitment.bloc';
import { FormTermCommitmentStore } from '@/stores/formTermCommitment/form-term-commitment-store';
import { CreateTermCommitmentUseCase } from '@/core/application/usecases/create-term-commitment-usecase';
import { TermCommitmentRepository } from '@/core/infrastructure/repositories/termCommtimentRepository';
import { TermCommitmentApi } from '@/core/infrastructure/api/termCommitmentApi';
import { FileApi } from '@/core/infrastructure/api/file-api';
import { InternshipHistoryApi } from '@/core/infrastructure/api/internship-history-api';
import { UploadTermCommitmentPdfUseCase } from '@/core/application/usecases/upload-term-commitment-pdf-usecase';
import { RegisterTermCommitmentFileIdInProcessHistoryUseCase } from '@/core/application/usecases/register-term-commitment-file-id-in-process-history-usecase';

const formTermCommitmentStore = new FormTermCommitmentStore();
const termCommitmentApi = new TermCommitmentApi();
const fileApi = new FileApi();
const internshipHistoryApi = new InternshipHistoryApi();
const termCommitmentRepository = new TermCommitmentRepository(
  termCommitmentApi,
  fileApi,
  internshipHistoryApi,
);
const createTermCommitmentUseCase = new CreateTermCommitmentUseCase(
  termCommitmentRepository,
);

const uploadTermCommitmentPdfUseCase = new UploadTermCommitmentPdfUseCase(
  termCommitmentRepository,
);

const registerTermCommitmentFileIdInProcessHistoryUseCase =
  new RegisterTermCommitmentFileIdInProcessHistoryUseCase(
    termCommitmentRepository,
  );

const formTermCommitmentBloc = new TermCommitmentBloc(
  formTermCommitmentStore,
  createTermCommitmentUseCase,
  uploadTermCommitmentPdfUseCase,
  registerTermCommitmentFileIdInProcessHistoryUseCase,
);

const formSectionsData = formTermCommitmentBloc.getAllSections();

const myProcessId = ref('');
const successDialog = ref(false);
const intervalErrorDialog = ref(false);
const messageError = ref('');
const props = defineProps<{
  internshipProcessId?: string;
  termCommitmentId?: string;
}>();

const registeredInternshipProcessId = ref('');

const loading = ref(false);

const handleFieldUpdate = (fieldUpdateEvent: any, section: any) => {
  formTermCommitmentBloc.updateFormField({
    value: fieldUpdateEvent.value,
    fieldIndex: fieldUpdateEvent.fieldIndex,
    sectionIndex: section,
  });

  console.log(formTermCommitmentBloc.getState());
};

const updateTCE = async () => {
  console.log('implementing');
};

const registerTCE = async () => {
  console.log('minha rola foi invocada');
  formTermCommitmentBloc.createTermCommitment();
};

onMounted(async () => {
  window.addEventListener('keydown', (event: any) => {
    if (event.ctrlKey && event.key === 'm') {
      event.preventDefault();
      formTermCommitmentBloc.fillFormMock();
    }
  });
  // if (props.internshipProcessId) {
  //   const email = userFromStore.value.email;
  //   const responseUser = await axiosBackEndInstance.get(`/user/findByEmail`, {
  //     params: { email },
  //     headers: {
  //       Authorization: `Bearer ${getAccessToken()}`,
  //     },
  //   });

  //   const responseInternshipProcess = await axiosBackEndInstance.get(
  //     `/processo/estagio/${props.internshipProcessId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     },
  //   );

  //   const internshipProcess: InternshipProcess = responseInternshipProcess.data;
  //   console.log(internshipProcess);
  //   const user: User = responseUser.data;

  //   formData.value.aluno.nome.fieldValue = user.name;
  //   formData.value.aluno.cpf.fieldValue = user.cpf;
  //   formData.value.aluno.matricula.fieldValue = user.registration;
  //   formData.value.aluno.celular.fieldValue = user.telephone;
  //   formData.value.aluno.curso.fieldValue = user.courseStudy;
  //   formData.value.aluno.email.fieldValue = user.email;
  //   //infos termo
  //   console.log(internshipProcess.termCommitment.razaoSocialConcedente);
  //   formData.value.concedente.razaoSocial.fieldValue =
  //     internshipProcess.termCommitment.razaoSocialConcedente;

  //   formData.value.concedente.cnpj.fieldValue =
  //     internshipProcess.termCommitment.cnpjConcedente;

  //   formData.value.concedente.cep.fieldValue =
  //     internshipProcess.termCommitment.cepConcedente;

  //   formData.value.concedente.bairro.fieldValue =
  //     internshipProcess.termCommitment.bairroConcedente;

  //   formData.value.concedente.cidade.fieldValue =
  //     internshipProcess.termCommitment.cidadeConcedente;

  //   formData.value.concedente.uf.fieldValue =
  //     internshipProcess.termCommitment.ufConcedente;

  //   formData.value.concedente.endereco.fieldValue =
  //     internshipProcess.termCommitment.enderecoConcedente;

  //   formData.value.concedente.email.fieldValue =
  //     internshipProcess.termCommitment.emailConcedente;

  //   formData.value.concedente.representanteLegal.fieldValue =
  //     internshipProcess.termCommitment.representanteLegalConcedente;

  //   formData.value.concedente.funcao.fieldValue =
  //     internshipProcess.termCommitment.funcaoRepresentanteLegalConcedente;

  //   formData.value.concedente.supervisor.fieldValue =
  //     internshipProcess.termCommitment.supervisor;

  //   formData.value.concedente.cargo.fieldValue =
  //     internshipProcess.termCommitment.cargoSupervisor;

  //   selectedValue.value =
  //     internshipProcess.termCommitment.isObrigatorio === true ? '1' : '0';

  //   formData.value.condicoesEstagio.dataInicioEstagio.fieldValue =
  //     internshipProcess.termCommitment.dataInicioEstagio.split('T')[0];

  //   formData.value.condicoesEstagio.dataFimEstagio.fieldValue =
  //     internshipProcess.termCommitment.dataFimEstagio.split('T')[0];

  //   formData.value.condicoesEstagio.horaInicioEstagio.fieldValue =
  //     internshipProcess.termCommitment.horaInicioEstagio
  //       .split('T')[1]
  //       .substring(0, 5);

  //   formData.value.condicoesEstagio.horaFimEstagio.fieldValue =
  //     internshipProcess.termCommitment.horaFimEstagio
  //       .split('T')[1]
  //       .substring(0, 5);

  //   formData.value.condicoesEstagio.jornadaSemanal.fieldValue = String(
  //     internshipProcess.termCommitment.jornadaSemanal,
  //   );

  //   formData.value.condicoesEstagio.bolsaAuxilio.fieldValue = String(
  //     internshipProcess.termCommitment.bolsaAuxilio,
  //   );

  //   formData.value.condicoesEstagio.auxilioTransporte.fieldValue = String(
  //     internshipProcess.termCommitment.auxilioTransporte,
  //   );

  //   formData.value.condicoesEstagio.planoAtividadesEstagio.fieldValue =
  //     formatActivityPlans(
  //       internshipProcess.termCommitment.planoAtividadesEstagio,
  //     );

  //   userId.value = user.id;
  // } else {
  //   const email = userFromStore.value.email;
  //   const response = await axiosBackEndInstance.get(`/user/findByEmail`, {
  //     params: { email },
  //     headers: {
  //       Authorization: `Bearer ${getAccessToken()}`,
  //     },
  //   });

  //   const user: User = response.data;

  //   formData.value.aluno.nome.fieldValue = user.name;
  //   formData.value.aluno.cpf.fieldValue = user.cpf;
  //   formData.value.aluno.matricula.fieldValue = user.registration;
  //   formData.value.aluno.celular.fieldValue = user.telephone;
  //   formData.value.aluno.curso.fieldValue = user.courseStudy;
  //   formData.value.aluno.email.fieldValue = user.email;
  //   userId.value = user.id;
  // }
});

// const consultEnderecoByCep = async () => {
//   loading.value = true;

//   try {
//     const reponse = await axios.get(
//       `https://viacep.com.br/ws/${formData.value.concedente.cep.fieldValue}/json`,
//     );

//     formData.value.concedente.bairro.fieldValue = reponse.data.bairro;
//     formData.value.concedente.endereco.fieldValue = `${reponse.data.complemento} ${reponse.data.logradouro}`;
//     formData.value.concedente.uf.fieldValue = reponse.data.uf;
//     formData.value.concedente.cidade.fieldValue = reponse.data.localidade;
//   } catch (error) {
//     console.error('Error ao consultar endereço pelo CEP:', error);
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<style src="./style.scss" lang="scss" scoped></style>
