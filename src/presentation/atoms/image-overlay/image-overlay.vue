<template>
  <div class="overlay">
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false },
});
</script>

<style
  lang="scss"
  src="@/presentation/atoms/image-overlay/image-overlay.scss"
  scoped
></style>
