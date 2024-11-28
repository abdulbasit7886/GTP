import { Component,OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router'
import {PostService} from '../services/post.service'
import {SocketService} from '../services/socket.service'
import { ChangeDetectorRef } from '@angular/core';


interface FriendRequest {
  message: string;
  fromUser: string;
  _id: string;
}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

 
  friendRequests: FriendRequest[] = [];
  mutualFriends: { [key: string]: string[] } = {}; // To store mutual friends for each friend

  constructor(private router: Router,private postService: PostService,
    private socketService: SocketService, private cdr: ChangeDetectorRef
  ) {}


 
  ngOnInit(): void {

    // this.getFriendRequests();
    // this.listenNewRequest();
    // this.socketService.socket.on('newFriendRequest', (data: { message: string, fromUser: string, requestId: string }) => {
    //   console.log('New friend request received:', data.message);
    //   this.friendRequests.push({
    //     message: data.message,
    //     fromUser: data.fromUser,
    //     _id: data.requestId,  // Generate a unique ID (for demo purposes)
    //   });
    // });

    this.socketService.socket.on('newFriendRequest', (data: { message: string, fromUser: string, requestId: string }) => {
      console.log('New friend request received:', data.message);  // Add a log to confirm event is received
      this.friendRequests.push({
        message: data.message,
        fromUser: data.fromUser,
        _id: data.requestId,  // Ensure that the unique ID is being sent correctly
      });
      console.log('Updated friend requests:', this.friendRequests);  // Add a log to check the updated friendRequests list
      this.cdr.detectChanges(); // Trigger change detection manually
    
    });
  }

  
  // getFriendRequests(): void {
  //   this.socketService.listenForFriendRequests((data) => {
  //     console.log('New friend request received:', data);
  //     this.friendRequests.push(data); // Add new request to the list
  //   });
  // }

  // listenNewRequest(): void {
  //   this.socketService.listenForFriendRequests((data) => {
  //     console.log('New friend request received:', data);
  //     this.friendRequests.push(data); // Add new request to the list
  //   });
  // }

  // acceptRequest(requestId: string): void {
  //   this.postService.acceptFollowRequest(requestId).subscribe({
  //     next: () => {
  //       this.friendRequests = this.friendRequests.filter(
  //         (request) => request._id !== requestId
  //       );
  //       alert(`${requestId} is now your friend!`);
  //     },
  //     error: (err) => {
  //       console.error('Error accepting request:', err);
  //     },
  //   });
  // }


  acceptRequest(requestId: string, senderUsername: string): void {
    this.postService.acceptFollowRequest(requestId, senderUsername).subscribe({
      next: () => {
        this.friendRequests = this.friendRequests.filter(
          (request) => request._id !== requestId);
        alert(`${senderUsername} is now your friend!`);
      },
      error: (err) => {
        console.error('Error accepting request:', err);
        alert('There was an error accepting the request. Please try again later.');
      },
    });
  }


  rejectRequest(requestId: string): void {
      this.postService.rejectFollowRequest(requestId).subscribe({
        next: () => {
          this.friendRequests = this.friendRequests.filter(
            (request) => request._id !== requestId
          );
          alert('Friend request rejected!');
        },
        error: (err) => {
          console.error('Error rejecting request:', err);
        },
      });
  }

  


  ngOnDestroy(): void {
    // Clean up when the component is destroyed
    if (this.socketService.socket) {
      this.socketService.socket.off('newFriendRequest');
    }
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
