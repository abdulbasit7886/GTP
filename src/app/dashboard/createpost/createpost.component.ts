import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  title: string = ''; 
  content: string = ''; 
  photo: File | null = null; 
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  showNotification(message: string): void {
    console.log("Notification Message:", message);
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photo = input.files[0]; 
    }
  }

  onImageError(post: any) {
    console.error('Image not found for post:', post);
  }

  createPost(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.showNotification('You need to login to create a post');
      this.router.navigate(['/login']);
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);

    if (this.photo) {
      formData.append('photo', this.photo);
    }

    this.http.post('http://localhost:3001/createPosts', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        this.showNotification('Post created successfully!');
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error creating post:', error);
        this.errorMessage = 'Error creating post. Please try again later.';
        this.showNotification(this.errorMessage);
      }
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.showNotification('Logout Sucessful')
    this.router.navigate(['/login']);
  }
}
