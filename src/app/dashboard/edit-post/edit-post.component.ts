import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  postId: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
      this.getPost()
    });
  }
  editPost = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  })

  async getPost() {
    let token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/post/edit-post/${this.postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let res = await response.json();
      this.editPost.setValue({
        title: res.title || '',
        content: res.content || ''
      })
      console.log(res)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async edit(postId: string) {
    let token = localStorage.getItem('token');
    console.log(postId)
    console.log(this.editPost.value)
    try {
      const response = await fetch(`http://localhost:3000/post/edit-post/${this.postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
        body: JSON.stringify(this.editPost.value)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      await response.json();
      this.router.navigate(['/dashboard'])
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
