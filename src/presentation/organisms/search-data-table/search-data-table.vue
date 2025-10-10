<template>
  <SearchDataBar
    @search-by-string="searchByString"
    @clear-filters="clearFilters"
    @set-search-filters="searchByFilters"
    :filters="state.filters"
  />

  <DataTable
    :headers="state.headers"
    :data="state.data"
    :search-value="state.searchValue"
    :currentPage="state.filters.page"
    :itemsPerPage="state.filters.perPage"
    @open-register-details="onOpenRegisterDetails"
  />
</template>

<script setup lang="ts">
import { createInternshipProcessDataTableBloc } from '@/presentation/blocs/internship-process-data-table/create-internship-process-data-table-bloc';
import DataTable from '@/presentation/molecules/data-table/data-table.vue';
import SearchDataBar from '@/presentation/molecules/search-data-bar/search-data-bar.vue';
import { useNotificationStore } from '@/stores/notification.store';
import { onMounted, watch } from 'vue';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const notificationStore = useNotificationStore();

const internshipProcessDataTableBloc = createInternshipProcessDataTableBloc();

const state = internshipProcessDataTableBloc.getState();

const onOpenRegisterDetails = (internshipProcessId: string) => {
  internshipProcessDataTableBloc.openInternshipProcessDetails(
    internshipProcessId,
  );
};

const searchByFilters = (filters: any) => {
  console.log(`search by filters ${JSON.stringify(filters)}`);
  internshipProcessDataTableBloc.searchByFilters(filters);
};

const searchByString = (searchValue: string) => {
  internshipProcessDataTableBloc.searchByString(searchValue);
};

let lastNotificationIds: string[] = [];

watch(
  () => notificationStore.notifications,
  (newNotifications) => {
    if (Array.isArray(newNotifications.data)) {
      // Notificações novas: ids que não estavam antes
      const novas = newNotifications.data.filter(
        (n: Notification) => !lastNotificationIds.includes(n.id),
      );
      if (novas.some((n: Notification) => !n.read)) {
        internshipProcessDataTableBloc.getPaginatedInternshipProcess();
      }
      // Atualiza a lista de ids para a próxima comparação
      lastNotificationIds = newNotifications.data.map(
        (n: Notification) => n.id,
      );
    }
  },
  { deep: true },
);

onMounted(() => {
  internshipProcessDataTableBloc.getPaginatedInternshipProcess();
});

const clearFilters = () => {
  internshipProcessDataTableBloc.clearFilters();
};
</script>

<style scoped></style>
