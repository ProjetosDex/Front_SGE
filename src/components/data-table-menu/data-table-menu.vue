<template>
  <div class="table-menu">
    <div class="show-items">
      <span>show</span>
      <div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="#078640" v-bind="props">
              {{ showItems }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in showOptions"
              :key="index"
              :value="index"
            >
              <v-list-item-title @click="defineShowItems(Number(item))">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="input-search">
      <v-text-field
        label="Search"
        single-line
        hide-details
        v-model="inputSearch"
      ></v-text-field>
      <v-btn class="search-button" id="search-button" @click="findByQuery">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <div class="btn-filtros">
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
          <template v-slot:activator="{ props }">
            <v-btn color="#078640" v-bind="props" class="btn-teste">
              Filtros
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Filtros</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Nome do aluno"
                      v-model="filtros.nameAluno"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Nome Concedente"
                      v-model="filtros.nomeConcedente"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Matrícula do Aluno"
                      v-model="filtros.matriculaAluno"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <p>Intervalo de inicio do Processo de Estágio</p>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      label="Inicio Intervalo de Busca"
                      type="date"
                      hint="Data de entrada do processo no sistema"
                      persistent-hint
                      v-model="filtros.dataInicioEstagioRangeStart"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      label="Fim Intervalo de Busca"
                      type="date"
                      hint="Data de entrada do processo no sistema"
                      persistent-hint
                      v-model="filtros.dataInicioEstagioRangeEnd"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <p>Intervalo de Fim do Processo de Estágio</p>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      label="Inicio Intervalo de Busca"
                      type="date"
                      hint="Data de encerramento do ciclo do processo no sistema"
                      persistent-hint
                      v-model="filtros.dataFimestagioRangeStart"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-text-field
                      label="Fim Intervalo de Busca"
                      type="date"
                      hint="Data de encerramento do ciclo do processo no sistema"
                      persistent-hint
                      v-model="filtros.dataFimestagioRangeEnd"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['Obrigatório', 'Não Obrigatório']"
                      label="Tipo Estágio"
                      v-model="filtros.tipoEstagio"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="[
                        'TADS',
                        'Tec.Desenvolvimento de Sistemas',
                        'Turísmo',
                        'Pescador',
                        'Administração',
                        'Pedagogia',
                        'Lic.Letras',
                        'Tec.Mineração',
                        'Tec.Eventos',
                      ]"
                      label="Curso"
                      v-model="filtros.cursoAluno"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-btn color="#078640" @click="limparFiltros"
                  >Limpar Filtros</v-btn
                >
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#078640" variant="text" @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="#078640" variant="text" @click="findProcess">
                Aplicar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUpdated } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
const userAuthStore = useAuthStore();
const userRole = ref(userAuthStore.storedUserRole);
import { useDataTableStore } from '../../stores/processDataTable.store';
import { storeToRefs } from 'pinia';
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';

const store = useDataTableStore();
const { atualizarFiltros, atualizarInternshipProcessRegisters } = store;
const { showItems, page, filtros } = storeToRefs(store);

const showOptions: string[] = ['10', '25', '50', '100'];

enum TypeRequest {
  FindByQuery,
  FindByFilter,
}

const inputSearch = ref('');
const dialog = ref(false);
const lastTypeRequest = ref<TypeRequest>(TypeRequest.FindByFilter);
const getAccessToken = () => localStorage.getItem('access_token');

onMounted(async () => {
  await findProcess();
});

onUpdated(async () => {
  await findProcess();
});

watch(page, () => {
  if (lastTypeRequest.value === TypeRequest.FindByFilter) {
    findProcess();
  } else if (lastTypeRequest.value === TypeRequest.FindByQuery) {
    findByQuery();
  }
});

async function findProcess() {
  dialog.value = false;
  let response;
  if (userRole.value === 'FUNCIONARIO' || userRole.value === 'ADMINISTRADOR') {
    response = await axiosBackEndInstance.get('processo/estagio/filter', {
      params: {
        'user[name]': filtros.value.nameAluno,
        'user[registration]': filtros.value.matriculaAluno,
        startDateProcessRangeStart: filtros.value.dataInicioEstagioRangeStart,
        startDateProcessRangeEnd: filtros.value.dataInicioEstagioRangeEnd,
        endDateProcessRangeStart: filtros.value.dataFimestagioRangeStart,
        endDateProcessRangeEnd: filtros.value.dataFimestagioRangeEnd,
        page: page.value,
        pageSize: showItems.value,
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    console.log(response.data);
    atualizarInternshipProcessRegisters(response.data);
  } else if (userRole.value === 'ALUNO') {
    response = await axiosBackEndInstance.get(
      'processo/estagio/filter/my-process',
      {
        params: {
          startDateProcessRangeStart: filtros.value.dataInicioEstagioRangeStart,
          startDateProcessRangeEnd: filtros.value.dataInicioEstagioRangeEnd,
          endDateProcessRangeStart: filtros.value.dataFimestagioRangeStart,
          endDateProcessRangeEnd: filtros.value.dataFimestagioRangeEnd,
          page: page.value,
          pageSize: showItems.value,
        },
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    atualizarInternshipProcessRegisters(response.data);
  }

  inputSearch.value = '';
  lastTypeRequest.value = TypeRequest.FindByFilter;
}

function limparFiltros() {
  atualizarFiltros({
    nameAluno: null,
    nomeConcedente: null,
    matriculaAluno: null,
    dataInicioEstagioRangeStart: null,
    dataInicioEstagioRangeEnd: null,
    dataFimestagioRangeStart: null,
    dataFimestagioRangeEnd: null,
    tipoEstagio: null,
    cursoAluno: null,
  });
}

async function findByQuery() {
  const response = await axiosBackEndInstance.get('processo/estagio/findBy', {
    params: {
      query: inputSearch.value,
      page: page.value,
      pageSize: showItems.value,
    },
  });

  atualizarInternshipProcessRegisters(response.data);
  lastTypeRequest.value = TypeRequest.FindByQuery;
}

const defineShowItems = (value: number) => {
  showItems.value = value;
  findProcess();
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
