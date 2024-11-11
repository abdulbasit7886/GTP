import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router){}
  userLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      const user = loginForm.value;
      const storedData = localStorage.getItem('user');
  
      if (storedData) {
        const parsedData = JSON.parse(storedData);
  
        if (user.email === parsedData.email && user.password === parsedData.password) {
          alert("Login successful!");
          this.router.navigate(['/dashboard']);
        } else {
          alert("Invalid email or password");
        }
      } else {
        alert("No user found. Please register first.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  }
}
