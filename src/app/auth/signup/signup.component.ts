import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  save(): void {
    const signupData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5000/api/auth/signup', signupData)
      .subscribe(
        response => {
          console.log('Signup successful', response);
          alert('Signup successful');
        },
        error => {
          console.error('Signup failed', error);
          if (error.status === 400 && error.error?.error === "User already exists") {
            alert("User with this email already exists. Please try logging in.");
          } else {
            alert("An error occurred during signup. Please try again.");
          }
        }
      );
  }
}
