import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(
    private loginService: LoginService,
    private router: Router){}
    
    backenderr_msg: string = '';
    backendSucc_msg: string = '';

    submitted = false;

    inputfieldsCheck(loginForm: NgForm){
      this.submitted = true;
      if(loginForm.invalid){
        return;
      }
    }

  loginUser(loginData: {email: string; password: string}, loginForm: NgForm){

   
     const trimmedEmail = loginData.email.trim();
     const trimmedPassword = loginData.password.trim();

     if(!trimmedEmail || !trimmedPassword){
      this.backenderr_msg = 'Fields are required, cannot contain only spaces';
      this.backendSucc_msg = "";
      return;
     }

    if(loginData.email){
      loginData.email = loginData.email.toLowerCase();
     }

   this.loginService.loginUser(loginData).subscribe({
    next: (res) =>{
      console.log('User logged in successfully', res);
      this.backendSucc_msg = res.message;
      this.backenderr_msg= '';

      if(res.token){
        localStorage.setItem('token', res.token);
      }
      loginForm.reset();
      this.router.navigate(['/profile'])
    },
    error: (error)=>{
      this.backenderr_msg = error.error?.message || 'Error during login';
    }
   })

  }
}
