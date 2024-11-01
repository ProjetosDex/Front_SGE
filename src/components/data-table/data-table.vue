<template>
    <div class="data-table-container">
        <data-table-menu/>
        <div class="data-table">
            <table class="table-container">
                <thead class="header-table">
                    <tr>
                        <th v-for="(column, i) in columns" :key="i">
                            <span>{{ column }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="body-table">
                    <tr v-for="(register, i) in mappedInternshipProcesses" :key="i">
                        <td v-for="(key, j) in register" :key="j">
                            <div v-if="key === register.status">
                                <v-chip :color="defineColorStatus(key)">
                                    {{ key }}
                                </v-chip>
                            </div>
                            <div v-else-if="key === register.id">
                                <router-link  v-if="userRole === 'ADMINISTRADOR'" :to="{name:'detalhamentoProcessoEstagioDEX', params:{id: register.id}}">
                                    <v-icon icon="mdi-file" style="color: #078640;"></v-icon>
                                </router-link>
                                
                                <router-link  v-if="userRole === 'ALUNO'" :to="{name:'detalhamentoProcessoEstagio', params:{id: register.id}}">
                                    <v-icon icon="mdi-file" style="color: #078640;"></v-icon>
                                </router-link>
                            </div>
                            <div v-else>
                                <span>{{ key }}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <v-pagination v-model="page" :length="15" :total-visible="1" color="#078640"></v-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import dataTableMenu from '../data-table-menu/data-table-menu.vue';
import { reactive, ref,watch} from 'vue';
import {useDataTableStore} from '../../stores/processDataTable.store';
import  {storeToRefs} from 'pinia';

import { useUserAuthStore } from '@/stores/userAuth.store';
const userAuthStore = useUserAuthStore();
const userRole = ref(userAuthStore.storedUserRole);

const store =  useDataTableStore();
const {page,internshipProcessRegisters} = storeToRefs(store);


const mappedInternshipProcesses = ref<any>([]);

const mapInternshipProcesses = () => {
  mappedInternshipProcesses.value = internshipProcessRegisters.value.map(internshipProcess => ({
      aluno: internshipProcess.user.name,
      matricula: internshipProcess.user.registration,
      dataInicio: formatarDataBrasileira(internshipProcess.startDateProcess),
      dataFim: formatarDataBrasileira(internshipProcess.endDateProcess),
      movimentacao: internshipProcess.movement,
      status: internshipProcess.status,
      curso: internshipProcess.user.courseStudy,
      id: internshipProcess.id,
  }));
};

watch(internshipProcessRegisters, () => {
  mapInternshipProcesses();
});

function defineColorStatus(status:string):string | undefined{
    switch (status.toLowerCase()) {
        case 'concluído':
            return 'green';
        case 'em andamento':
            return 'orange';
        case 'recusado':
            return 'red';
    }
}

const columns = reactive([
    'Aluno',
    'Matricula',
    'Data Inicio',
    'Data Fim',
    'Movimentação',
    'Status',
    'Curso',
    'Detalhes'
]);

function formatarDataBrasileira(data: string | Date): string {

  if (!data) {
    return '';
  }
  const fortmatDate = typeof data === 'string' ? new Date(data) : data;


  const dataUTC = new Date(fortmatDate.getUTCFullYear(), fortmatDate.getUTCMonth(), fortmatDate.getUTCDate());

  return dataUTC.toLocaleDateString('pt-BR');
}

</script>

<style src="./style.scss" lang="scss" scoped>

</style>
