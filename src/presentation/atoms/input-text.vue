<template>
  <input
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :placeholder="placeholder"
    title="Input title"
    name="input-name"
    :type="type"
    class="input_field"
    :id="id"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps(['placeholder', 'modelValue', 'id', 'type']);

defineEmits(['update:modelValue']);
</script>

<style scoped>
.input_field {
  width: auto;
  height: 40px;
  padding: 0 0 0 40px;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.input_field:focus {
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 2px #242424;
  background-color: transparent;
}
</style>
