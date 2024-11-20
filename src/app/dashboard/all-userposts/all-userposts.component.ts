import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-userposts',
  templateUrl: './all-userposts.component.html',
  styleUrls: ['./all-userposts.component.css']
})
export class AllUserPostsComponent implements OnInit {
  allPosts: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllPosts();
  }

  fetchAllPosts(): void {
    const token = localStorage.getItem('token'); // Assumes token is stored in localStorage
    if (!token) {
      this.errorMessage = 'Authorization token is missing!';
      return;
    }

    this.http.get('http://localhost:4000/all-posts', {
      headers: { Authorization: token }
    }).subscribe({
      next: (response: any) => {
        this.allPosts = response.allPosts || [];
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to fetch posts';
      }
    });
  }
}
