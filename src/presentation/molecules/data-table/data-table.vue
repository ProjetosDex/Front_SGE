<template>
  <v-data-table
    class="data-table"
    :headers="headers"
    :items="data"
    :search="searchValue"
    item-value="id"
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    items-per-page-text="Itens por página"
    return-object
    no-data-text="não há processos aptos a serem finalizados."
    style="
      border: 1.2px solid #ccc;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      min-height: 450px;
    "
  >
    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-center">
        <v-icon
          color="#078640"
          icon="mdi-file"
          size="23"
          @click="handleOpenRegisterDetails(item.id)"
        ></v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type {
  InternshipProcessDataTableHeaders,
  InternshipProcessRegisterData,
} from '@/presentation/types/internship-process-data-table-types';

const itemsPerPageOptions = [
  { value: 10, title: '10' },
  { value: 15, title: '15' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
];

defineProps<{
  headers: InternshipProcessDataTableHeaders[];
  data: InternshipProcessRegisterData[];
  searchValue: string;
  currentPage: number;
  itemsPerPage: number;
}>();

const emit = defineEmits<{
  (e: 'open-register-details', internshipProcessId: string): void;
}>();

const handleOpenRegisterDetails = (internshipProcessId: string) => {
  emit('open-register-details', internshipProcessId);
};
</script>

<style scoped></style>
