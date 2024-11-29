import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from 'src/app/dashboard/service/socket.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports:[FormsModule]
})
export class SignupComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  showNotification(message: string): void {
    console.log("Notification Message:", message);  // Add this for debugging
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds duration
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  async userSignUp(signUpForm: NgForm) {
    if (signUpForm.valid) {
      try {
        const response = await fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signUpForm.value)
        });

        if (response.ok) {
          this.showNotification('User Register Successfuly!');
          this.router.navigate(['/login']);
        } else {
          this.showNotification('Error In Registring the User');
        }
      } catch (error) {
        this.showNotification('An error occurred while trying to register. Please try again.')
        console.error("Error:", error);
      }
    } else {
      this.showNotification("Please fill in all required fields.");
    }
  }
}
