import { Component, OnInit } from '@angular/core';


interface Post{
  title: string;
  description: string;
}

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  userData: any;
  posts: Post[] = [];
 title: string = '';
 description: string = '';
 isEdit: boolean =false;
 editIndex: number | null = null;
  ngOnInit(){
    const getuserData = localStorage.getItem('userdata');
  if(getuserData){
    this.userData = JSON.parse(getuserData);
  }
  else{
    console.warn("No data found in storage")
  }

  const getuserPost = localStorage.getItem('posts');
  if(getuserPost){
    this.posts = JSON.parse(getuserPost);
  }
  else{
    console.warn("No data found in storage")
  }
  }
  createpost(){
    const post: Post ={
      title: this.title,
      description: this.description
    }
    if(this.isEdit && this.editIndex !== null){
      //update user post
      this.posts[this.editIndex] =post;
      this.isEdit =false;
      this.editIndex = null;
    }
    else{
      this.posts.push(post);
    }
    this.title="";
    this.description="";
    this.savelocalstorage();
  }
  EditPost(index: number){
    const post = this.posts[index];
    this.title = post.title;
    this.description = post.description;
    this.isEdit = true;
    this.editIndex = index;
  }
  deletePost(index: number){
    this.posts.splice(index, 1);
    if(this.isEdit && this.editIndex === index){
      this.title = '';
      this.description = '';
      this.isEdit = false;
      this.editIndex = null;
    }
    this.savelocalstorage();
}
    savelocalstorage(){
      localStorage.setItem('posts',JSON.stringify(this.posts));
    }
}
