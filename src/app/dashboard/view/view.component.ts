import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
interface User {
  id: string;
  name: string;
  status?: string | null; // Optional because it may not always exist
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  postId: string | null = null;
  posts: any = [];
  userId!: string;
  searchQuery: string = '';
  searchResults: User[] = [];
  friendRequests: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
      this.userId = params['userId'];
      this.timeline();
    });

    // Fetch friend requests on load
    this.fetchFriendRequests();
  }

  // Fetch posts for the timeline
  timeline(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    }

    this.http
      .get<any>('http://localhost:3001/timeline', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe(
        data => {
          this.posts = data.otherPosts;
        },
        error => {
          console.error("Error fetching posts:", error);
        }
      );
  }

  // Search for users
  searchUsers(): void {
    const token = localStorage.getItem('authToken');
    this.http
      .get<User[]>(`http://localhost:3001/users/search?query=${this.searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe(
        (data: User[]) => {
          this.searchResults = data.map((user: User) => {
            const request = this.friendRequests.find(req => req.receiverId === user.id);
            return { ...user, status: request ? request.status : null };
          });
        },
        error => {
          console.error("Error searching users:", error);
        }
      );
  }

  // Send a friend request
  sendFriendRequest(receiverId: string): void {
    const senderId = this.userId; 
    const token = localStorage.getItem('authToken');

    this.http
      .post<any>(
        'http://localhost:3001/friend-request',
        { senderId, receiverId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .subscribe(
        () => {
          alert('Friend request sent!');
          this.searchResults = this.searchResults.map(user =>
            user.id === receiverId ? { ...user, status: 'Pending' } : user
          );
        },
        error => {
          console.error("Error sending friend request:", error);
        }
      );
  }

  // Fetch friend requests
  fetchFriendRequests(): void {
    const token = localStorage.getItem('authToken');
    this.http
      .get<any>(`http://localhost:3001/friend-request?userId=${this.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .subscribe(
        data => {
          this.friendRequests = data;
        },
        error => {
          console.error("Error fetching friend requests:", error);
        }
      );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
