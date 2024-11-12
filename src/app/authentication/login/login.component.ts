// src/app/authentication/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router ) { }

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        alert('Login successful!');
        console.log(response);

        // Save token in localStorage
        if (response.token) {
          this.authService.saveToken(response.token);
        }
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert('Login failed. Please check your credentials.');
        console.error(error);
      }
    });
  }
}
