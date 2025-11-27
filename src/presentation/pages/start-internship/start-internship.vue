<template>
  <v-overlay
    :model-value="pageNavigationStore.loading"
    class="align-center justify-center"
  >
    <v-progress-circular color="#078640" size="64" indeterminate />
  </v-overlay>
  <div class="main">
    <div class="form">
      <formTCE />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import formTCE from '../../../components/Form-TCE/form-tce.vue';
import { usePageNavigationStore } from '@/stores/page-navitagion/page-navigation.store';
const pageNavigationStore = usePageNavigationStore();

onMounted(() => {
  pageNavigationStore.setLoading(false);
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
