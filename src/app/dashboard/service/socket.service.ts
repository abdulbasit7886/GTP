import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3001'); 
  }

  // Emit events to the server
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Listen for events from the server
  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback);
  }

  // Disconnect socket
  disconnect(): void {
    this.socket.disconnect();
  }

  // Send notifications (custom method for your app)
  sendNotification(message: string): void {
    this.emit('send-notification', { message });
  }
}
