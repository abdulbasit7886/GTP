import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Import Router and NavigationEnd
import { filter } from 'rxjs/operators'; // Import filter for handling route change events

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoginOrSignupPage: boolean = false;  // Flag to track login/signup page visibility

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check the current route on init
    this.checkIfLoginOrSignupPage();

    // Listen for route changes to update the visibility of the footer
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
}
