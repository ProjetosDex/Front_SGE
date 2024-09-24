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
                  v-model="infoTCE.aluno.nome"
                  :counter="10"
                  label="Nome"
                  required
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field
                  v-model="infoTCE.aluno.matricula"
                  type="number"
                  :counter="10"
                  label="Matricula"
                  hide-details
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="number"
                  v-model="infoTCE.aluno.cpf"
                  :counter="10"
                  label="CPF"
                  required
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="infoTCE.aluno.curso"
                  label="Curso"
                  hide-details
                  required
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  v-model="infoTCE.aluno.email"
                  label="Email"
                  required
                  hide-details
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  v-model="infoTCE.aluno.celular"
                  label="Celular"
                  required
                  hide-details
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
                  v-model="infoTCE.concedente.razaoSocial"
                  required
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="CNPJ"
                  v-model="infoTCE.concedente.cnpj"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="CEP"
                  v-model="infoTCE.concedente.cep"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Bairro"
                  v-model="infoTCE.concedente.bairro"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :counter="10"
                  label="Cidade"
                  v-model="infoTCE.concedente.cidade"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1">
                <v-text-field
                  :counter="10"
                  label="UF"
                  v-model="infoTCE.concedente.uf"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Endereço"
                  v-model="infoTCE.concedente.endereco"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Email"
                  v-model="infoTCE.concedente.email"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Representante Legal"
                  v-model="infoTCE.concedente.representanteLegal"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :counter="10"
                  label="Função"
                  v-model="infoTCE.concedente.funcao"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  :counter="10"
                  label="Supervisor"
                  v-model="infoTCE.concedente.supervisor"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  :counter="10"
                  label="Cargo"
                  v-model="infoTCE.concedente.cargo"
                  required
                  hide-details
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
                  v-model="infoTCE.condicoesEstagio.dataInicioEstagio"
                  label="Inicio de Estágio"
                  required
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-text-field
                  type="date"
                  :counter="10"
                  label="Término de Estágio"
                  v-model="infoTCE.condicoesEstagio.dataFimEstagio"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="time"
                  :counter="10"
                  label="Horario Inicial"
                  v-model="infoTCE.condicoesEstagio.horaInicioEstagio"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="time"
                  label="Horario final"
                  v-model="infoTCE.condicoesEstagio.horaFimEstagio"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="Jornada Semanal"
                  v-model="infoTCE.condicoesEstagio.jornadaSemanal"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="Bolsa auxílio (R$)"
                  v-model="infoTCE.condicoesEstagio.bolsaAuxilio"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  type="number"
                  :counter="10"
                  label="Auxilio Transporte (R$)"
                  v-model="infoTCE.condicoesEstagio.auxilioTransporte"
                  required
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-card-subtitle>Plano de Atividades do Estágio</v-card-subtitle>

                <template v-for="(atividade, index) in 5" :key="index">
                  <v-text-field
                    variant="underlined"
                    type="text"
                    :counter="100"
                    :label="'Atividade ' + (index + 1)"
                    v-model="infoTCE.condicoesEstagio.planoAtividadesEstagio[index]"
                    required
                    hide-details
                  ></v-text-field>
                </template>
              </v-col>

            </v-row>
          </v-container>
        </div>
        <div class="main-btn">
          <v-btn type="submit" class="buttonTCE" to="/inicio/estagio"
            >Voltar</v-btn
          >
          <v-btn class="buttonTCE" @click="cadastrarTCE">Cadastrar</v-btn>
        </div>
      </v-form>
    </div>
  </div>
  <!-- <PdfGenerator /> -->
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, watch, type Ref } from 'vue';
import { generatePDF } from '@/components/pdf-models/term-commitment/generatePdf';
import axiosInstance from '@/interceptors/axios-interceptor';
import type { User } from '@/api/user.interface';
import type { CreateTermCommitment } from '@/api/createTermCommitment.interface';
// import PdfGenerator from '@/views/inicio-estagio/teste-pdf.vue';

const selectedValue = ref('');

watch(selectedValue, (newValue: string) => {
  infoTCE.value.condicoesEstagio.isObrigatorio = newValue === '1';
});
const userId = ref('');
const infoTCE = ref({
  aluno: {
    nome: '',
    matricula: '',
    cpf: '',
    curso: '',
    email: '',
    celular: '',
  },
  concedente: {
    razaoSocial: '',
    cnpj: '',
    cep: '',
    bairro: '',
    cidade: '',
    uf: '',
    endereco: '',
    email: '',
    representanteLegal: '',
    funcao: '',
    supervisor: '',
    cargo: '',
  },
  condicoesEstagio: {
    tipoEstagio: '',
    isObrigatorio: false,
    dataInicioEstagio: '',
    dataFimEstagio: '',
    horaInicioEstagio: '',
    horaFimEstagio: '',
    jornadaSemanal: '',
    bolsaAuxilio: '',
    auxilioTransporte: '',
    planoAtividadesEstagio: [],
  },
});

const cadastrarTCE = async () => {
  const dadosForm = infoTCE.value;
  const reqBody: CreateTermCommitment = {
    dataInicioEstagio: '2024-09-01T08:00:00.000Z',
    dataFimEstagio: '2024-12-01T18:00:00.000Z',
    horaInicioEstagio: '2024-09-01T08:00:00.000Z',
    horaFimEstagio: '2024-09-01T18:00:00.000Z',
    isObrigatorio: dadosForm.condicoesEstagio.isObrigatorio,
    razaoSocialConcedente: dadosForm.concedente.razaoSocial,
    cnpjConcedente: dadosForm.concedente.cnpj,
    cepConcedente: dadosForm.concedente.cep,
    bairroConcedente: dadosForm.concedente.bairro,
    cidadeConcedente: dadosForm.concedente.cidade,
    ufConcedente: dadosForm.concedente.uf,
    enderecoConcedente: dadosForm.concedente.endereco,
    emailConcedente: dadosForm.concedente.email,
    representanteLegalConcedente: dadosForm.concedente.representanteLegal,
    funcaoRepresentanteLegalConcedente: dadosForm.concedente.funcao,
    supervisor: dadosForm.concedente.supervisor,
    cargoSupervisor: dadosForm.concedente.cargo,
    id_user: userId.value,
  };
  const response = await axiosInstance.post(`/termCommitment/create`, reqBody);
  if (response.status == 201) {
    generatePDF(dadosForm);
  }
};

onMounted(async () => {
  const response = await axiosInstance.get(
    `/user/findByEmail?email=diego@gmail.com`,
  );

  let user: User = response.data;

  infoTCE.value.aluno.nome = user.name;
  infoTCE.value.aluno.cpf = user.cpf;
  infoTCE.value.aluno.matricula = user.registration;
  infoTCE.value.aluno.celular = user.telefone;
  infoTCE.value.aluno.curso = user.courseStudy;
  infoTCE.value.aluno.email = user.email;
  userId.value = user.id;
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
