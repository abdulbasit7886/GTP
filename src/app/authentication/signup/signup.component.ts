import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router:Router){}
  userSignUp(signUpForm: NgForm) {
    let data=signUpForm.value
    localStorage.setItem('user', JSON.stringify(data))
    console.log(data)
    signUpForm.reset()
    this.router.navigate(['/login'])

  }

}
