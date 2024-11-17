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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  user: any;
  posts: Post[] = [];
  title:string = '';
  description: string = '';
  isEdit =false;
  editIndex = -1;
  err_msg: string = '';

  constructor(private postService: PostService, private router: Router ){}

  ngOnInit(): void {
    this.fetchPosts();
  }
  

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  createpost(){


    const trimmedTitle = this.title.trim();
    const trimmedDescription = this.description.trim();

    if(!trimmedTitle || !trimmedDescription){
      this.err_msg ='Title and Description cannot be empty or contain only spaces.';
      return;
    }


    if(this.isEdit){
      const postId = this.posts[this.editIndex]._id;
      this.postService.updatePost(postId,{title: this.title, description:this.description})
      .subscribe((res: any) =>{
        this.fetchPosts();
        this.resetForm();
      });
    }else{
      this.postService.createPost({ title: this.title, description: this.description })
        .subscribe((res: any) => {
          this.fetchPosts();
          this.resetForm();
        });
    }
  }

  fetchPosts(){
    this.postService.getPosts().subscribe( (res: any)=>{
      if(Array.isArray(res)){
      this.posts = res;
      }else if (res.posts ){
        this.posts = res.posts;
      }else{
        console.error('Unexpected API response:', res);
      }
      
    })
  }

  EditPost(index: number){
    this.isEdit = true;
    this.editIndex = index;
    this.title = this.posts[index].title;
    this.description = this.posts[index].description;
  }

  deletePost(index: number){
    const postId = this.posts[index]._id;
        this.postService.deletePost(postId).subscribe(() => {
            this.posts.splice(index, 1);
        }); 
  }
  resetForm() {
    this.title = '';
    this.description = '';
    this.isEdit = false;
    this.editIndex = -1;
}
}
