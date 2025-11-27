import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePageNavigationStore = defineStore('pageNavigation', () => {
  const loading = ref(false);
  function setLoading(val: boolean) {
    loading.value = val;
  }
  return { loading, setLoading };
});
