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

  // constructor() {
  //   this.socket = io(this.serverUrl,{
  //     transports:['websocket'],
  //     query: { userId: '6739bc1321ef694be325d9b4' }
  //   });

  //   this.socket.on('connect',()=>{
  //    console.log('Socket connected with ID:', this.socket.id)
  //   });

  //   this.socket.on('disconnect',()=>{
  //     console.log('Socket disconnected');
  //   });

  //   // Handle connection errors
  //   this.socket.on('connect_error', (error: any) =>{
  //     console.error('Socket connection error:', error);
  //   });
  //  }

   

  //  listenNotification(): Observable<string>{
  //   return new Observable<string>((observer) =>{
  //     this.socket.on('notification',(message: string) =>{
  //       observer.next(message);
  //     });
  //   });
  //  }

  //  // Register user when connected
  // registerUser(userId: string) {
  //   this.socket.emit('register', userId); // Emit the userId to register with socket.io
  // }

  // // Disconnect the socket when no longer needed
  // disconnect() {
  //   this.socket.disconnect();
  //   console.log('Socket disconnected');
  // }

  // handleSocketError() {
  //   this.socket.on('error', (error: any) => {
  //     console.error('Socket error:', error);
  //   });
  // }


