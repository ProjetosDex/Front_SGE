<template>
  <div class="btn-filtros">
    <v-row justify="center">
      <v-dialog persistent width="1024" v-model="dialogVisible">
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
                    v-model="filters.user.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nome Concedente"
                    v-model="filters.internshipGrantor.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Matrícula do Aluno"
                    v-model="filters.user.academicRegistrationCode"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Novos campos para Status e Movimentação -->
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="[
                      {
                        text: 'Em andamento',
                        value: `${InternshipProcessStatus.IN_PROGRESS}`,
                      },
                      {
                        text: 'Em Análise',
                        value: `${InternshipProcessStatus.UNDER_REVIEW}`,
                      },
                      {
                        text: 'Rejeitado',
                        value: `${InternshipProcessStatus.REJECTED}`,
                      },
                      {
                        text: 'Concluído',
                        value: `${InternshipProcessStatus.COMPLETED}`,
                      },
                    ]"
                    label="Status"
                    v-model="filters.status"
                    item-title="text"
                    item-value="value"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="[
                      {
                        text: 'Início de Estágio',
                        value: `${InternshipProcessMovement.STAGE_START}`,
                      },
                      {
                        text: 'Fim de Estágio',
                        value: `${InternshipProcessMovement.STAGE_END}`,
                      },
                    ]"
                    label="Movimentação"
                    v-model="filters.movement"
                    item-title="text"
                    item-value="value"
                  ></v-select>
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
                    v-model="filters.startDateProcessRangeStart"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="6">
                  <v-text-field
                    label="Fim Intervalo de Busca"
                    type="date"
                    hint="Data de entrada do processo no sistema"
                    persistent-hint
                    v-model="filters.startDateProcessRangeEnd"
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
                    v-model="filters.endDateProcessRangeStart"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="6">
                  <v-text-field
                    label="Fim Intervalo de Busca"
                    type="date"
                    hint="Data de encerramento do ciclo do processo no sistema"
                    persistent-hint
                    v-model="filters.endDateProcessRangeEnd"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="[
                      { text: 'Obrigatório', value: true },
                      { text: 'Não Obrigatório', value: false },
                    ]"
                    label="Tipo Estágio"
                    v-model="filters.termCommitment.isMandatory"
                    item-title="text"
                    item-value="value"
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
                    v-model="filters.user.courseStudy"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-btn color="#078640" @click="clearFilters"
                >Limpar Filtros</v-btn
              >
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#078640"
              variant="text"
              @click="dialogVisible = false"
            >
              Cancelar
            </v-btn>
            <v-btn color="#078640" variant="text" @click="applyFilters">
              Aplicar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';
import {
  InternshipProcessMovement,
  InternshipProcessStatus,
} from '@/core/domain/entities/internshipProcess.entity';
import { defineProps, ref } from 'vue';

const props = defineProps<{
  filters: InternshipProcessFilterDto;
}>();

const dialogVisible = ref(false);

const filters = ref(props.filters);

const emit = defineEmits<{
  (e: 'clear-filters'): void;
  (e: 'set-search-filters', filters: InternshipProcessFilterDto): void;
}>();

const clearFilters = () => {
  emit('clear-filters');
};

const applyFilters = () => {
  dialogVisible.value = false;
  emit('set-search-filters', filters.value);
};
</script>

<style scoped></style>
