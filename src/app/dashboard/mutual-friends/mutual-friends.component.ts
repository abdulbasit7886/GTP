import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mutual-friends',
  templateUrl: './mutual-friends.component.html',
  styleUrls: ['./mutual-friends.component.css']
})
export class MutualFriendsComponent implements OnInit {
  mutualFriends: any[] = [];
  otherUserId: string = ''; // ID of the other user

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.otherUserId = this.route.snapshot.paramMap.get('id') || '';
    if (this.otherUserId) {
      this.fetchMutualFriends();
    }
  }

  fetchMutualFriends() {
    const loggedInUserToken = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const headers = { Authorization: `${loggedInUserToken}` };

    this.http
      .get(`http://localhost:4000/mutual-friends/${this.otherUserId}`, { headers })
      .subscribe(
        (response: any) => {
          console.log('Mutual Friends API Response:', response);
          this.mutualFriends = response.mutualFriends;
        },
        (error) => {
          console.error('Error fetching mutual friends:', error);
        }
      );
  }
}
