//services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Initialize the Socket.IO client connection
    this.socket = io('http://localhost:4000', {
      auth: {
        token: localStorage.getItem('token'), // Send JWT for authentication
      },
    });
  }

  // Emit events to the server
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  // Listen for events from the server
  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  // Disconnect the socket
  disconnect() {
    this.socket.disconnect();
  }
}
