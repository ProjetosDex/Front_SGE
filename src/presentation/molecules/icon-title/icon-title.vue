<template>
  <div class="title-container">
    <BaseIcon :class="iconClass" />
    <BaseTitle :text="text" />
  </div>
</template>

<script lang="ts" setup>
import BaseIcon from '@/presentation/atoms/base-icon/base-icon.vue';
import BaseTitle from '@/presentation/atoms/base-title/base-title.vue';

defineProps({
  text: { type: String, required: true },
  iconClass: { type: String, required: true },
});
</script>

<style scoped>
.title-container {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1px;
}

.title-container i {
  font-size: 30px;
  margin-right: 5px;
}

.title-container h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
</style>
