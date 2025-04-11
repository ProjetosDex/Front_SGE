<template>
  <a :href="href" class="link">{{ text }}</a>
</template>

<script setup lang="ts">
defineProps({
  href: { type: String, required: true },
  text: { type: String, required: true },
});
</script>

<style scoped>
.link {
  text-decoration: none;
  color: #0066cc;
  font-weight: 500;
  display: inline-block;
  margin-top: 1rem;
}
</style>
