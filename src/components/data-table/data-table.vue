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
                                <router-link :to="{name:'detalhamentoProcessoEstagio', params:{id: register.id}}">
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

<style lang="scss" scoped>
.data-table-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.header-table tr th:last-child{
    position: sticky;
    right: 0;
    background-color: #e0e0e0;
    z-index: 1; 
}

.data-table {
    border-radius: 4px;
    width: 100%;
    min-height: 45vh;
    max-height: 60vh;
    overflow: auto;
    position: relative;
}

.data-table::-webkit-scrollbar {
    width: 4px; /* Largura da barra de rolagem */
    height: 4px; /* Altura da barra de rolagem */
}

/* Personalizar o trilho da barra de rolagem */
.data-table::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor de fundo do trilho */
}

/* Personalizar o indicador da barra de rolagem (a própria barra) */
.data-table::-webkit-scrollbar-thumb {
    background: #078640; /* Cor da barra de rolagem */
    border-radius: 6px; /* Borda arredondada */
}

/* Personalizar o indicador da barra de rolagem quando o mouse está sobre ele */
.data-table::-webkit-scrollbar-thumb:hover {
    background: #078640; /* Cor da barra de rolagem em hover */
}

.table-container {
    border-collapse: collapse;
    width: 100%;
}

th span{
    display: flex;
    align-items: flex-start;
}

.header-table {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 2;
}

tr:nth-child(odd) {
    background-color: #e0e0e0;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}


td {
    padding: 10px;
}




@media screen and (max-width: 768px) {


  table td:last-child{
    position: sticky;
    right: 0;
    background-color: #f2f2f2;
    z-index: 1;
  }

table tr:nth-child(even) td:last-child {
    background-color: #f2f2f2;
}


table tr:nth-child(odd) td:last-child {
    background-color: #e0e0e0;
}

}
</style>