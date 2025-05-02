import { io, Socket } from 'socket.io-client';
import { useNotificationStore } from '@/stores/notification.store';

class SocketService {
  private socket: Socket | null = null;

  connect(url: string, userUuid: string): void {
    const notificationStore = useNotificationStore();

    this.socket = io(url, {
      transports: ['websocket'],
      withCredentials: false,
    });

    this.socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
      console.log('ID da sessão do socket:', this.socket!.id);
    });

    this.socket!.emit('register', userUuid);

    this.socket.on('notification', (data: any) => {
      notificationStore.addNotification(data);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export const socketService = new SocketService();
