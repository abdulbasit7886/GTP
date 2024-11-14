// src/app/view/view.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  title: string = '';
  description: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  createPost(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.message = 'You need to log in to create a post.';
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const postData = {
      title: this.title,
      description: this.description,
    };

    this.http.post('http://localhost:5000/api/posts/create', postData, { headers }).subscribe(
      (response: any) => {
        this.message = 'Post created successfully!';
        this.router.navigate(['/tasks']);
        this.title = '';
        this.description = '';
      },
      (error) => {
        console.error('Error creating post:', error);
        this.message = 'Failed to create post. Please try again.';
      }
    );
  }
}
