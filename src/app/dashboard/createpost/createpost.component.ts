import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  title: string = '';
  content: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  createPost() {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (!token) {
      this.errorMessage = 'No token found. Please log in.';
      return;
    }
  
    const postData = {
      title: this.title,
      content: this.content
    };
  console.log(postData)
   this.http.post('http://localhost:3001/createPosts',postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        this.router.navigate(['/dashboard']); 
      },
      (error) => {
        console.error('Error creating post:', error);
        this.errorMessage = 'Error creating post. Please try again later.';
      }
    );
  }
  
}
