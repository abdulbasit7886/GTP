import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {
  this.getUser()
  }
  editProfile = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    // password: new FormControl(''),
  })

  async getUser() {
    let token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/user/userInfo`, {
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
      this.editProfile.setValue({
        name: res.name || '',
        email: res.email || '',
        // password: res.password || ''
      })
      console.log(res)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async edit(){
    let token = localStorage.getItem('token');
    console.log(this.editProfile.value)
    try {
      const response = await fetch(`http://localhost:3000/user/userInfo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
        body: JSON.stringify(this.editProfile.value)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      await response.json();
      this.router.navigate(['/user-profile'])
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
