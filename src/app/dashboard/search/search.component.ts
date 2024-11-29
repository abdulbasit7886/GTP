import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from '../service/socket.service';
interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: User[] = [];

  constructor(private http: HttpClient, private router: Router,private snackBar: MatSnackBar, private socket: SocketService) {}

  ngOnInit(): void {
    // Check if the user is logged in (has a token)
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }
  showNotification(message: string): void {
    console.log("Notification Message:", message);  // Add this for debugging
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds duration
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  // Search users by email
  searchUsers(): void {
    if(this.searchQuery.trim()){
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.showNotification('You must be logged in to search.');
      return;
    }
  
    console.log('Search triggered with query:', this.searchQuery);

    this.http  .get<any>(`http://localhost:3001/search-user?name=${this.searchQuery}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
    
        (data) => {
          console.log('Search results:', data);
          if (data.user && data.user.length > 0) {
            this.searchResults = data.user; 
            // this.showNotification('User Found');
          } else {
            this.searchResults = [];
            // this.showNotification('No User Found')
          }
        },
        (error) => {
          console.error('Error searching users:', error);
          this.showNotification('No user found or an error occurred.');
        }
      );
    }else{
      this.searchResults=[];
    }
  }
  sendFriendRequest(user: any): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to send friend requests.');
      return;
    }
    if (!user._id) {
      console.error('User ID is missing');
      return;
    }
  
    this.http
      .post<any>(
        'http://localhost:3001/friend-request',
        { receiverId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        }
      )
      .subscribe(
        (data) => {
          user.isRequestSent = true;
          console.log('Friend request sent:', data);
  
          this.socket.emit('friend-request', {
            receiverId: user._id, 
            message: 'You have a new friend request!',
          });
  
          this.socket.sendNotification('Friend request sent successfully');
        },
        (error) => {
          console.error('Error sending friend request:', error);
          this.socket.sendNotification('Failed to send friend request. Please try again.');
        }
      );
  }
  
  
  
  logout() {
    localStorage.removeItem('authToken')
    this.router.navigate(['/login'])
  }
}
