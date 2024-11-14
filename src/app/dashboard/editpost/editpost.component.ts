import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  postId: string | null = null;
  post: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
   this.postId=params['postId']
   console.log(this.postId)

   });
  }

  fetchPost(): void {
    this.http.get(`http://localhost:3001/profile`).subscribe(
      (data: any) => {
        this.post = data; 
      },
      (error) => {
        console.error('Error fetching post data:', error);
      }
    );
  }

  savePost(): void {
  const token = localStorage.getItem('authToken'); 

  this.http.put(`http://localhost:3001/editpost/${this.postId}`, this.post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).subscribe(
    (response) => {
      console.log('Post updated successfully:', response);
      this.router.navigate(['/dashboard']); 
    },
    (error) => {
      console.error('Error updating post:', error);
    }
  );
}

}
