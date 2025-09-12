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
            :key="notification.id"
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
              @click="showSuccessModal = !showSuccessModal"
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

      <v-dialog
        v-if="showSuccessModal"
        v-model="showSuccessModal"
        persistent
        width="640"
      >
        <v-card style="width: 100%">
          <v-card-title
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <span class="text-h5">Notificações</span>
            <v-btn
              density="compact"
              icon="mdi-close"
              @click="showSuccessModal = false"
            >
            </v-btn>
          </v-card-title>
          <v-card style="width: 100%; max-height: 400px; overflow-y: auto">
            <v-list density="compact" nav style="width: 100%">
              <template
                v-for="notification in notifications"
                :key="notification.id"
              >
                <v-list-item
                  class="notification-item"
                  style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    cursor: pointer;
                  "
                  @click="viewNotification(notification)"
                >
                  <div
                    style="width: 100%; display: flex; align-items: center"
                    @click="viewNotification(notification)"
                    :class="{ 'read-notification': notification.read }"
                    flat
                    :prepend-icon="
                      notification.read
                        ? 'mdi-bell-outline'
                        : 'mdi-bell-ring-outline'
                    "
                    class="notification-btn"
                  >
                    <v-icon
                      :icon="
                        notification.read
                          ? 'mdi-bell-outline'
                          : 'mdi-bell-ring-outline'
                      "
                      style="margin-right: 12px; flex-shrink: 0"
                    />
                    <span
                      class="notification-text"
                      style="
                        flex: 1;
                        white-space: pre-line;
                        word-break: break-word;
                        overflow-wrap: break-word;
                        display: block;
                      "
                    >
                      {{ notification.message }}
                    </span>
                  </div>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
          <v-card-actions
            style="width: 100%; display: flex; justify-content: center"
          >
            <!-- linkar evento do componente a requisição e receber o state com total de paginas -->
            <v-pagination
              style="width: 100%"
              active-color="#078640"
              :length="notificationsTotalPages"
              @update:modelValue="(page) => handleUpdatePage(page)"
            ></v-pagination>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAuthStore } from '@/stores/auth.store';
import { onMounted, ref, watch } from 'vue';
import { useNotificationStore } from '@/stores/notification.store';
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
const userAuthStore = useAuthStore();
const notificationStore = useNotificationStore();
const audio = new Audio('/WhatsApp Audio.mpeg');

const menu = ref(false);

const showSuccessModal = ref(false);

const notificationsTotalPages = ref(0);

const notifications = ref<Notification[]>([]);

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

const handleUpdatePage = async (page: number) => {
  console.log('Página selecionada:', page);
  try {
    await notificationStore.getRecentNotifications(page);
    notifications.value = notificationStore.notifications.data;
    notificationsTotalPages.value = notificationStore.notifications.totalPages;
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
  }
};

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
  await notificationStore.getRecentNotifications();
  notifications.value = notificationStore.notifications.data;
  notificationsTotalPages.value = notificationStore.notifications.totalPages;
});

const viewNotification = async (notification: any) => {
  if (!notification.read) {
    try {
      await axiosBackEndInstance.patch(
        `notification/set/read/${notification.id}`,
      );
      notification.read = true;
    } catch (error) {
      console.error(error);
    }
  }
};

async function logout() {
  userAuthStore.clearAuth();
  router.push('/');
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
