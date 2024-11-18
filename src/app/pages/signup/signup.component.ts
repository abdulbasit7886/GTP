import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  auth= inject(AuthService);
 @ViewChild('signup') signup!: NgForm;
 checksignup(){
  this.auth.signupAuth(this.signup.value)
  this.signup.reset();
 }
}
