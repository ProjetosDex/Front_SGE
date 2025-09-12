import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<any>([]);

  function clear() {
    notifications.value.length = 0;
  }

  async function getRecentNotifications(page = 1, pageSize = 5) {
    try {
      const response = await axiosBackEndInstance.post(
        '/notification/find/latest',
        {
          page,
          pageSize,
        },
      );
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
