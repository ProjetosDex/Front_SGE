<template>
  <div class="text-content">
    <IconTitle :text="title" :iconClass="iconClass" />
    <BaseText :text="description" />
  </div>
</template>

<script setup lang="ts">
import BaseText from '@/presentation/atoms/base-text/base-text.vue';
import IconTitle from '../icon-title/icon-title.vue';

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconClass: { type: String, required: true },
});
</script>

<style scoped>
.text-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
