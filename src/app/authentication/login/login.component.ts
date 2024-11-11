import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }
  async userLogin(loginForm: NgForm) {
    let user = loginForm.value
    if (!user.email || !user.password) {
      alert('Please enter email & Password')
      return;
    }
    console.log(user)
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        const res = await response.json()
        console.log('res')
        throw new Error(res.message)
      } else {
        const data = await response.json()
        localStorage.setItem('token',JSON.stringify(data.token))
        alert(data.message)
        loginForm.reset()
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
