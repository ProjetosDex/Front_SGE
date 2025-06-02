<template>
  <SearchDataBar
    @search-by-string="searchByString"
    @clear-filters="clearFilters"
    :filters="state.filters"
  />

  <DataTable
    :headers="state.headers"
    :data="state.data"
    :search-value="state.searchValue"
    :currentPage="state.currentPage"
    :itemsPerPage="state.itemsPerPage"
    @open-register-details="onOpenRegisterDetails"
  />
</template>

<script setup lang="ts">
import { createInternshipProcessDataTableBloc } from '@/presentation/blocs/internship-process-data-table/create-internship-process-data-table-bloc';
import DataTable from '@/presentation/molecules/data-table/data-table.vue';
import SearchDataBar from '@/presentation/molecules/search-data-bar/search-data-bar.vue';
import { onMounted } from 'vue';

const internshipProcessDataTableBloc = createInternshipProcessDataTableBloc();

const state = internshipProcessDataTableBloc.getState();

const onOpenRegisterDetails = (internshipProcessId: string) => {
  internshipProcessDataTableBloc.openInternshipProcessDetails(
    internshipProcessId,
  );
};

const searchByString = (searchValue: string) => {
  internshipProcessDataTableBloc.searchByString(searchValue);
};

onMounted(() => {
  internshipProcessDataTableBloc.getPaginatedInternshipProcess();
});

const clearFilters = () => {
  internshipProcessDataTableBloc.clearFilters();
};
</script>

<style scoped></style>
