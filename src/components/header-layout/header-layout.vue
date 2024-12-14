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
            :class="{ 'read-notification': notification.read }"
          >
            <v-btn
              @click="viewNotification(notification)"
              :class="{ 'read-notification': notification.read }"
              flat
              :prepend-icon="
                notification.read ? 'mdi-bell-outline' : 'mdi-bell-ring-outline'
              "
              class="notification-btn"
            >
              <v-list-item class="notification-item">
                <span class="notification-text">{{
                  notification.message
                }}</span>
              </v-list-item>
            </v-btn>
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
import axiosInstance from '@/interceptors/axios-interceptor';
const userAuthStore = useUserAuthStore();
const notificationStore = useNotificationStore();
const audio = new Audio('/WhatsApp Audio.mpeg');

const menu = ref(false);

const notifications = ref<Notification[]>([]);

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

// Função para tocar o áudio
async function playNotificationSound() {
  try {
    await audio.play();
  } catch (error) {
    console.error('Erro ao tocar o som:', error);
  }
}

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

const viewNotification = async (notification: any) => {
  if (!notification.read) {
    try {
      await axiosInstance.patch(`notification/set/read/${notification.id}`);
      notification.read = true;
    } catch (error) {
      console.error(error);
    }
  }
};

async function logout() {
  userAuthStore.clear();
  router.push('/');
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
