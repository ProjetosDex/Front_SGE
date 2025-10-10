<template>
  <v-stepper :model-value="currentStep">
    <v-stepper-header class="step-header">
      <template v-for="(step, index) in steps" :key="step.index">
        <StepItem
          :index="index"
          :title="step.title"
          :subtitle="StatusTranslation[step.status as InternshipProcessStatus]"
          :value="step.index"
          :editable="step.editable"
          :editIcon="step.editIcon"
          @step-selected="handleStepSelection"
        />

        <BaseDivider v-if="index < steps.length - 1" />
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script setup lang="ts">
import type { InternshipProcessStatus } from '@/core/domain/entities/internshipProcess.entity';
import BaseDivider from '@/presentation/atoms/base-divider/base-divider.vue';
import StepItem from '@/presentation/atoms/step-item/step-item.vue';
import { Step } from '@/presentation/blocs/end-internship-process/state/end-internship-process-state-interface';
import {
  StatusTranslation,
  type StepData,
} from '@/presentation/blocs/internship-process-details/state/internship-process-details-state-interface';

defineProps<{
  steps: StepData[];
  currentStep: string;
}>();

const emit = defineEmits<{
  (event: 'updateSelectedStep', stepIndex: Step): void;
}>();

const handleStepSelection = (stepData: { value: string; title: string }) => {
  const stepIndex = stepData.value as Step;
  emit('updateSelectedStep', stepIndex);
};
</script>

<style scoped>
.step-header {
  display: flex;
  width: 100%;
}
</style>
