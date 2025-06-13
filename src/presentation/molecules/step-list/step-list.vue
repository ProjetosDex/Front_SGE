<template>
  <v-stepper-header v-for="(step, index) in steps" :key="index">
    <StepItem
      :rules="step.rules"
      :subtitle="step.status"
      :title="step.name"
      :value="step.value"
      :editable="step.editable"
      :editIcon="step.editIcon"
    />

    <BaseDivider v-if="index < steps.length - 1" />
  </v-stepper-header>
</template>

<script setup lang="ts">
import StepItem from '@/presentation/atoms/step-item/step-item.vue';

defineProps<{
  steps: {
    rules?: (() => boolean)[];
    status: string;
    name: string;
    value: string;
    editable?: boolean;
    editIcon: string;
  }[];
}>();
</script>

<style scoped></style>
