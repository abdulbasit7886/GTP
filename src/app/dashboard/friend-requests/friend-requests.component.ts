import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  friendRequests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFriendRequests();
  }

  // Fetch friend requests
  fetchFriendRequests() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
  
    this.http
      .get<any[]>('http://localhost:4000/friend-requests', { headers })
      .subscribe(
        (data) => {
          this.friendRequests = data; // Direct assignment since it's an array
        },
        (error) => {
          console.error('Error fetching friend requests:', error);
        }
      );
  }
  

  // Accept friend request
  acceptRequest(senderId: string) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);

    this.http
      .post('http://localhost:4000/accept-friend-request', { senderId }, { headers })
      .subscribe(
        () => {
          // Remove the accepted request from the list
          this.friendRequests = this.friendRequests.filter(
            (request) => request.sender._id !== senderId
          );
        },
        (error) => {
          console.error('Error accepting friend request:', error);
        }
      );
  }

  // Reject friend request
  rejectRequest(senderId: string) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);

    this.http
      .post('http://localhost:4000/reject-friend-request', { senderId }, { headers })
      .subscribe(
        () => {
          // Remove the rejected request from the list
          this.friendRequests = this.friendRequests.filter(
            (request) => request.sender._id !== senderId
          );
        },
        (error) => {
          console.error('Error rejecting friend request:', error);
        }
      );
  }
}
