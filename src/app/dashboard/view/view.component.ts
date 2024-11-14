import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  postId: string | null = null;
  posts: any = {};
  post: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId']
      console.log(this.postId)
      this.fetchPosts();
    });
  }

  fetchPosts(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login'])
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
  editpage(postId: string) {
    console.log(postId)
    this.router.navigate(['/editpost'], { queryParams: { postId: postId } })
  }
  deletePost(postId:any): void {
    const token = localStorage.getItem('authToken');
    console.log(token)
    this.http.delete(`http://localhost:3001/profile/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
        this.router.navigateByUrl('dashboard');
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  
}

