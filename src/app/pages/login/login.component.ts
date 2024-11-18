import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  auth = inject(AuthService);
  @ViewChild('login') login!:NgForm;
  checkLogin(){
    this.auth.loginAuth(this.login.value);
    this.login.reset();
  }
}
