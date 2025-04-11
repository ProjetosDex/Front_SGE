<template>
  <v-carousel-item :src="src" cover>
    <ImageOverlay :title="title" :description="description" />
  </v-carousel-item>
</template>

<script setup lang="ts">
import ImageOverlay from '@/presentation/atoms/image-overlay/image-overlay.vue';

defineProps({
  src: { type: String, required: true },
  title: { type: String, required: false },
  description: { type: String, required: false },
});
</script>

<style
  lang="scss"
  src="@/presentation/molecules/carousel-item/carousel-item.scss"
  scoped
></style>
