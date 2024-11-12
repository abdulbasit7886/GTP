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
    this.http.get<any>('http://localhost:3001/posts').subscribe(
      (data) => {
        this.posts = data.posts; 
        console.log("Fetched posts:", this.posts);
      },
      (error) => {
        console.error("Error fetching posts:", error);
      }
    );
  }
}
