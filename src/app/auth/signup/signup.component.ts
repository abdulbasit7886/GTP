import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  // Name must be at least 3 characters long
      email: ['', [Validators.required, Validators.email]],  // Email should be in a valid format
      password: ['', [Validators.required, Validators.minLength(6)]],  // Password should be at least 6 characters
      gender: ['', Validators.required]  // Gender should not be empty
    });
  }
  ngOnInit(): void {
    // Reset form fields when the component is initialized
    this.signupForm.reset();
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.http.post('http://localhost:4000/signup', this.signupForm.value).subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          // Handle error gracefully
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert('An unexpected error occurred. Please try again.');
          }
        }
      );
    } else {
      alert('Please fill in all the fields correctly.');
    }
  }
}
