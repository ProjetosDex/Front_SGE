<template>
  <div class="search-data-bar">
    <div class="search-input-container">
      <v-text-field
        label="Pesquisar"
        class="search-input-text"
        single-line
        hide-details
        v-model="searchValue"
        @update:model-value="searchItemsByString"
      ></v-text-field>
    </div>
    <div class="filters-wrapper">
      <FiltersModal
        :filters="filters"
        @set-search-filters="onSearchFiltersChange"
        @clear-filters="clearFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InternshipProcessFilterDto } from '@/core/application/dtos/internship-process-filter-dto';
import FiltersModal from '../filters-modal/filters-modal.vue';
import { defineProps, ref } from 'vue';

const searchValue = ref('');

defineProps<{
  filters: InternshipProcessFilterDto;
}>();

const emit = defineEmits<{
  (e: 'set-search-filters', filters: string): void;
  (e: 'search-by-string', searchValue: string): void;
  (e: 'clear-filters'): void;
}>();

const onSearchFiltersChange = () => {
  emit('set-search-filters', 'change filters');
};

const searchItemsByString = (searchValue: string) => {
  emit('search-by-string', searchValue);
};

const clearFilters = () => {
  emit('clear-filters');
};
</script>

<style scoped>
.search-data-bar {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  height: 60px;
  justify-content: space-between;
}

.search-input-container {
  position: absolute;
  left: 55%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  max-width: 600px;
  width: 100%;
  z-index: 1;
}

#search-button {
  color: #fff;
  background-color: #078640;
  margin-left: 1rem;
}

.filters-wrapper {
  margin-left: auto;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .search-data-bar {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 10px 0;
  }

  .search-input-container {
    position: static;
    transform: none;
    margin-bottom: 1rem;
  }

  .filters-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
}

@media screen and (max-width: 882px) {
  .search-input-container {
    max-width: 400px;
  }
}
</style>
