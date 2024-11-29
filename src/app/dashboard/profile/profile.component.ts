import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  postId: string | null = null;
  posts: any = {};
  post: any = {};
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId']
      console.log(this.postId)
      this.profile();
    });
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
      console.log(this.userId)
    });
  }
  editpage(postId: string) {
    console.log(postId)
    this.router.navigate(['/editpost'], { queryParams: { postId: postId } })
  }
  edituser(userId:string){
    console.log(userId)
    this.router.navigate(['/userinfo'],{queryParams:{userId:userId}})
  }
  profile(): void {
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
        
        this.router.navigateByUrl('/profile');
        this.profile()
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
  logout() {
    localStorage.removeItem('authToken')
    this.router.navigate(['/login'])
  }
  
}
