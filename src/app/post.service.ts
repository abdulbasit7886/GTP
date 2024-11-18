import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  router = inject(Router);
  http = inject(HttpClient);
  base_url = environment.domain;
  imgBaseUrl = environment.imgDomain;
  singlePost: any;
  allPosts: any;
  constructor() {}
  getAllPosts() {
    return this.http.get(this.base_url + '/api/post');
  }
  createPost(formData: any) {
    return this.http.post(this.base_url + '/api/post/upload/create', formData, {
      withCredentials: true,
    });
  }
  getSinglePost(id: any) {
    return this.http.get(this.base_url + '/api/post' + id);
  }
  editPost(id: any, updatedPost: FormData) {
    return this.http
      .patch(this.base_url + '/api/post/upload/update' + id, updatedPost, {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/']);
        },
        error: error =>{
          console.log(error)
        }
      });
  }
}
