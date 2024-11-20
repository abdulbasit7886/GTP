import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  private notificationSubject = new BehaviorSubject<string>(''); // Holds the current notification message
  currentNotification = this.notificationSubject.asObservable(); // Observable to subscribe to the notification

  constructor() {
    this.socket = io('http://localhost:3000');
   
    console.log('Socket connected to server:', this.socket.connected);
  }

  listenNotification() {
    
      this.socket.on('newPost', (data) => {
        console.log('Notification data received:', data);  // Log data for debugging
        this.notificationSubject.next(data.message)
      });
   
}


clearNotification() {
  this.notificationSubject.next(''); // Clear the notification message
}

}

 

