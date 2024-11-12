import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  userData = { username: '', email: '', password: '' };
  isLoading = false; // Loading indicator

  constructor(private authService: AuthService, private router: Router) { }  // Inject Router

  register() {
    // Basic client-side validation
    if (!this.userData.username || !this.userData.email || !this.userData.password) {
      alert('All fields are required.');
      return;
    }

    this.isLoading = true; // Set loading to true before making request

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Registration successful!');
        
        console.log('Registration response:', response);
        
        // Optionally reset the form fields
        this.userData = { username: '', email: '', password: '' };
        
        // Redirect to login page after successful registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 400) {
          alert('Registration failed: User already exists or invalid data.');
        } else {
          alert('Registration failed. Please try again later.');
        }
        console.error('Registration error:', error);
      }
    });
  }
}
