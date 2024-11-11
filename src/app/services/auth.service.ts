import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:8000/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  // Sign up new user
  signUp(user: { fullName: string, email: string, username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  // Confirm email OTP (after sign up)
  confirmEmail(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm`, { email, otp });
  }

  // Login user and store token in cookies automatically (via backend)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
  }

  // Logout user (clear cookie from browser)
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): boolean {
    return !!document.cookie;
  }
}
