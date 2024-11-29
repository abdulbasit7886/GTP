import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  friends: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFriends();
  }

  fetchFriends() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);

    this.http.get<any[]>('http://localhost:4000/friends', { headers }).subscribe(
      (data) => {
        this.friends = data; // Store the list of friends
      },
      (error) => {
        console.error('Error fetching friends list:', error);
      }
    );
  }
  
  unfriend(friendId: string) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
  
    this.http.post('http://localhost:4000/unfriend', { friendId }, { headers }).subscribe(
      () => {
        // Remove the unfriended user from the UI
        this.friends = this.friends.filter((friend) => friend._id !== friendId);
      },
      (error) => {
        console.error('Error unfriending user:', error);
      }
    );
  }
}
