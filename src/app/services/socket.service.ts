import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import {NotificationService} from '../services/notification.service'


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: Socket;
  private notificationSubject = new BehaviorSubject<string>(''); // Holds the current notification message
  currentNotification = this.notificationSubject.asObservable(); // Observable to subscribe to the notification

  constructor(private notificationService: NotificationService) {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('connect', () => {
      console.log('Socket connected to server:', this.socket.connected);
    });

    // Optionally handle the 'connect_error' event
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    this.listenNotification();
  }

  // You can also expose the connected status using a method if needed
  isSocketConnected(): boolean {
    return this.socket.connected;
  }
  
 

  listenNotification() {
    
      // Listen for friend request notifications
    this.socket.on('newFriendRequest', (data) => {
      console.log('New Friend Request Notification:', data); 
      this.notificationService.addNotification(data.message, 'friend-request');  // Set notification message
    });

    // // Listen for friend request acceptance notifications
    // this.socket.on('friendRequestAccepted', (data) => {
    //   console.log('Friend Request Accepted Notification:', data); 
    //   this.notificationService.addNotification(data.message, 'success');  // Set notification message
    // });
   
}


joinRoom(username: string): void {
  if (username) {
    this.socket.emit('joinRoom', username);
  } else {
    console.error('Username is missing when trying to join room.');
  }
}
 // Emit a friend request event to the server
//  sendFriendRequest(fromUser: string, toUser: string): void {
//   this.socket.emit('sendFriendRequest', { fromUser, toUser });
//   console.log(`Friend request sent from ${fromUser} to ${toUser}`);
// }

sendFriendRequest(fromUser: string, toUser: string): void {
  this.socket.emit('sendFriendRequest', { fromUser, toUser });
  console.log(`Friend request sent from ${fromUser} to ${toUser}`);
}

sendNotification(loggedUser: string,message: string): void {
  this.socket.emit('sendNotification', message, loggedUser);
}
clearNotification() {
  this.notificationSubject.next(''); // Clear the notification message
}
listenForFriendRequests(callback: (data: any) => void): void {
  this.socket.on('newFriendRequest', callback);
}
}

 

