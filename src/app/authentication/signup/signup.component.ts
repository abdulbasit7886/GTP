import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports:[FormsModule]
})
export class SignupComponent {
  constructor(private router: Router) {} 
 
  userSignUp(signUpForm: NgForm) {
    if (signUpForm.valid) {
      localStorage.setItem("user", JSON.stringify(signUpForm.value));
      alert("User registered successfully");

      this.router.navigate(['/login']);
    } else {
      alert("Please fill in all required fields.");
    }
}
}
