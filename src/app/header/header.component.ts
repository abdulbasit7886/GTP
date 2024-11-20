import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute
import { NavigationEnd } from '@angular/router'; // Import NavigationEnd to listen to route changes
import { filter } from 'rxjs/operators'; // Import filter for handling route change events

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoginOrSignupPage: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Check the current route on init
    this.checkIfLoginOrSignupPage();

    // Optionally, you can check if the user is logged in on init
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token; // If there's a token, the user is logged in

    // Listen for route changes to update the visibility of the nav
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkIfLoginOrSignupPage();
    });
  }

  // Method to check if the user is on the login or signup page
  checkIfLoginOrSignupPage(): void {
    const currentRoute = this.router.url;
    this.isLoginOrSignupPage = currentRoute.includes('/auth/login') || currentRoute.includes('/auth/signup');
  }

  logout(): void {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    this.router.navigate(['/auth/login']);
  }
}
