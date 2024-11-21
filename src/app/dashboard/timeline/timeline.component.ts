import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{
  posts: any[] = []
  // users: any[]=[]
  constructor(private http: HttpClient) {}

  ngOnInit(): void{
    this.fetchPosts()
  }

  fetchPosts(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get('http://localhost:5000/api/posts/allPosts', { headers }).subscribe(
        (response: any) => {
          response.data.forEach((post: any) => {
            post.picture = `http://localhost:5000/${post.picture}`; // Full URL for image
          });
          this.posts = response.data;
          console.log(this.posts)
        },

        (error) => {
          console.error('Error fetching posts:', error);
          console.log('Possible Causes:');
          console.log('1. Backend server is not running.');
          console.log('2. Incorrect API URL or port mismatch.');
          console.log('3. Token might be invalid or expired.');
          console.log('4. CORS issues on the backend.');
        }
      );
    } else {
      console.warn('No token found in local storage');
    }
  }

}
