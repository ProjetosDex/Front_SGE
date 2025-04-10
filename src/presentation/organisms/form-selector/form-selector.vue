<template>
  <div class="radio-inputs">
    <MenuRadioGroup v-model="selectedValue" :radio-options="radioOptions" />
  </div>
</template>

<script setup lang="ts">
import MenuRadioGroup from '@/presentation/molecules/menu-radio-group.vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  radioOptions: {
    type: Array as () => Array<{ value: string | number; label: string }>,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<style
  lang="scss"
  src="@/presentation/organisms/form-selector/form-selector.scss"
  scoped
></style>
