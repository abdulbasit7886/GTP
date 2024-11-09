import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSignup() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // Save data to local storage
    localStorage.setItem('user', JSON.stringify(userData));
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
