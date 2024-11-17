import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Router} from '@angular/router'

export interface Post{
  username: string ;
  title:string ;
  description: string ;
  _id: string;
}
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit{

  posts: Post[] = [];
  constructor(private postService: PostService, private router: Router){}


  ngOnInit(): void {
    this.fetchallPosts();
  }

  fetchallPosts(){
    this.postService.getotherPosts().subscribe(
      (res: Post[]) =>{
        if(Array.isArray(res)){
            this.posts = res;
          }else{
            console.error('Unexpected API response:', res);
          }
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
