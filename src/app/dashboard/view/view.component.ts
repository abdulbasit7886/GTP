import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  title: string = ''; // Title for the post
  description: string = ''; // Description for the post
  selectedFile: File | null = null; // Store the selected file
  message: string = ''; // Message to display to the user

  constructor(private http: HttpClient, private router: Router) {}

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Create a new post
  createPost(event: Event): void {
    event.preventDefault(); // Prevent form from reloading the page

    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'You need to log in to create a post.';
      return;
    }

    if (!this.selectedFile) {
      this.message = 'Please select a picture.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('postPicture', this.selectedFile);  

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:5000/api/posts/create', formData, { headers }).subscribe(
      (response: any) => {
        this.message = 'Post created successfully!';

        this.router.navigate(['/']);
        this.title = '';
        this.description = '';
        this.selectedFile = null;
        console.log(response)
      },
      (error) => {
        console.error('Error creating post:', error);
        this.message = 'Failed to create post. Please try again.';
      }
    );
}


  // Reset form fields after submission
  resetForm(): void {
    this.title = '';
    this.description = '';
    this.selectedFile = null;
  }
}
