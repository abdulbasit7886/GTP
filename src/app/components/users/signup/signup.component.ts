import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Handle sign-up form submission
  onSignUp(): void {
    const newUser = { fullName: this.fullName, email: this.email, username: this.username, password: this.password };
    this.authService.signUp(newUser).subscribe(
      (response) => {
        // After successful sign up, navigate to the login page or ask the user to confirm email
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = error.error.message || 'Sign up failed. Please try again.';
      }
    );
  }
}
