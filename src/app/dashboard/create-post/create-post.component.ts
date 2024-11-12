import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private router:Router) {}
  createPost = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  })

  async create(){
    console.log(this.createPost.value);
      let post = this.createPost.value
      if (!post.title || !post.content) {
        alert('Please enter title & Content both')
        return;
      }
      console.log(post)
      console.log(localStorage.getItem('token'))
      let token=localStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:3000/post/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token || ''
          },
          body: JSON.stringify(post)
        })
        if (!response.ok) {
          const res = await response.json()
          console.log('res')
          throw new Error(res.message)
        } else {
          const data = await response.json()
          alert(data.message)
          this.createPost.reset(); 
          this.router.navigate(['/dashboard'])
        }
      }
      catch (error) {
        console.error('An error occurred:', error);
        alert(error)
        return
      }
  }
}
