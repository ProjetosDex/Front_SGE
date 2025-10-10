<template>
  <p class="text">{{ text }}</p>
</template>

<script lang="ts" setup>
defineProps({
  text: { type: String, required: true },
});
</script>

<style scoped>
.text {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}
</style>
