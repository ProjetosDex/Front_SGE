<template>
  <v-btn
    :title="title"
    class="action-btn"
    :loading="isLoading"
    :disabled="disabled"
    :type="isSubmit ? 'submit' : 'button'"
  >
    <span>
      <slot>{{ label }}</slot>
    </span>
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  isSubmit: boolean;
  label?: string;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: 'button',
  isSubmit: false,
  label: '',
  variant: 'primary',
  isLoading: false,
  disabled: false,
});
</script>

<style scoped>
.action-btn {
  width: 100%;
  height: 40px;
  border: 0;
  background: #078640;
  border-radius: 7px;
  outline: none;
  color: #ffffff;
  cursor: pointer;
}
</style>
