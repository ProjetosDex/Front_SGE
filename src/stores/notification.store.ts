import axiosInstance from '@/interceptors/axios-interceptor';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<any>([]);

  function clear() {
    notifications.value.length = 0;
  }

  async function getRecentNotifications(userUuid: string | null) {
    try {
      //investigar o armazenamento no session storage ou substituir apenas pelo token
      console.log(userUuid?.split('"')[1]);
      const response = await axiosInstance.post('/notification/find/latest', {
        id_user: userUuid?.split('"')[1],
        page: 1,
        pageSize: 5,
      });
      notifications.value = response.data;
    } catch (error) {
      console.error('Error getting notifications:', error);
    }
  }

  async function addNotification(notification: any) {
    console.log('store pinia');
    notifications.value.push(notification);
  }

  return {
    notifications,
    addNotification,
    getRecentNotifications,
    clear,
  };
});
