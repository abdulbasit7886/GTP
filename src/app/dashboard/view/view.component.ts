import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  constructor(private router: Router) { }
  posts: any[] = []
  ngOnInit(): void {
    this.checkToken();
    this.getAllPosts();
  }

  async checkToken() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['/login'])
    }
  }

  async getAllPosts() {
    let token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/post/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        }
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      this.posts = await response.json();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  createPage() {
    this.router.navigate([`/create-post`]);
  }
  editPage(postId: string) {
    this.router.navigate([`/edit-post`], { queryParams: { postId: postId } });
  }
}
