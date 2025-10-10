<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axiosBackEndClient from './core/infrastructure/interceptors/axios-backend-client';
import { socketService } from './services/socketService';

// Função para verificar se o usuário está autenticado
async function checkAuth(): Promise<any> {
  return (await axiosBackEndClient.get('/auth/verify')).data;
}

// Função para conectar ao WebSocket
function connectWebSocket(userId: string) {
  socketService.connect('ws://localhost:3002', userId);
}

onMounted(async () => {
  const audio = new Audio('/WhatsApp Audio.mpeg');
  audio.preload = 'auto';
  audio.load();
  window.notificationAudio = audio;
  const userInfo = await checkAuth();
  console.log('User Info:', userInfo);
  if (userInfo) {
    connectWebSocket(userInfo.sub);
  }
});
</script>

<style scoped></style>
