import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent {
  title : string = '';
  content : string = '';
  errorMessage : string ='';

  constructor (private http: HttpClient, private router: Router) {}

  createPost(){
    const token = localStorage.getItem('token');

    if(!token) {
      this.errorMessage ='No token found. Please log in.';
      return; 

  
    }
  const postData ={
   title: this.title,
   content : this.content

  };
this .http.post('http://localhost:3001/createPosts;',postData,{
  headers: {
    Authorization :`Bearer ${token}`
  }
}).subscribe(
  (response) =>{
    console.log ('Post create successfully:',response);
    this.router.navigate (['/dashboard'])

  },
  (error) => {
    console.error ('Error creating post:',error);
    this.errorMessage = 'Error creating post.Please try again later.';

  }
);

}
}
