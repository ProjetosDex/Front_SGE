<template>
  <div class="input-group">
    <v-text-field
      :model-value="modelValue"
      @update:modelValue="onInput"
      :counter="counter"
      :label="label"
      :type="type"
      required
      hide-details="auto"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
defineProps([
  'label',
  'hint',
  'placeholder',
  'type',
  'id',
  'modelValue',
  'counter',
]);

const emit = defineEmits(['update:modelValue']);

const onInput = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<style scoped>
.input-group {
  width: 100%;
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
