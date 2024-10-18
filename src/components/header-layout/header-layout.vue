<template>
  <v-app-bar class="border-b">
    <v-app-bar-title></v-app-bar-title>

    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon class="mr-2" v-bind="props">
            <v-badge dot color="info">
              <v-icon icon="mdi-bell-outline"></v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-card max-width="360px" max-height="748px">
          <v-list
            :lines="false"
            density="compact"
            nav
            v-for="notification in notifications"
            :key="notification"
          >
            <v-list-item>
              <v-btn
                flat
                prepend-icon="mdi-bell-outline"
                style="
                  text-transform: capitalize;
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                "
                >teste</v-btn
              >
            </v-list-item>
          </v-list>
          <div style="padding: 15px">
            <v-btn
              color="#078640"
              flat
              @click="logout"
              style="
                text-transform: capitalize;
                width: 100%;
                display: flex;
                justify-content: center;
              "
              >Ver Notificações Anteriores</v-btn
            >
          </div>
        </v-card>
      </v-menu>

      <v-menu>
        <template #activator="{ props }">
          <v-avatar v-bind="props">
            <v-img
              cover
              src="https://thumbs.dreamstime.com/z/nerd-portrait-young-cheerful-businessman-smiling-36201399.jpg"
            ></v-img>
          </v-avatar>
        </template>

        <v-card min-width="200px">
          <v-list :lines="false" density="compact" nav>
            <v-list-item>
              <v-btn
                flat
                to="/"
                prepend-icon="mdi-account-outline"
                style="
                  text-transform: capitalize;
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                "
                >Meu perfil</v-btn
              >
            </v-list-item>

            <v-list-item>
              <v-btn
                flat
                @click="logout"
                prepend-icon="mdi-logout"
                style="
                  text-transform: capitalize;
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                "
                >Sair</v-btn
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useUserAuthStore } from '@/stores/userAuth.store';
import { onMounted, onUpdated, ref, watch } from 'vue';
import { useNotificationStore } from '@/stores/notification.store';
const userAuthStore = useUserAuthStore();
const notificationStore = useNotificationStore();
const audio = new Audio('/WhatsApp Audio.mpeg');

const menu = ref(false);
const notifications = ref([]);

// Função para tocar o áudio
async function playNotificationSound() {
  try {
    await audio.play();
  } catch (error) {
    console.error('Erro ao tocar o som:', error);
  }
}

// Observador para monitorar mudanças no array de notificações
watch(
  notifications,
  (newNotifications, oldNotifications) => {
    playNotificationSound();
  },
  { deep: true },
);

onMounted(async () => {
  const userUuid = JSON.stringify(sessionStorage.getItem('uuid_user'));
  await notificationStore.getRecentNotifications(userUuid);
  notifications.value = notificationStore.notifications;
});

async function logout() {
  userAuthStore.clear();
  router.push('/');
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
