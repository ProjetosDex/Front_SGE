import { defineStore } from 'pinia';
import { ref } from 'vue';

const internshipProcessDataTableState = defineStore(
  'InternshipDataTableState',
  () => {
    const user = ref(null);
  },
);
