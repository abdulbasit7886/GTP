import { Component, inject, OnInit } from '@angular/core';
import { posts } from '../../../posts.model';
import { PostService } from 'src/app/post.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts = inject(PostService);
  ngOnInit(): void {
    this.posts.getAllPosts().subscribe({
      next: value => {console.log(value); this.posts.allPosts = value},
      error: error => console.log(error)
    })
  }
}
