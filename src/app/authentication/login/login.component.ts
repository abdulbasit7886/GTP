import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,) { }

  showNotification(message: string): void {
    console.log("Notification Message:", message); 
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  async userLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      const user = loginForm.value;

      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });

        if (response.ok) {
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('authToken', data.token);
            console.log(data.token)
            this.showNotification('Login SucessFul');
            this.router.navigate(['/dashboard']);
          } else {
            this.showNotification("Login failed. Token not received.");
          }
        } else {
          this.showNotification("Invalid email or password");
        }
      } catch (error) {
        this.showNotification("An error occurred while trying to log in. Please try again.");
        console.error("Error:", error);
      }
    } else {
      this.showNotification("Please fill in all required fields.");
    }
  }
}
