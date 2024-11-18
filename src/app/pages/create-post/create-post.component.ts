import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  post = inject(PostService)
  selectedFile!: File;
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  @ViewChild('createPost') createPost!: NgForm;
  createForm(){
    const formData = new FormData();
    formData.append('title', this.createPost.value.title);
    formData.append('content', this.createPost.value.content);
    formData.append('file', this.selectedFile, this.selectedFile.name);
    console.log(this.createPost.value);
    this.post.createPost(formData);
    this.createPost.reset();
  }
}
