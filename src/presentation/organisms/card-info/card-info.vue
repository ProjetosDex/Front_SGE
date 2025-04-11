<template>
  <div class="card-container">
    <v-card class="card">
      <div class="card-content">
        <CardTextContent
          :title="title"
          :description="description"
          :iconClass="icon"
        />
        <BaseLink :href="linkHref" :text="linkText" />
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import BaseLink from '@/presentation/atoms/base-link/base-link.vue';
import CardTextContent from '@/presentation/molecules/card-text-content/card-text-content.vue';
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  linkHref: { type: String, required: true },
  linkText: { type: String, required: true },
});
</script>

<style
  lang="scss"
  src="@/presentation/organisms/card-info/card-info.scss"
  scoped
></style>
