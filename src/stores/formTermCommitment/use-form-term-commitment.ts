import type { User } from '@/core/domain/entities/user.entity';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormTermCommitmentStore = defineStore(
  'formTermCommitment',
  () => {
    const user = ref<User | null>(null);

    const refreshToken = async () => {
      return true;
    };

    const clear = () => {
      return;
    };

    return {
      refreshToken,
      clear,
      user,
    };
  },
);
