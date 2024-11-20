import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = null; // Holds user data, including posts
  postContent: string = ''; // New post content
  selectedFile: File | null = null; // New post image file
  isModalOpen: boolean = false; // Modal visibility state
  modalContent: string = ''; // Modal content for editing posts
  modalSelectedFile: File | null = null; // Modal selected image file
  modalIndex: number = -1; // Index of the post being edited

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  // Fetch user profile and posts
  fetchUserProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get('http://localhost:4000/profile', {
        headers: { Authorization: token }
      }).subscribe(
        (res: any) => {
          this.user = res; // Assign user data from server
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Unauthorized');
    }
  }

  // Handle file selection for new posts
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  // Create a new post
  createPost(): void {
    const token = localStorage.getItem('token');
    if (!this.postContent.trim()) {
      alert('Post content cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('content', this.postContent);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (token) {
      this.http.post('http://localhost:4000/user/create-post', formData, {
        headers: { Authorization: token },
      }).subscribe(
        (res: any) => {
          alert('Post created successfully.');
          this.user.post.unshift(res.post); // Add new post to the user's posts
          this.postContent = ''; // Reset input fields
          this.selectedFile = null;
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Unauthorized');
    }
  }

  // Open the modal for editing a post
  openUpdateModal(post: any, index: number): void {
    this.modalContent = post.content; // Pre-fill modal with post content
    this.modalSelectedFile = null; // Reset selected file in modal
    this.modalIndex = index;
    this.isModalOpen = true;
  }

  // Handle file selection in the modal
  onModalFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.modalSelectedFile = input.files[0];
    }
  }

  // Update the post content and/or image
  updatePost(index: number): void {
    const token = localStorage.getItem('token');
    if (!this.modalContent.trim() && !this.modalSelectedFile) {
      alert('Post content or image must be provided.');
      return;
    }

    const formData = new FormData();
    formData.append('content', this.modalContent);
    if (this.modalSelectedFile) {
      formData.append('image', this.modalSelectedFile);
    }

    if (token) {
      this.http.patch(`http://localhost:4000/user/update-post/${index}`, formData, {
        headers: { Authorization: token },
      }).subscribe(
        (res: any) => {
          alert('Post updated successfully.');
          this.user.post[index] = res.post; // Update the post in the local array
          this.closeModal(); // Close the modal
        },
        (error) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Unauthorized');
    }
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalContent = '';
    this.modalSelectedFile = null;
    this.modalIndex = -1;
  }

  // Delete a post
  deletePost(index: number): void {
    const token = localStorage.getItem('token');
    if (token) {
      const isConfirmed = window.confirm('Are you sure you want to delete this post?');
      if (isConfirmed) {
        this.http.delete(`http://localhost:4000/user/delete-post/${index}`, {
          headers: { Authorization: token },
        }).subscribe(
          () => {
            this.user.post.splice(index, 1); // Remove the post locally
            alert('Post deleted successfully.');
          },
          (error) => {
            alert(error.error.message);
          }
        );
      }
    } else {
      alert('Unauthorized');
    }
  }
}
