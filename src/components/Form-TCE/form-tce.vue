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
          v-for="(section, sectionKey) in formTceData"
          :key="sectionKey"
          :section-data="section.sectionData"
          :section-title="section.sectionTitle"
          @update:field="(value) => handleFieldUpdate(sectionKey, value)"
        />
        <div>
          <div v-if="props.internshipProcessId" class="main-btn">
            <v-btn class="buttonTCE" to="/inicio/estagio">Voltar</v-btn>
            <v-btn type="submit" class="buttonTCE" @click.prevent="atualizarTCE"
              >Atualizar</v-btn
            >
          </div>
          <div v-else class="main-btn">
            <v-btn class="buttonTCE" to="/inicio/estagio">Voltar</v-btn>
            <v-btn type="submit" class="buttonTCE" @click.prevent="cadastrarTCE"
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
      <v-dialog v-model="sucessDialog" persistent width="640">
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
                params: { id: registredInternshipProcessId },
              }"
            >
              Acompanhar Processo
            </v-btn>
            <v-btn color="#078640" variant="text" @click="sucessDialog = false">
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
import { ref } from 'vue';
import downloadFileButton from '../download-file-button/download-file-button.vue';
import FormSection from '@/presentation/molecules/form-section/form-section.vue';
import { TermCommitmentFormRequestMapper } from '@/core/application/mappers/termCommitmentFormRequestMapper';
import type {
  FieldUpdateEvent,
  FormSectionKey,
  FormTceData,
} from '@/presentation/types/term-commitment-form-types';
import { validateCnpj } from '@/presentation/blocs/termCommitment/termCommitment.state';
import { TermCommitmentBloc } from '@/presentation/blocs/termCommitment/termCommitment.bloc';
import { FormTermCommitmentStore } from '@/stores/formTermCommitment/form-term-commitment-store';
import { CreateTermCommitmentUseCase } from '@/core/application/usecases/createTermCommitment.usecase';
import { TermCommitmentRepository } from '@/core/infrastructure/repositories/termCommtimentRepository';

const formTermCommitmentStore = new FormTermCommitmentStore();
const termCommitmentRepository = new TermCommitmentRepository();
const createTermCommitmentUseCase = new CreateTermCommitmentUseCase(
  termCommitmentRepository,
);
const formTermCommitmentBloc = new TermCommitmentBloc(
  formTermCommitmentStore,
  createTermCommitmentUseCase,
);

const myProcessId = ref('');
const sucessDialog = ref(false);
const intervalErrorDialog = ref(false);
const messageError = ref('');
const props = defineProps<{
  internshipProcessId?: string;
  termCommitmentId?: string;
}>();

const registredInternshipProcessId = ref('');

const loading = ref(false);
const formTceData = ref<FormTceData>({
  aluno: {
    sectionTitle: 'Aluno',
    sectionData: [
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'nome',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'matricula',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'cpf',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'curso',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'email',
        rules: [
          (v: string) => !!v || 'Este campo é obrigatório',
          (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
        ],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'email',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'celular',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        readonly: true,
      },
    ],
  },
  concedente: {
    sectionTitle: 'Concedente',
    sectionData: [
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Razão Social',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'CNPJ',
        rules: [(v: string) => validateCnpj(v)],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'CEP',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Bairro',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Cidade',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'UF',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Endereço',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Email',
        rules: [
          (v: string) => !!v || 'Este campo é obrigatório',
          (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
        ],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Representante Legal',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Função',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Supervisor',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'text',
        counter: 255,
        fieldValue: '',
        label: 'Cargo',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
    ],
  },
  condicoesEstagio: {
    sectionTitle: 'Condições do Estágio',
    sectionData: [
      {
        type: 'radio-group',
        fieldValue: '1',
        label: 'Tipo de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
        options: [
          { label: 'Obrigatório', value: '1' },
          { label: 'Não-Obrigatório', value: '2' },
        ],
      },
      {
        type: 'date',
        fieldValue: '',
        label: 'Início de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'date',
        fieldValue: '',
        label: 'Término de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'time',
        fieldValue: '',
        label: 'Horario Inicial',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'time',
        fieldValue: '',
        label: 'Horario Final',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'number',
        fieldValue: '',
        label: 'Jornada Semanal',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'number',
        fieldValue: '',
        label: 'Bolsa Auxílio (R$)',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'number',
        fieldValue: '',
        label: 'Auxílio Transporte (R$)',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
      {
        type: 'multi-text-field',
        fieldValue: ['', '', '', '', ''],
        labelFields: 'Atividade',
        label: 'Plano de atividades de Estágio',
        rules: [(v: string) => !!v || 'Este campo é obrigatório'],
        errorMessages: [],
        required: true,
      },
    ],
  },
});

const handleFieldUpdate = (
  section: FormSectionKey,
  sectionIndex: FieldUpdateEvent,
) => {
  const sectionData =
    formTceData.value[section]?.sectionData[sectionIndex.index];

  if (sectionData) {
    if (sectionIndex.subInputIndex != null) {
      if (
        Array.isArray(sectionData.fieldValue) &&
        sectionIndex.subInputIndex >= 0 &&
        sectionIndex.subInputIndex < sectionData.fieldValue.length
      ) {
        sectionData.fieldValue[sectionIndex.subInputIndex] =
          sectionIndex.value as string;
      } else {
        console.warn(
          'Índice subInputIndex fora dos limites ou fieldValue não é um array.',
          sectionIndex,
          sectionData,
        );
      }
    } else {
      sectionData.fieldValue = sectionIndex.value;
    }
  } else {
    console.warn('sectionData é nulo ou indefinido.', section, sectionIndex);
  }
};

const atualizarTCE = async () => {
  // const dadosForm = formData.value;
  // const reqBody = {
  //   dataInicioEstagio: dadosForm.condicoesEstagio.dataInicioEstagio.fieldValue,
  //   dataFimEstagio: dadosForm.condicoesEstagio.dataFimEstagio.fieldValue,
  //   horaInicioEstagio: dadosForm.condicoesEstagio.horaInicioEstagio.fieldValue,
  //   horaFimEstagio: dadosForm.condicoesEstagio.horaFimEstagio.fieldValue,
  //   jornadaSemanal: Number(
  //     dadosForm.condicoesEstagio.jornadaSemanal.fieldValue,
  //   ),
  //   isObrigatorio: dadosForm.condicoesEstagio.isObrigatorio,
  //   bolsaAuxilio: Number(dadosForm.condicoesEstagio.bolsaAuxilio.fieldValue),
  //   auxilioTransporte: Number(
  //     dadosForm.condicoesEstagio.auxilioTransporte.fieldValue,
  //   ),
  //   razaoSocialConcedente: dadosForm.concedente.razaoSocial.fieldValue,
  //   cnpjConcedente: dadosForm.concedente.cnpj.fieldValue,
  //   cepConcedente: dadosForm.concedente.cep.fieldValue,
  //   bairroConcedente: dadosForm.concedente.bairro.fieldValue,
  //   cidadeConcedente: dadosForm.concedente.cidade.fieldValue,
  //   ufConcedente: dadosForm.concedente.uf.fieldValue,
  //   enderecoConcedente: dadosForm.concedente.endereco.fieldValue,
  //   emailConcedente: dadosForm.concedente.email.fieldValue,
  //   representanteLegalConcedente:
  //     dadosForm.concedente.representanteLegal.fieldValue,
  //   funcaoRepresentanteLegalConcedente: dadosForm.concedente.funcao.fieldValue,
  //   supervisor: dadosForm.concedente.supervisor.fieldValue,
  //   cargoSupervisor: dadosForm.concedente.cargo.fieldValue,
  //   planoAtividadesEstagio:
  //     dadosForm.condicoesEstagio.planoAtividadesEstagio.fieldValue,
  //   internshipProcessId: props.internshipProcessId,
  // };
  // const response = await axiosBackEndInstance.patch(
  //   `/termCommitment/update/${props.termCommitmentId}`,
  //   reqBody,
  // );
  // console.log(response.status);
  // if (response.status == 200) {
  //   //ou a rota de update nao retorna void ou eu pego as infos do proprio form que nao é recomendado
  //   const createdTerm: CreatedTermCommitment = response.data;
  //   generatePDF(createdTerm);
  // }
  // console.log(
  //   new Date(
  //     `${dadosForm.condicoesEstagio.dataInicioEstagio} ${dadosForm.condicoesEstagio.horaInicioEstagio}:00`,
  //   ),
  // );
  // window.location.reload();
};

const cadastrarTCE = async () => {
  console.log(formTceData.value);
  const requestBody = TermCommitmentFormRequestMapper.toRequest(
    formTceData.value,
  );
  console.log('OPA REQUEST BODY');
  console.log(requestBody);
};

const formatActivityPlans = (activityPlansString: string) => {
  return JSON.parse(activityPlansString);
};

// onMounted(async () => {
//   window.addEventListener('keydown', handleKeyPress);
//   if (props.internshipProcessId) {
//     const email = userFromStore.value.email;
//     const responseUser = await axiosBackEndInstance.get(`/user/findByEmail`, {
//       params: { email },
//       headers: {
//         Authorization: `Bearer ${getAccessToken()}`,
//       },
//     });

//     const responseInternshipProcess = await axiosBackEndInstance.get(
//       `/processo/estagio/${props.internshipProcessId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${getAccessToken()}`,
//         },
//       },
//     );

//     const internshipProcess: InternshipProcess = responseInternshipProcess.data;
//     console.log(internshipProcess);
//     const user: User = responseUser.data;

//     formData.value.aluno.nome.fieldValue = user.name;
//     formData.value.aluno.cpf.fieldValue = user.cpf;
//     formData.value.aluno.matricula.fieldValue = user.registration;
//     formData.value.aluno.celular.fieldValue = user.telephone;
//     formData.value.aluno.curso.fieldValue = user.courseStudy;
//     formData.value.aluno.email.fieldValue = user.email;
//     //infos termo
//     console.log(internshipProcess.termCommitment.razaoSocialConcedente);
//     formData.value.concedente.razaoSocial.fieldValue =
//       internshipProcess.termCommitment.razaoSocialConcedente;

//     formData.value.concedente.cnpj.fieldValue =
//       internshipProcess.termCommitment.cnpjConcedente;

//     formData.value.concedente.cep.fieldValue =
//       internshipProcess.termCommitment.cepConcedente;

//     formData.value.concedente.bairro.fieldValue =
//       internshipProcess.termCommitment.bairroConcedente;

//     formData.value.concedente.cidade.fieldValue =
//       internshipProcess.termCommitment.cidadeConcedente;

//     formData.value.concedente.uf.fieldValue =
//       internshipProcess.termCommitment.ufConcedente;

//     formData.value.concedente.endereco.fieldValue =
//       internshipProcess.termCommitment.enderecoConcedente;

//     formData.value.concedente.email.fieldValue =
//       internshipProcess.termCommitment.emailConcedente;

//     formData.value.concedente.representanteLegal.fieldValue =
//       internshipProcess.termCommitment.representanteLegalConcedente;

//     formData.value.concedente.funcao.fieldValue =
//       internshipProcess.termCommitment.funcaoRepresentanteLegalConcedente;

//     formData.value.concedente.supervisor.fieldValue =
//       internshipProcess.termCommitment.supervisor;

//     formData.value.concedente.cargo.fieldValue =
//       internshipProcess.termCommitment.cargoSupervisor;

//     selectedValue.value =
//       internshipProcess.termCommitment.isObrigatorio === true ? '1' : '0';

//     formData.value.condicoesEstagio.dataInicioEstagio.fieldValue =
//       internshipProcess.termCommitment.dataInicioEstagio.split('T')[0];

//     formData.value.condicoesEstagio.dataFimEstagio.fieldValue =
//       internshipProcess.termCommitment.dataFimEstagio.split('T')[0];

//     formData.value.condicoesEstagio.horaInicioEstagio.fieldValue =
//       internshipProcess.termCommitment.horaInicioEstagio
//         .split('T')[1]
//         .substring(0, 5);

//     formData.value.condicoesEstagio.horaFimEstagio.fieldValue =
//       internshipProcess.termCommitment.horaFimEstagio
//         .split('T')[1]
//         .substring(0, 5);

//     formData.value.condicoesEstagio.jornadaSemanal.fieldValue = String(
//       internshipProcess.termCommitment.jornadaSemanal,
//     );

//     formData.value.condicoesEstagio.bolsaAuxilio.fieldValue = String(
//       internshipProcess.termCommitment.bolsaAuxilio,
//     );

//     formData.value.condicoesEstagio.auxilioTransporte.fieldValue = String(
//       internshipProcess.termCommitment.auxilioTransporte,
//     );

//     formData.value.condicoesEstagio.planoAtividadesEstagio.fieldValue =
//       formatActivityPlans(
//         internshipProcess.termCommitment.planoAtividadesEstagio,
//       );

//     userId.value = user.id;
//   } else {
//     const email = userFromStore.value.email;
//     const response = await axiosBackEndInstance.get(`/user/findByEmail`, {
//       params: { email },
//       headers: {
//         Authorization: `Bearer ${getAccessToken()}`,
//       },
//     });

//     const user: User = response.data;

//     formData.value.aluno.nome.fieldValue = user.name;
//     formData.value.aluno.cpf.fieldValue = user.cpf;
//     formData.value.aluno.matricula.fieldValue = user.registration;
//     formData.value.aluno.celular.fieldValue = user.telephone;
//     formData.value.aluno.curso.fieldValue = user.courseStudy;
//     formData.value.aluno.email.fieldValue = user.email;
//     userId.value = user.id;
//   }
// });

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

// async function uploadTermCommitment(formData: FormData): Promise<string> {
//   const response = await axiosFileApiInstance.post(
//     '/file/upload/term',
//     formData,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     },
//   );

//   const fileId = response.data;

//   return fileId;
// }

// const fillForm = () => {
//   //concedente
//   formData.value.concedente.razaoSocial.fieldValue = 'AGU';
//   formData.value.concedente.cnpj.fieldValue = '49892589000179';
//   formData.value.concedente.cep.fieldValue = '67145855';
//   formData.value.concedente.bairro.fieldValue = 'Paar';
//   formData.value.concedente.cidade.fieldValue = 'Ananindeua';
//   formData.value.concedente.uf.fieldValue = 'PA';
//   formData.value.concedente.endereco.fieldValue = 'tv.esquina';
//   formData.value.concedente.email.fieldValue = 'rafa.teste@email.com';
//   formData.value.concedente.representanteLegal.fieldValue = 'Afonso';
//   formData.value.concedente.funcao.fieldValue = 'Product Owner';
//   formData.value.concedente.supervisor.fieldValue = 'Afonso';
//   formData.value.concedente.cargo.fieldValue = 'Product Owner';

//   //condicoes estagio
//   selectedValue.value = '1';
//   formData.value.condicoesEstagio.dataInicioEstagio.fieldValue = '2025-04-18';
//   formData.value.condicoesEstagio.dataFimEstagio.fieldValue = '2025-04-18';
//   formData.value.condicoesEstagio.horaInicioEstagio.fieldValue = '08:00';
//   formData.value.condicoesEstagio.horaFimEstagio.fieldValue = '12:00';
//   formData.value.condicoesEstagio.jornadaSemanal.fieldValue = '20';
//   formData.value.condicoesEstagio.bolsaAuxilio.fieldValue = '800';
//   formData.value.condicoesEstagio.auxilioTransporte.fieldValue = '100';
//   formData.value.condicoesEstagio.planoAtividadesEstagio.fieldValue = [
//     'atividade 1',
//     'atividade 2',
//     'atividade 3',
//     'atividade 4',
//     'atividade 5',
//   ];
// };

// const handleKeyPress = (event: any) => {
//   if (event.ctrlKey && event.key === 'm') {
//     // Altere 'm' para a tecla desejada
//     event.preventDefault(); // Evitar ações padrão se necessário
//     fillForm(); // Preencher o formulário com dados mockados ao pressionar Ctrl + M
//   }
// };

// async function registerFilePathInProcess(
//   internshipProcessId: string,
//   filePath: string,
//   fileType: string,
// ): Promise<void> {
//   await axiosBackEndInstance.post('/internship-history/register', {
//     status: InternshipProcessStatus.EM_ANDAMENTO,
//     movement: InternshipProcessMovement.INICIO_ESTAGIO,
//     idInternshipProcess: internshipProcessId,
//     files: [
//       {
//         fileId: filePath,
//         fileType,
//       },
//     ],
//   });
// }
</script>

<style src="./style.scss" lang="scss" scoped></style>
