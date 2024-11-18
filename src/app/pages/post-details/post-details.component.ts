import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { posts } from 'src/posts.model';
import { PostService } from 'src/app/post.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  posts = inject(PostService);
  auth = inject(AuthService)
  postId: any;
  postDetails: any;
  isAuthor = false;
  router = inject(ActivatedRoute)

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => this.postId = params.get('id'));
    this.posts.getSinglePost(this.postId).subscribe({
      next: value => {console.log(value); this.postDetails = value},
      error: error => console.log(error)
    })
  }
}
