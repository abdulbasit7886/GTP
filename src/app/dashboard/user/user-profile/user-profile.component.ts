import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private router: Router) { }
  user: any = {}
  ngOnInit(): void {
    this.checkToken();
    this.userInfo()
  }
  async checkToken() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['/login'])
    }
  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
  editProfile() {
    this.router.navigate(['/edit-profile'])
  }
  viewPosts() {
    console.log('herreeee')
    this.router.navigate(['/dashboard'])
  }

  async userInfo() {
    let token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/user/userInfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
      });
      const data = await response.json()
      this.user = data
      console.log(this.user)
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
