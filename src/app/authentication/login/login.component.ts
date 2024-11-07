import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router){}
  userLogin(loginForm: NgForm) {
    let user=loginForm.value
    let data=localStorage.getItem('user')
    console.log(data)
    if(data && JSON.parse(data).email==user.email && JSON.parse(data).password==user.password){
      loginForm.reset()
      this.router.navigate(['/dashboard'])
    }else{
      alert('Invalid credentials')
      loginForm.reset()
    }

  }
}
