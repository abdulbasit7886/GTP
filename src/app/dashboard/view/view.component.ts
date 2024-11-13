// view.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  posts: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No authentication token found. Please log in.");
      return;
    }

    this.http.get<any>('http://localhost:3001/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe(
      (data) => {
        console.log(data, 'ghghh');
        this.posts = data.activeUserPosts; 
        console.log("Fetched posts:", this.posts);
      },
      (error) => {
        console.error("Error fetching posts:", error);
      }
    );
  }
}

