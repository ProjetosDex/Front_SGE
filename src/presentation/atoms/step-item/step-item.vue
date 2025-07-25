<template>
  <v-stepper-item
    :title="title"
    :value="value"
    :complete="complete"
    :editable="editable"
    :edit-icon="editIcon"
    :rules="rules"
    :color="statusColor"
    :subtitle="subtitle"
    class="step-item"
    @click="handleSelected"
  >
  </v-stepper-item>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  value: string;
  complete?: boolean;
  title: string;
  editable?: boolean;
  editIcon?: string;
  rules?: (() => boolean)[];
  subtitle?: string;
}>();

const emit = defineEmits(["step-selected"]);

const statusColor = computed(() => {
  if (!props.subtitle) return "";
  if (props.subtitle === "Concluído") return "#078640";
  if (props.subtitle === "Em Análise") return "#ffff00";
  if (props.subtitle === "Rejeitado") return "#ff1d06";
  return "";
});

const handleSelected = () => {
  emit("step-selected", {
    value: props.value,
    title: props.title,
  });
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    gap: 0.5rem;
  }
}
</style>
