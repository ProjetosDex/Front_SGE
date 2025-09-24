<template>
  <div class="acompanhar-processos-container">
    <div class="title">
      <h1
        class="title1"
        v-if="userRole === (UserRole.ADMINISTRATOR || UserRole.EMPLOYEE)"
      >
        Acompanhar Processos
      </h1>
      <h1 class="title1" v-else-if="userRole === UserRole.STUDENT">
        Meus Processos
      </h1>
    </div>
    <SearchDataTable />
  </div>
</template>

<script setup lang="ts">
import { UserRole } from '@/core/domain/entities/user.entity';
import SearchDataTable from '@/presentation/organisms/search-data-table/search-data-table.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
const authStore = useAuthStore();
const userRole = ref(authStore.userRole);
</script>

<style lang="scss" scoped>
.title1 {
  text-align: left;
  color: #858796;
  font-size: 1.5rem;
  margin-bottom: 1%;
}

.acompanhar-processos-container {
  margin: 2%;
}
</style>
