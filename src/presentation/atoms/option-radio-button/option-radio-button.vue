<template>
  <label class="radio">
    <input
      :checked="isChecked"
      @change="$emit('update:modelValue', value)"
      type="radio"
      v-bind="$attrs"
    />
    <span class="name">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  value: { type: [String, Number], required: true },
  label: { type: String, required: true },
});

const isChecked = computed(() => props.modelValue === props.value);

defineEmits(['update:modelValue']);
</script>

<style
  lang="scss"
  src="@/presentation/atoms/option-radio-button/option-radio-button.scss"
  scoped
></style>
