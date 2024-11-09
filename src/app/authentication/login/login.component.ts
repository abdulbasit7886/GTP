import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser.email === this.email && storedUser.password === this.password) {
      this.router.navigate(['/view']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
