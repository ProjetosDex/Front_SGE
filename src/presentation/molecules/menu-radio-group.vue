<template>
  <OptionRadioButton
    v-for="option in radioOptions"
    :key="option.value"
    v-model="selectedValue"
    :value="option.value"
    :label="option.label"
    v-bind="$attrs"
    :name="groupName"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import OptionRadioButton from '@/presentation/atoms/option-radio-button/option-radio-button.vue';

const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  radioOptions: {
    type: Array as () => Array<{ value: string | number; label: string }>,
    required: true,
  },
  groupName: {
    type: String,
    default: 'radio-group-' + Math.random().toString(36).substr(2, 9),
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<style scoped>
.input-group {
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input_label {
  font-size: 0.75rem;
  color: #8b8e98;
  font-weight: 600;
}
</style>
