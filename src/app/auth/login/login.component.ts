import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<{ token: string }>('http://localhost:5000/api/auth/login', loginData)
      .subscribe(
        (response) => {
          // Store the token in localStorage
          localStorage.setItem('token', response.token);
          alert('Login successful');
          // Optionally, navigate to a different page
          this.router.navigate(['/todos']); // Update this to your intended route
        },
        (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            alert("Invalid credentials. Please try again.");
          } else {
            alert("An error occurred during login. Please try again.");
          }
        }
      );
  }
}
