// src/app/dashboard/task/tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})



export class TaskComponent implements OnInit {
  posts: any[] = [];
  editingPost: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    const token = localStorage.getItem('token'); 
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any>('http://localhost:5000/api/posts/my-posts', { headers }).subscribe(
        (response: any) => {
          response.data.forEach((post: any) => {
            post.picture = `http://localhost:5000/${post.picture}`; 
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

  startEditPost(post: any): void {
    this.editingPost = { ...post };
  }

  cancelEdit(): void {
    this.editingPost = null;
  }

  updatePost(post: any): void {
    const token = localStorage.getItem('token'); 
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(`http://localhost:5000/api/posts/my-posts/update/${post._id}`, post, { headers }).subscribe(
        (response) => {
          console.log('Post updated successfully', response);
          this.fetchPosts();
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }


  deletePost(postId: string): void {
    const token = localStorage.getItem('token'); 
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`http://localhost:5000/api/posts/my-posts/delete/${postId}`, { headers }).subscribe(
        (response) => {
          console.log('Post deleted successfully', response);
          this.fetchPosts(); 
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    }
  }
  logout(postId: string): void {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}





