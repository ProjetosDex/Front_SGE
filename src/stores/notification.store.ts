import type { UserRole } from '@/core/domain/entities/user.entity';
import axiosBackEndInstance from '@/core/infrastructure/interceptors/axios-backend-client';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<any>([]);

  function clear() {
    notifications.value.length = 0;
  }

  async function getRecentNotifications(
    userRole: UserRole,
    page = 1,
    pageSize = 5,
  ) {
    try {
      if (
        userRole !== 'ADMINISTRATOR' &&
        userRole !== 'EMPLOYEE' &&
        userRole === 'STUDENT'
      ) {
        const response = await axiosBackEndInstance.get(
          '/notification/find/latest',
          {
            params: {
              page,
              pageSize,
            },
          },
        );
        notifications.value = response.data;
      } else if (userRole === 'ADMINISTRATOR' || userRole === 'EMPLOYEE') {
        const response = await axiosBackEndInstance.get(
          '/notification/employees',
          {
            params: {
              page,
              pageSize,
            },
          },
        );
        notifications.value = response.data;
      }
    } catch (error) {
      console.error('Error getting notifications:', error);
    }
  }

  async function addNotification(notification: any) {
    if (Array.isArray(notifications.value.data)) {
      notifications.value.data.unshift(notification);
      notifications.value.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
  }

  return {
    notifications,
    addNotification,
    getRecentNotifications,
    clear,
  };
});
