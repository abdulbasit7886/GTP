import { Component } from '@angular/core';
import {PostService} from '../services/post.service';
import { Router } from '@angular/router';

// interface Friend {
//   username: string;
// }


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent {
  friends: any[] = [];
  mutualFriends: { [key: string]: string[] } = {}; // To store mutual friends for each friend

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the friend list from the backend when the component is initialized
    this.postService.getFriendList().subscribe({
      next: (response) => {
        this.friends = response;  // Store the list of friends in the component
      },
      error: (err) => {
        console.error('Error fetching friend list:', err);
        alert('Failed to load friend list. Please try again.');
      }
    });
  }

  removeFriend(friendUsername: string): void {
    // Call the service to remove the friend
    this.postService.removeFriend(friendUsername).subscribe({
      next: () => {
        // Update the local friend list by filtering out the removed friend
        this.friends = this.friends.filter(friend => friend !== friendUsername);
        alert(`${friendUsername} has been removed from your friend list.`);
      },
      error: (err) => {
        console.error('Error removing friend:', err);
        alert('Error removing friend. Please try again later.');
      }
    });
  }

  fetchMutualFriends(friendUsername: string): void {
    this.postService.getMutualFriends(friendUsername).subscribe({
      next: (data) => {
        console.log(`Mutual friends with ${friendUsername}:`, data);
        this.mutualFriends[friendUsername] = data; // Store mutual friends
      },
      error: (err) => {
        console.error(`Error fetching mutual friends for ${friendUsername}:`, err);
      }
    });
  }

  

}
