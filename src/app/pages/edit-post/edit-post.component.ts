import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/post.service';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  auth = inject(AuthService);
  post = inject(PostService);
  router = inject(ActivatedRoute);
  postId: any;
  selectedFile!: File;
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }
  @ViewChild('editPost') editPost!: NgForm;

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const postId = params.get('id');
      this.postId = postId;
      console.log(postId);
      this.post.getSinglePost(postId).subscribe({
        next: value => {
          this.post.singlePost = value;
          console.log(this.post.singlePost)
        },
        error: error=> console.log(error)
      })
    })
  }

  editForm(){
    const formData = new FormData();
    formData.append('title', this.editPost.value.title);
    formData.append('content', this.editPost.value.content);
    formData.append('file', this.selectedFile)
    this.post.editPost(this.postId, formData)
    console.log(this.editPost.value);
    this.editPost.reset();
  }
}
