<template>
  <i :class="iconClass" class="base-icon" />
</template>

<script lang="ts" setup>
defineProps({
  iconClass: { type: String, required: true },
});
</script>

<style scoped>
.base-icon {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
</style>
