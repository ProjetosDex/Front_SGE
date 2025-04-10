<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      active
      color="teal"
      class="bottom-navigation"
    >
    
      <v-btn>
        <v-icon>mdi-home</v-icon>

        <router-link to="/home" class="span-button">home</router-link>
      </v-btn>

      <v-btn>
        <v-icon>mdi-file</v-icon>

        <router-link to="/inicio/estagio" class="span-button">Inicio de Estágio</router-link>
      </v-btn>

      <v-btn>
        <v-icon>mdi-calendar</v-icon>

        <span class="span-button">Fim de Estágio</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-update</v-icon>
        <router-link to="/acompanhar/processos" class="span-button">Acompanhar processos</router-link>
      </v-btn>

    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const value = ref(0);
</script>

<style lang="scss" scoped>
 .span-button{
  max-width: 4.4rem;
  font-size: 0.6rem;
  text-decoration: none;
  color: black;
 }
</style>