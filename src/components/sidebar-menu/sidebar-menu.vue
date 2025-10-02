<template>
  <v-navigation-drawer
    class="sidebar"
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <div class="header-sidebar">
      <img src="@/assets/images/Logo-IFPA.png" class="logo-ifpa" alt="" />
    </div>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Tela Inicial"
        value="home"
        to="/home"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-file"
        title="Inicio de Estágio"
        value="inicioEstagio"
        to="/inicio/estagio"
        v-if="userRole == UserRole.STUDENT"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        title="Fim de Estágio"
        value="fimEstagio"
        to="/fim/estagio"
        v-if="userRole == UserRole.STUDENT"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-update"
        :title="
          userRole === UserRole.STUDENT
            ? 'Meus Processos'
            : 'Acompanhar Processos'
        "
        value="acompanharProcessos"
        to="/acompanhar/processos"
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
const authStore = useAuthStore();
const userRole = ref(authStore.userRole);
console.log('eu sou a role');
console.log(userRole.value);
const drawer = ref(true);
const rail = ref(true);
const setaMenu = ref('mdi-chevron-right');

watch(rail, () => {
  setaMenu.value = rail.value ? 'mdi-chevron-right' : 'mdi-chevron-left';
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
