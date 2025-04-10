<template>
  <div class="acompanhar-processos-container">
    <div class="title">
      <h1 class="title1">Grid de Processos</h1>
    </div>
    <DataTable></DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from '@/components/data-table/data-table.vue';
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
