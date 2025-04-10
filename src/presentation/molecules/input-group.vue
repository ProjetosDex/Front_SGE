<template>
  <div class="input-group">
    <label v-if="label" class="input_label" :for="id">{{ label }}</label>
    <InputText
      :model-value="modelValue"
      @update:modelValue="onInput"
      :placeholder="placeholder"
      :type="type"
      v-bind="$attrs"
      :id="id"
    ></InputText>
    <span v-if="hint" class="hint-text">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import InputText from '../atoms/input-text.vue';
defineProps(['label', 'hint', 'placeholder', 'type', 'id', 'modelValue']);

const emit = defineEmits(['update:modelValue']);

const onInput = (value: string) => {
  emit('update:modelValue', value);
};
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
