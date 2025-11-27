<template>
  <v-overlay
    :model-value="pageNavigationStore.loading"
    class="align-center justify-center page-overlay"
  >
    <v-progress-circular color="#078640" size="64" indeterminate />
  </v-overlay>
  <v-layout class="overflow-visible" style="height: 56px">
    <v-bottom-navigation
      v-model="currentRoute"
      color="teal"
      class="bottom-navigation"
    >
      <v-btn :value="'/home'" @click="goTo('/home')">
        <v-icon>mdi-home</v-icon>
        <span class="span-button">home</span>
      </v-btn>
      <v-btn :value="'/inicio/estagio'" @click="goTo('/inicio/estagio')">
        <v-icon>mdi-file</v-icon>
        <span class="span-button">Inicio de Estágio</span>
      </v-btn>
      <v-btn :value="'/fim/estagio'" @click="goTo('/fim/estagio')">
        <v-icon>mdi-calendar</v-icon>
        <span class="span-button">Fim de Estágio</span>
      </v-btn>
      <v-btn
        :value="'/acompanhar/processos'"
        @click="goTo('/acompanhar/processos')"
      >
        <v-icon>mdi-update</v-icon>
        <span class="span-button">
          {{
            userRole === UserRole.STUDENT
              ? 'Meus Processos'
              : 'Acompanhar Processos'
          }}
        </span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import { UserRole } from '@/core/domain/entities/user.entity';
import { useAuthStore } from '@/stores/auth.store';
import { usePageNavigationStore } from '@/stores/page-navitagion/page-navigation.store';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const userRole = ref(authStore.userRole);
const pageNavigationStore = usePageNavigationStore();

const route = useRoute();
const router = useRouter();

const currentRoute = computed({
  get: () => {
    const validRoutes = [
      '/home',
      '/inicio/estagio',
      '/fim/estagio',
      '/acompanhar/processos',
    ];
    return validRoutes.includes(route.path) ? route.path : '';
  },
  set: (val: string) => {
    if (val && val !== route.path) {
      router.push(val);
    }
  },
});

function goTo(path: string) {
  if (route.path !== path && !pageNavigationStore.loading) {
    pageNavigationStore.setLoading(true);
    router.push(path);
  }
}
</script>

<style lang="scss" scoped>
.span-button {
  max-width: 4.4rem;
  font-size: 0.6rem;
  text-decoration: none;
  color: black;
  display: block;
}

.page-overlay {
  z-index: 1 !important;
}
.v-bottom-navigation {
  z-index: 2;
  position: relative;
}
</style>
