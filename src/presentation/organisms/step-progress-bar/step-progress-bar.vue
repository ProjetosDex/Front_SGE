<template>
  <!-- aqui defino o step que vai vir atual do back -->
  <v-stepper model-value="3">
    <v-stepper-header class="teste">
      <StepItem
        :subtitle="'Em andamento'"
        :title="'Início de estágio'"
        :value="'1'"
        :editable="true"
        :editIcon="'mdi-file-document'"
      />

      <BaseDivider />

      <StepItem
        :title="'Fim de estágio'"
        :value="'2'"
        :editable="true"
        :editIcon="'mdi-file-document'"
      />
    </v-stepper-header>
  </v-stepper>
</template>

<script setup lang="ts">
import BaseDivider from '@/presentation/atoms/base-divider/base-divider.vue';
import StepItem from '@/presentation/atoms/step-item/step-item.vue';
</script>

<style scoped>
.teste {
  display: flex;
  width: 100%;
}
</style>
