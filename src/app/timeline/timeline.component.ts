import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Router} from '@angular/router'
import {SocketService} from '../services/socket.service';
import { ChangeDetectorRef } from '@angular/core';

export interface Post{
  username: string ;
  title:string ;
  description: string ;
  _id: string;
  image: string;
  status: string;
  resharedBy?: string[]; 
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{

  posts: Post[] = [];
  loggedUser: string = '';

  currentNotification: string = ''; 
  notifications: { id: number, message: string }[] = [];  // To manage notification queue
  notificationIdCounter = 1;  // Incremental ID for notifications


  constructor(private postService: PostService, 
    private router: Router,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ){}


  ngOnInit(): void {
    this.fetchallPosts();
    this.getLoggedUser();

    this.socketService.joinRoom(this.loggedUser);
   
  }

  fetchallPosts(){
    this.postService.getotherPosts().subscribe(
      (res: Post[]) =>{
        if(Array.isArray(res)){
            // this.posts = res;
         
            // Ensure resharedBy is always an array
        this.posts = res.map(post => ({
          ...post,
          resharedBy: post.resharedBy ?? []  // Use nullish coalescing to default to an empty array if undefined
        }));
            
          }else{
            console.error('Unexpected API response:', res);
          }
      }
    )
  }

  getLoggedUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token payload
      this.loggedUser = payload.username; // Assuming 'username' is part of the token payload

      if (this.loggedUser) {
        // Call joinRoom after username is set
        this.socketService.joinRoom(this.loggedUser);
      } else {
        console.error('Logged user could not be determined from token.');
      }
    } else {
      console.error('No token found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }


  followUser(username: string): void {
  this.postService.sendFriendRequest(username).subscribe(
    (response: any) => {
      console.log('Friend request sent:', response);
    
      const post = this.posts.find(p => p.username === username);
      if (post) {
        post.status = 'pending';
      }

      this.socketService.sendFriendRequest(this.loggedUser, username);
       this.cdr.detectChanges();
      
    }
  );

}

// Method to update the post status when user accepts the follow

updatePostStatus(username: string, status: string): void {
  const post = this.posts.find(p => p.username === username);
  if (post) {
    post.status = status;
  }
}



  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  reshare(postId: string): void {
    this.postService.repost(postId).subscribe(
      (response) => {
        alert('Post reshared successfully!');
        this.fetchallPosts();  // Refresh posts to include reshared posts
      },
      (error) => {
        console.error('Error resharing post:', error);
        alert('Failed to reshare post. Please try again.');
      }
    );
  }

}


//   this.postService.sendFriendRequest(username).subscribe(
//     (response: any) => {
//       console.log('Friend request sent:', response);
//       // Update the button status to 'Pending'
//       const post = this.posts.find(p => p.username === username);
//       if (post) {
//         post.status = 'pending';
//       }
//     },
//     (error) => {
//       console.error('Error sending friend request:', error);
//       if (error.error && error.error.message) {
//         alert(error.error.message);
//       } else {
//         alert('An unexpected error occurred. Please try again.');
//       }
//     }
//   );

// }

//    showNotification(notification: { message: string; type: string }): void {
//    const newNotification = {
//    id: this.notificationIdCounter++,
//     message: notification.message,
//     type: notification.type,
//     };
//     this.notifications.push(newNotification);

// // Remove notification after 5 seconds
//    setTimeout(() => {
//    this.dismissNotification(newNotification.id);
//    }, 8000);
//     }

//       dismissNotification(notificationId: number): void {
//       this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
//      }

      // Method to accept a friend request
  //     acceptFollowRequest(notificationId: number): void {
  //   // Find the notification by its ID
  //   const notification = this.notifications.find(
  //     (n) => n.id === notificationId
  //   );

  //   if (notification && notification.type === 'friend-request') {
  //     console.log('Friend request accepted:', notification.message);

  //     // Call the service to accept the friend request
  //     const username = notification.message.split(' ')[0]; // Assuming message is like "UserName sent you a friend request"
  //     this.postService.acceptFollowRequest(username).subscribe(
  //       (response: any) => {
  //         console.log('Friend request accepted:', response);

  //         // Optionally, update the notification to reflect the action taken (e.g., accepted)
  //         this.dismissNotification(notificationId);
  //       },
  //       (error) => {
  //         console.error('Error accepting friend request:', error);
  //       }
  //     );
  //   }
  // }



  // acceptFollowRequest(notificationId: number): void {
  //   // Find the notification by its ID
  //   const notification = this.notifications.find(
  //     (n) => n.id === notificationId
  //   );
  
  //   if (notification && notification.type === 'friend-request') {
  //     console.log('Friend request accepted:', notification.message);
  
  //     // Assuming the backend sends the fromUser in the notification object
  //     const username = notification.message.split(' ')[0]; // Example: "Username sent you a friend request"
      
  //     // Alternatively, if the server sends the username explicitly:
  //     // const username = notification.fromUser;
  
  //     this.postService.acceptFollowRequest(username).subscribe({
  //       next: (response: any) => {
  //         console.log('Friend request accepted:', response);
  
  //         // Update the notification UI, or do other necessary UI changes
  //         this.dismissNotification(notificationId);
  //       },
  //       error: (error: any) => {
  //         console.error('Error accepting friend request:', error);
  //       },
  //       complete: () => {
  //         console.log('Friend request acceptance process completed.');
  //       }
  //     });
  //   }
  // }

  // acceptFollowRequest(notificationId: number): void {
  //   const notification = this.notifications.find(n => n.id === notificationId);
  
  //   if (notification && notification.type === 'friend-request') {
  //     console.log('Friend request accepted:', notification.message);
  
  //     const username = notification.message.split(' ')[0];  // "Username" from "Username sent you a friend request"
      
  //     // Or use the fromUser if available
  //     // const username = notification.fromUser;
  
  //     this.postService.acceptFollowRequest(username).subscribe({
  //       next: (response: any) => {
  //         console.log('Friend request accepted:', response);
  //         this.dismissNotification(notificationId);
  //       },
  //       error: (error: any) => {
  //         console.error('Error accepting friend request:', error);
  //       },
  //       complete: () => {
  //         console.log('Friend request acceptance completed.');
  //       }
  //     });
  //   }
  // }
