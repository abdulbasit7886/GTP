// src/app/authentication/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth'; 

  constructor(private http: HttpClient) { }

  // User Registration
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/signup`, userData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // User Login
  login(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/login`, userData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Save the token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Log out the user by removing the token
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Check if the user is logged in (token exists and is valid)
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
   
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
      
      if (error.status === 400) {
        errorMessage = error.error.message || 'Invalid data. Please try again.';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized access. Please check your login credentials.';
      } else if (error.status === 409) {
        errorMessage = 'User already exists. Please use a different email.';
      }
    }

    console.error('Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
