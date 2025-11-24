import { io, Socket } from 'socket.io-client';
import { useNotificationStore } from '@/stores/notification.store';

class SocketService {
  private socket: Socket | null = null;
  private audio: HTMLAudioElement;

  constructor() {
    // Precarrega o áudio ao instanciar o serviço
    this.audio = window.notificationAudio || new Audio('/notification.mpeg');
    this.audio.load();
  }

  connect(url: string, userUuid: string): void {
    const notificationStore = useNotificationStore();

    this.socket = io(url, {
      transports: ['websocket'],
      withCredentials: false,
      path: '/api',
    });

    this.socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
      console.log('ID da sessão do socket:', this.socket!.id);
    });

    this.socket!.emit('register', userUuid);

    this.socket.on('notification', (data: any) => {
      console.log('Notificação recebida:', data);
      notificationStore.addNotification(data);

      // Toca o som ao receber nova notificação
      try {
        this.audio.play();
      } catch (error) {
        console.error('Erro ao tocar o som:', error);
      }
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
