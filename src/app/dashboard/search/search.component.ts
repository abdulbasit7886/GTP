import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  // Search users
  searchUsers() {
    if (this.searchQuery.trim()) {
      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
  
      this.http
        .get<any[]>(`http://localhost:4000/search-users?name=${this.searchQuery}`, { headers })
        .subscribe(
          (data) => {
            this.searchResults = data; // Updated to use alreadyFriend and requestSent
          },
          (error) => {
            console.error('Error fetching search results:', error);
          }
        );
    } else {
      this.searchResults = [];
    }
  }
  
  // Send friend request
  sendFriendRequest(userId: string) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);

    this.http
      .post('http://localhost:4000/send-friend-request', { receiverId: userId }, { headers })
      .subscribe(
        () => {
          // Mark the request as sent in the UI
          this.searchResults = this.searchResults.map((user) =>
            user._id === userId ? { ...user, requestSent: true } : user
          );
        },
        (error) => {
          console.error('Error sending friend request:', error);
        }
      );
  }

  // Cancel Friend Request
cancelFriendRequest(userId: string) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);

  this.http
    .post('http://localhost:4000/cancel-friend-request', { receiverId: userId }, { headers })
    .subscribe(
      () => {
        // Mark the request as not sent in the UI
        this.searchResults = this.searchResults.map((user) =>
          user._id === userId ? { ...user, requestSent: false } : user
        );
      },
      (error) => {
        console.error('Error canceling friend request:', error);
      }
    );
}
}
