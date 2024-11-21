import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;  // If token exists, user is logged in
    } else {
      this.isLoggedIn = false; // If no token, user is not logged in
    }
  }

  logout(): void {
    localStorage.removeItem('token');  // Remove token from localStorage
    this.router.navigate(['/login']);  // Redirect to login page
  }

  // Add a toggle function if needed for other UI functionality
  toggle() {
    // Additional functionality can go here
  }
}
