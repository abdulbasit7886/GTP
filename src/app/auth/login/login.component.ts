// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:4000/login', this.loginForm.value).subscribe(
        (res: any) => {
          alert(res.message);
          localStorage.setItem('token', res.token);
          this.router.navigate(['dashboard/all-userposts']);
        },
        (error) => {
          alert(error.error.message);
        }
      );
    }
  }
}
