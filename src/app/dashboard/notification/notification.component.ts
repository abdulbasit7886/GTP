import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socket: SocketService
  ) {}

  ngOnInit(): void {
    this.fetchNotifications();

    // Listen for real-time notifications
    this.socket.on('new-notification', (data: any) => {
      this.notifications.unshift({
        ...data.message,
        status: null, // Set status as null for new notifications
      });
      console.log('Real-time notification received:', data.message);
    });
  }

  fetchNotifications(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = 'You are not logged in.';
      return;
    }

    this.http
      .get<any>('http://localhost:3001/get-notifications', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe(
        (response) => {
          this.notifications =
            response.notifications.map((notification: any) => ({
              ...notification,
              status: null, // Initialize the status property
            })) || [];
          console.log('Notifications fetched successfully:', this.notifications);
        },
        (error) => {
          console.error('Error fetching notifications:', error);
          this.errorMessage = 'Failed to fetch notifications.';
        }
      );
  }

  acceptRequest(notification: any): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = 'You are not logged in.';
      return;
    }

    this.http
      .post<any>(
        'http://localhost:3001/friend-request/accept',
        { senderId: notification.senderId._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .subscribe(
        (response) => {
          notification.status = 'accepted';
          console.log('Friend request accepted:', response.message);
        },
        (error) => {
          console.error('Error accepting friend request:', error);
          this.errorMessage = 'Failed to accept the friend request.';
        }
      );
  }

  rejectRequest(notification: any): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = 'You are not logged in.';
      return;
    }

    this.http
      .post<any>(
        'http://localhost:3001/friend-request/reject',
        { senderId: notification.senderId._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .subscribe(
        (response) => {
          notification.status = 'rejected';
          console.log('Friend request rejected:', response.message);
        },
        (error) => {
          console.error('Error rejecting friend request:', error);
          this.errorMessage = 'Failed to reject the friend request.';
        }
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
