<template>
  <div class="main">
    <div class="title">
      <h1 class="title1">
        Formulário de Solicitação Do Termo de Compromisso de Estágio (TCE)
      </h1>
    </div>
    <div class="form">
      <v-form>
        <div class="aluno">
          <h1 class="title2">Aluno:</h1>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="infoTCE.aluno.nome.fieldValue"
                  :counter="10"
                  label="Nome"
                  :rules="infoTCE.aluno.nome.rules"
                  :error-messages="infoTCE.aluno.nome.fieldError"
                  required
                  hide-details="auto"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field
                  v-model="infoTCE.aluno.matricula.fieldValue"
                  type="number"
                  :counter="10"
                  label="Matricula"
                  :rules="infoTCE.aluno.matricula.rules"
                  :error-messages="infoTCE.aluno.matricula.fieldError"
                  hide-details="auto"
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="number"
                  v-model="infoTCE.aluno.cpf.fieldValue"
                  :counter="10"
                  label="CPF"
                  :rules="infoTCE.aluno.cpf.rules"
                  :error-messages="infoTCE.aluno.cpf.fieldError"
                  required
                  hide-details="auto"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="infoTCE.aluno.curso.fieldValue"
                  label="Curso"
                  :rules="infoTCE.aluno.curso.rules"
                  :error-messages="infoTCE.aluno.curso.fieldError"
                  hide-details="auto"
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  v-model="infoTCE.aluno.email.fieldValue"
                  label="Email"
                  :rules="infoTCE.concedente.email.rules"
                  :error-messages="infoTCE.concedente.email.fieldError"
                  required
                  hide-details="auto"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  v-model="infoTCE.aluno.celular.fieldValue"
                  label="Celular"
                  :rules="infoTCE.aluno.celular.rules"
                  :error-messages="infoTCE.aluno.celular.fieldError"
                  required
                  hide-details="auto"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="Concedente">
          <h1 class="title2">Concedente:</h1>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Razão Social"
                  :rules="infoTCE.concedente.razaoSocial.rules"
                  :error-messages="infoTCE.concedente.razaoSocial.fieldError"
                  v-model="infoTCE.concedente.razaoSocial.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  type="text"
                  :counter="10"
                  label="CNPJ"
                  :rules="infoTCE.concedente.cnpj.rules"
                  :error-messages="infoTCE.concedente.cnpj.fieldError"
                  v-model="infoTCE.concedente.cnpj.fieldValue"
                  @input="formatCnpj"
                  hide-details="auto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="CEP"
                  :rules="infoTCE.concedente.cep.rules"
                  :error-messages="infoTCE.concedente.cep.fieldError"
                  v-model="infoTCE.concedente.cep.fieldValue"
                  required
                  @blur="consultEnderecoByCep"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Bairro"
                  :rules="infoTCE.concedente.bairro.rules"
                  :error-messages="infoTCE.concedente.bairro.fieldError"
                  v-model="infoTCE.concedente.bairro.fieldValue"
                  hide-details="auto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :counter="10"
                  label="Cidade"
                  :rules="infoTCE.concedente.cidade.rules"
                  :error-messages="infoTCE.concedente.cidade.fieldError"
                  v-model="infoTCE.concedente.cidade.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1">
                <v-text-field
                  :counter="10"
                  label="UF"
                  :rules="infoTCE.concedente.uf.rules"
                  :error-messages="infoTCE.concedente.uf.fieldError"
                  v-model="infoTCE.concedente.uf.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Endereço"
                  :rules="infoTCE.concedente.endereco.rules"
                  :error-messages="infoTCE.concedente.endereco.fieldError"
                  v-model="infoTCE.concedente.endereco.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Email"
                  :rules="infoTCE.concedente.email.rules"
                  :error-messages="infoTCE.concedente.email.fieldError"
                  v-model="infoTCE.concedente.email.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Representante Legal"
                  :rules="infoTCE.concedente.representanteLegal.rules"
                  :error-messages="
                    infoTCE.concedente.representanteLegal.fieldError
                  "
                  v-model="infoTCE.concedente.representanteLegal.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :counter="10"
                  label="Função"
                  :rules="infoTCE.concedente.funcao.rules"
                  :error-messages="infoTCE.concedente.funcao.fieldError"
                  v-model="infoTCE.concedente.funcao.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Supervisor"
                  :rules="infoTCE.concedente.supervisor.rules"
                  :error-messages="infoTCE.concedente.supervisor.fieldError"
                  v-model="infoTCE.concedente.supervisor.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :counter="10"
                  label="Cargo"
                  :rules="infoTCE.concedente.cargo.rules"
                  :error-messages="infoTCE.concedente.cargo.fieldError"
                  v-model="infoTCE.concedente.cargo.fieldValue"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <div class="Condicoes">
          <h1 class="title2">Condições do Estágio:</h1>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-radio-group
                  inline
                  label="Tipo de Estágio"
                  v-model="selectedValue"
                >
                  <v-radio label="Obrigatório" value="1"></v-radio>
                  <v-radio label="Não-Obrigatório" value="2"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="date"
                  :counter="10"
                  v-model="
                    infoTCE.condicoesEstagio.dataInicioEstagio.fieldValue
                  "
                  :error-messages="
                    infoTCE.condicoesEstagio.dataInicioEstagio.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.dataInicioEstagio.rules"
                  label="Inicio de Estágio"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field
                  type="date"
                  :counter="10"
                  label="Término de Estágio"
                  v-model="infoTCE.condicoesEstagio.dataFimEstagio.fieldValue"
                  :error-messages="
                    infoTCE.condicoesEstagio.dataFimEstagio.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.dataFimEstagio.rules"
                  hide-details="auto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="time"
                  :counter="10"
                  label="Horario Inicial"
                  v-model="
                    infoTCE.condicoesEstagio.horaInicioEstagio.fieldValue
                  "
                  :error-messages="
                    infoTCE.condicoesEstagio.horaInicioEstagio.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.horaInicioEstagio.rules"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="time"
                  label="Horario final"
                  v-model="infoTCE.condicoesEstagio.horaFimEstagio.fieldValue"
                  :error-messages="
                    infoTCE.condicoesEstagio.horaFimEstagio.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.horaFimEstagio.rules"
                  hide-details="auto"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="Jornada Semanal"
                  v-model="infoTCE.condicoesEstagio.jornadaSemanal.fieldValue"
                  :error-messages="
                    infoTCE.condicoesEstagio.jornadaSemanal.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.jornadaSemanal.rules"
                  required
                  hide-details="auto"
                  min="0"
                  step="0.5"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="Bolsa auxílio (R$)"
                  v-model="infoTCE.condicoesEstagio.bolsaAuxilio.fieldValue"
                  :error-messages="
                    infoTCE.condicoesEstagio.bolsaAuxilio.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.bolsaAuxilio.rules"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="Auxilio Transporte (R$)"
                  v-model="
                    infoTCE.condicoesEstagio.auxilioTransporte.fieldValue
                  "
                  :error-messages="
                    infoTCE.condicoesEstagio.auxilioTransporte.fieldError
                  "
                  :rules="infoTCE.condicoesEstagio.auxilioTransporte.rules"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-card-subtitle
                  >Plano de Atividades do Estágio</v-card-subtitle
                >

                <template v-for="(atividade, index) in 5" :key="index">
                  <v-text-field
                    variant="underlined"
                    type="text"
                    :counter="100"
                    :label="'Atividade ' + (index + 1)"
                    v-model="
                      infoTCE.condicoesEstagio.planoAtividadesEstagio
                        .fieldValue[index]
                    "
                    required
                    hide-details
                  ></v-text-field>
                </template>
              </v-col>
            </v-row>
          </v-container>
        </div>
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
      <v-dialog v-model="dialog" persistent width="640">
        <v-card>
          <v-card-title>
            <span class="text-h5">Guia Visual do Sistema</span>
          </v-card-title>
          <div class="carrosel">
            <h1>oi</h1>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#078640" variant="text" @click="dialog = false">
              Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-btn class="buttonTCE" @click.prevent="dialog = true">teste</v-btn>
  </div>
  <!-- <PdfGenerator /> -->
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { generatePDF } from '@/components/pdf-models/term-commitment/generatePdf';
import axiosInstance from '@/interceptors/axios-interceptor';
import type { User } from '@/api/user.interface';
import type { CreateTermCommitment } from '@/api/createTermCommitment.interface';
import axios from 'axios';
import type { CreatedTermCommitment } from '@/api/createdTermCommitment.interface';
import { useUserAuthStore } from '@/stores/userAuth.store';
import type { InternshipProcess } from '@/api/internshipProcess.interface';
const userAuthStore = useUserAuthStore();
const userFromStore = ref(userAuthStore.user);
const dialog = ref(false);
const props = defineProps<{
  internshipProcessId?: string;
  termCommitmentId?: string;
}>();

const selectedValue = ref('');

watch(selectedValue, (newValue: string) => {
  infoTCE.value.condicoesEstagio.isObrigatorio = newValue === '1';
});

const formatCnpj = () => {
  const cnpj = infoTCE.value.concedente.cnpj.fieldValue;
  infoTCE.value.concedente.cnpj.fieldValue = cnpj.replace(/[^\d]+/g, '');
};

const validateCnpj = (cnpj: string) => {
  if (!cnpj) {
    return 'cnpj é obrigatório';
  }

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return 'cnpj deve ter 14 digitos';
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) {
    return 'cnpj inválido';
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado === parseInt(digitos.charAt(1))) {
    return true;
  }

  return 'cnpj inválido';
};

const getAccessToken = () => localStorage.getItem('access_token');

const userId = ref('');
const loading = ref(false);
const infoTCE = ref({
  aluno: {
    nome: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    matricula: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    cpf: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    curso: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    email: {
      fieldValue: '',
      rules: [
        (v) => !!v || 'Este campo é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
      fieldError: '',
    },
    celular: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
  },
  concedente: {
    razaoSocial: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    cnpj: {
      fieldValue: '',
      rules: [(v) => validateCnpj(v)],
      fieldError: '',
    },
    cep: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    bairro: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    cidade: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    uf: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    endereco: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    email: {
      fieldValue: '',
      rules: [
        (v) => !!v || 'Este campo é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'E-mail inválido',
      ],
      fieldError: '',
    },
    representanteLegal: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    funcao: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    supervisor: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    cargo: {
      fieldValue: '',
      rules: [(v: any) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
  },
  condicoesEstagio: {
    tipoEstagio: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    isObrigatorio: false,
    dataInicioEstagio: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    dataFimEstagio: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    horaInicioEstagio: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    horaFimEstagio: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    jornadaSemanal: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    bolsaAuxilio: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    auxilioTransporte: {
      fieldValue: '',
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
    planoAtividadesEstagio: {
      fieldValue: [],
      rules: [(v) => !!v || 'Este campo é obrigatório'],
      fieldError: '',
    },
  },
});

const atualizarTCE = async () => {
  const dadosForm = infoTCE.value;
  const reqBody: any = {
    dataInicioEstagio: dadosForm.condicoesEstagio.dataInicioEstagio.fieldValue,
    dataFimEstagio: dadosForm.condicoesEstagio.dataFimEstagio.fieldValue,
    horaInicioEstagio: dadosForm.condicoesEstagio.horaInicioEstagio.fieldValue,
    horaFimEstagio: dadosForm.condicoesEstagio.horaFimEstagio.fieldValue,
    jornadaSemanal: Number(
      dadosForm.condicoesEstagio.jornadaSemanal.fieldValue,
    ),
    isObrigatorio: dadosForm.condicoesEstagio.isObrigatorio,
    bolsaAuxilio: Number(dadosForm.condicoesEstagio.bolsaAuxilio.fieldValue),
    auxilioTransporte: Number(
      dadosForm.condicoesEstagio.auxilioTransporte.fieldValue,
    ),
    razaoSocialConcedente: dadosForm.concedente.razaoSocial.fieldValue,
    cnpjConcedente: dadosForm.concedente.cnpj.fieldValue,
    cepConcedente: dadosForm.concedente.cep.fieldValue,
    bairroConcedente: dadosForm.concedente.bairro.fieldValue,
    cidadeConcedente: dadosForm.concedente.cidade.fieldValue,
    ufConcedente: dadosForm.concedente.uf.fieldValue,
    enderecoConcedente: dadosForm.concedente.endereco.fieldValue,
    emailConcedente: dadosForm.concedente.email.fieldValue,
    representanteLegalConcedente:
      dadosForm.concedente.representanteLegal.fieldValue,
    funcaoRepresentanteLegalConcedente: dadosForm.concedente.funcao.fieldValue,
    supervisor: dadosForm.concedente.supervisor.fieldValue,
    cargoSupervisor: dadosForm.concedente.cargo.fieldValue,
    planoAtividadesEstagio:
      dadosForm.condicoesEstagio.planoAtividadesEstagio.fieldValue,
    internshipProcessId: props.internshipProcessId,
  };

  const response = await axiosInstance.patch(
    `/termCommitment/update/${props.termCommitmentId}`,
    reqBody,
  );
  console.log(response.status);
  if (response.status == 200) {
    //ou a rota de update nao retorna void ou eu pego as infos do proprio form que nao é recomendado
    const createdTerm: CreatedTermCommitment = response.data;
    generatePDF(createdTerm);
  }
  console.log(
    new Date(
      `${dadosForm.condicoesEstagio.dataInicioEstagio} ${dadosForm.condicoesEstagio.horaInicioEstagio}:00`,
    ),
  );
  window.location.reload();
};

const cadastrarTCE = async () => {
  const dadosForm = infoTCE.value;
  const reqBody: CreateTermCommitment = {
    dataInicioEstagio: dadosForm.condicoesEstagio.dataInicioEstagio.fieldValue,
    dataFimEstagio: dadosForm.condicoesEstagio.dataFimEstagio.fieldValue,
    horaInicioEstagio: dadosForm.condicoesEstagio.horaInicioEstagio.fieldValue,
    horaFimEstagio: dadosForm.condicoesEstagio.horaFimEstagio.fieldValue,
    jornadaSemanal: Number(
      dadosForm.condicoesEstagio.jornadaSemanal.fieldValue,
    ),
    isObrigatorio: dadosForm.condicoesEstagio.isObrigatorio,
    bolsaAuxilio: Number(dadosForm.condicoesEstagio.bolsaAuxilio.fieldValue),
    auxilioTransporte: Number(
      dadosForm.condicoesEstagio.auxilioTransporte.fieldValue,
    ),
    razaoSocialConcedente: dadosForm.concedente.razaoSocial.fieldValue,
    cnpjConcedente: dadosForm.concedente.cnpj.fieldValue,
    cepConcedente: dadosForm.concedente.cep.fieldValue,
    bairroConcedente: dadosForm.concedente.bairro.fieldValue,
    cidadeConcedente: dadosForm.concedente.cidade.fieldValue,
    ufConcedente: dadosForm.concedente.uf.fieldValue,
    enderecoConcedente: dadosForm.concedente.endereco.fieldValue,
    emailConcedente: dadosForm.concedente.email.fieldValue,
    representanteLegalConcedente:
      dadosForm.concedente.representanteLegal.fieldValue,
    funcaoRepresentanteLegalConcedente: dadosForm.concedente.funcao.fieldValue,
    supervisor: dadosForm.concedente.supervisor.fieldValue,
    cargoSupervisor: dadosForm.concedente.cargo.fieldValue,
    id_user: userId.value,
    planoAtividadesEstagio:
      dadosForm.condicoesEstagio.planoAtividadesEstagio.fieldValue,
  };

  console.log(reqBody);

  const response = await axiosInstance.post(`/termCommitment/create`, reqBody);
  if (response.status == 201) {
    const createdTerm: CreatedTermCommitment = response.data;
    console.log(createdTerm);
    generatePDF(createdTerm);
  }
  console.log(
    new Date(
      `${dadosForm.condicoesEstagio.dataInicioEstagio} ${dadosForm.condicoesEstagio.horaInicioEstagio}:00`,
    ),
  );
};

const formatActivityPlans = (activityPlansString: string) => {
  return JSON.parse(activityPlansString);
};

onMounted(async () => {
  if (props.internshipProcessId) {
    const email = userFromStore.value.email;
    const responseUser = await axiosInstance.get(`/user/findByEmail`, {
      params: { email },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseInternshipProcess = await axiosInstance.get(
      `/processo/estagio/${props.internshipProcessId}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const internshipProcess: InternshipProcess = responseInternshipProcess.data;
    console.log(internshipProcess);
    const user: User = responseUser.data;

    infoTCE.value.aluno.nome.fieldValue = user.name;
    infoTCE.value.aluno.cpf.fieldValue = user.cpf;
    infoTCE.value.aluno.matricula.fieldValue = user.registration;
    infoTCE.value.aluno.celular.fieldValue = user.telefone;
    infoTCE.value.aluno.curso.fieldValue = user.courseStudy;
    infoTCE.value.aluno.email.fieldValue = user.email;
    //infos termo
    console.log(internshipProcess.termCommitment.razaoSocialConcedente);
    infoTCE.value.concedente.razaoSocial.fieldValue =
      internshipProcess.termCommitment.razaoSocialConcedente;

    infoTCE.value.concedente.cnpj.fieldValue =
      internshipProcess.termCommitment.cnpjConcedente;

    infoTCE.value.concedente.cep.fieldValue =
      internshipProcess.termCommitment.cepConcedente;

    infoTCE.value.concedente.bairro.fieldValue =
      internshipProcess.termCommitment.bairroConcedente;

    infoTCE.value.concedente.cidade.fieldValue =
      internshipProcess.termCommitment.cidadeConcedente;

    infoTCE.value.concedente.uf.fieldValue =
      internshipProcess.termCommitment.ufConcedente;

    infoTCE.value.concedente.endereco.fieldValue =
      internshipProcess.termCommitment.enderecoConcedente;

    infoTCE.value.concedente.email.fieldValue =
      internshipProcess.termCommitment.emailConcedente;

    infoTCE.value.concedente.representanteLegal.fieldValue =
      internshipProcess.termCommitment.representanteLegalConcedente;

    infoTCE.value.concedente.funcao.fieldValue =
      internshipProcess.termCommitment.funcaoRepresentanteLegalConcedente;

    infoTCE.value.concedente.supervisor.fieldValue =
      internshipProcess.termCommitment.supervisor;

    infoTCE.value.concedente.cargo.fieldValue =
      internshipProcess.termCommitment.cargoSupervisor;

    selectedValue.value =
      internshipProcess.termCommitment.isObrigatorio === true ? '1' : '0';

    infoTCE.value.condicoesEstagio.dataInicioEstagio.fieldValue =
      internshipProcess.termCommitment.dataInicioEstagio.split('T')[0];

    infoTCE.value.condicoesEstagio.dataFimEstagio.fieldValue =
      internshipProcess.termCommitment.dataFimEstagio.split('T')[0];

    infoTCE.value.condicoesEstagio.horaInicioEstagio.fieldValue =
      internshipProcess.termCommitment.horaInicioEstagio
        .split('T')[1]
        .substring(0, 5);

    infoTCE.value.condicoesEstagio.horaFimEstagio.fieldValue =
      internshipProcess.termCommitment.horaFimEstagio
        .split('T')[1]
        .substring(0, 5);

    infoTCE.value.condicoesEstagio.jornadaSemanal.fieldValue = String(
      internshipProcess.termCommitment.jornadaSemanal,
    );

    infoTCE.value.condicoesEstagio.bolsaAuxilio.fieldValue = String(
      internshipProcess.termCommitment.bolsaAuxilio,
    );

    infoTCE.value.condicoesEstagio.auxilioTransporte.fieldValue = String(
      internshipProcess.termCommitment.auxilioTransporte,
    );

    infoTCE.value.condicoesEstagio.planoAtividadesEstagio.fieldValue =
      formatActivityPlans(
        internshipProcess.termCommitment.planoAtividadesEstagio,
      );

    userId.value = user.id;
  } else {
    const email = userFromStore.value.email;
    const response = await axiosInstance.get(`/user/findByEmail`, {
      params: { email },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const user: User = response.data;

    infoTCE.value.aluno.nome.fieldValue = user.name;
    infoTCE.value.aluno.cpf.fieldValue = user.cpf;
    infoTCE.value.aluno.matricula.fieldValue = user.registration;
    infoTCE.value.aluno.celular.fieldValue = user.telefone;
    infoTCE.value.aluno.curso.fieldValue = user.courseStudy;
    infoTCE.value.aluno.email.fieldValue = user.email;
    userId.value = user.id;
  }
});

const consultEnderecoByCep = async () => {
  loading.value = true;

  try {
    const reponse = await axios.get(
      `https://api.brasilaberto.com/v1/zipcode/${infoTCE.value.concedente.cep.fieldValue}`,
    );

    infoTCE.value.concedente.bairro.fieldValue = reponse.data.result.district;
    infoTCE.value.concedente.endereco.fieldValue = `${reponse.data.result.complement} ${reponse.data.result.street}`;
    infoTCE.value.concedente.uf.fieldValue = reponse.data.result.stateShortname;
    infoTCE.value.concedente.cidade.fieldValue = reponse.data.result.city;
  } catch (error) {
    console.error('Error ao consultar endereço pelo CEP:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
