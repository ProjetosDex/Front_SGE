<template>
  <div>
    <h1 class="title">{{ text }}</h1>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: { type: String, required: true },
});
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>
