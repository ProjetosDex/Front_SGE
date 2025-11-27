<template>
  <v-overlay
    :model-value="pageNavigationStore.loading"
    class="align-center justify-center page-overlay"
  >
    <v-progress-circular color="#078640" size="64" indeterminate />
  </v-overlay>
  <v-navigation-drawer
    class="sidebar"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <div class="header-sidebar">
      <img src="/images/Logo-IFPA.png" class="logo-ifpa" alt="" />
    </div>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Tela Inicial"
        value="home"
        @click="goTo('/home')"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-file"
        title="Inicio de Estágio"
        value="inicioEstagio"
        v-if="userRole == UserRole.STUDENT"
        @click="goTo('/inicio/estagio')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        title="Fim de Estágio"
        value="fimEstagio"
        v-if="userRole == UserRole.STUDENT"
        @click="goTo('/fim/estagio')"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-update"
        :title="
          userRole === UserRole.STUDENT
            ? 'Meus Processos'
            : 'Acompanhar Processos'
        "
        value="acompanharProcessos"
        @click="goTo('/acompanhar/processos')"
      ></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="footer-sidebar">
        <v-btn
          class="expand-control-btn"
          variant="text"
          :icon="setaMenu"
          @click.stop="rail = !rail"
        ></v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { UserRole } from '@/core/domain/entities/user.entity';
import { usePageNavigationStore } from '@/stores/page-navitagion/page-navigation.store';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();
const userRole = ref(authStore.userRole);
const drawer = ref(true);
const rail = ref(true);
const setaMenu = ref('mdi-chevron-right');
const pageNavigationStore = usePageNavigationStore();
const route = useRoute();
const router = useRouter();

function goTo(path: string) {
  if (route.path !== path && !pageNavigationStore.loading) {
    pageNavigationStore.setLoading(true);
    router.push(path);
  }
}

watch(rail, () => {
  setaMenu.value = rail.value ? 'mdi-chevron-right' : 'mdi-chevron-left';
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
