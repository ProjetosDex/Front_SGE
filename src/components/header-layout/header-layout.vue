<template>
  <v-app-bar class="border-b">
    <v-app-bar-title></v-app-bar-title>

    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon class="mr-2" v-bind="props">
            <v-badge
              v-if="notifications && notifications.some((n) => !n.read)"
              dot
              color="info"
            >
              <v-icon icon="mdi-bell-outline"></v-icon>
            </v-badge>
            <v-icon v-else icon="mdi-bell-outline"></v-icon>
          </v-btn>
        </template>

        <v-card max-width="360px" max-height="748px">
          <div style="display: flex; align-items: center; padding: 0 10px">
            <v-icon icon="mdi-bell-outline"></v-icon>
            <h1 class="title-notification">Notificações</h1>
          </div>

          <template v-if="notifications && notifications.length">
            <div style="overflow-y: auto; max-height: 500px">
              <v-list :lines="false" density="compact" nav>
                <template
                  v-for="(notification, idx) in notifications"
                  :key="notification.id"
                >
                  <v-list-item
                    :class="[
                      'notification-list-item',
                      { 'read-notification': notification.read },
                    ]"
                    class="pa-0"
                  >
                    <v-btn
                      @click="viewNotification(notification)"
                      :class="{ 'read-notification': notification.read }"
                      flat
                      :prepend-icon="
                        notification.read
                          ? 'mdi-bell-outline'
                          : 'mdi-bell-ring-outline'
                      "
                      class="notification-btn"
                      style="width: 100%; justify-content: flex-start"
                    >
                      <span class="notification-text">{{
                        notification.message
                      }}</span>
                    </v-btn>
                  </v-list-item>
                  <v-divider
                    v-if="
                      idx < notifications.length - 1 ||
                      idx === notifications.length - 1
                    "
                    class="border-opacity-100"
                    color="#a5a5a5"
                  ></v-divider>
                </template>
              </v-list>
            </div>
          </template>
          <template v-else>
            <v-list>
              <v-list-item>
                <span style="width: 100%; text-align: center; color: #888">
                  Não há notificações disponíveis.
                </span>
              </v-list-item>
            </v-list>
          </template>
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
                prepend-icon="mdi-account-outline"
                style="
                  text-transform: capitalize;
                  width: 100%;
                  display: flex;
                  justify-content: flex-start;
                "
                >{{ userAuthStore.username }}</v-btn
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
              <template v-if="notifications && notifications.length">
                <template
                  v-for="(notification, idx) in notifications"
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
                  <v-divider
                    v-if="idx < notifications.length - 1"
                    class="border-opacity-100"
                    color="#a5a5a5"
                  ></v-divider>
                </template>
              </template>
              <template v-else>
                <v-list-item>
                  <span style="width: 100%; text-align: center; color: #888">
                    Não há notificações disponíveis.
                  </span>
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
import type { UserRole } from '@/core/domain/entities/user.entity';
const userAuthStore = useAuthStore();
const notificationStore = useNotificationStore();

const authStore = useAuthStore();
const userRole = ref(authStore.userRole);

const menu = ref(false);

const showSuccessModal = ref(false);

const notificationsTotalPages = ref(0);

const notifications = ref<Notification[]>([]);

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const handleUpdatePage = async (page: number) => {
  try {
    await notificationStore.getRecentNotifications(
      userRole.value as UserRole,
      page,
    );
    notifications.value = notificationStore.notifications.data;
    notificationsTotalPages.value = notificationStore.notifications.totalPages;
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
  }
};

onMounted(async () => {
  await notificationStore.getRecentNotifications(userRole.value as UserRole);
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

  router.push({
    name: 'detalhamentoProcessoEstagio',
    params: { id: notification.id_internshipProcess },
  });
};

async function logout() {
  userAuthStore.clearAuth();
  router.push('/');
}
</script>

<style src="./style.scss" lang="scss" scoped></style>
