// src/app/dashboard/task/tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TaskComponent implements OnInit {
  posts: any[] = [];
  editingPost: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    const token = localStorage.getItem('token'); 
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any>('http://localhost:5000/api/posts/my-posts', { headers }).subscribe(
        (response) => {
          this.posts = response.data; 
        },
        (error) => {
          console.error('Error fetching user posts:', error);
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

  // Method to delete a post
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
}
