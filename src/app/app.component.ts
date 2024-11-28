import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  showHeader: boolean = true;
  constructor(private router: Router) {}

  ngOnInit() {
    // Listen for route changes and update the showHeader flag
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event) => { 
      const navigationEndEvent = event as NavigationEnd;  
      // Set showHeader to false for login or signup pages
      if (navigationEndEvent.urlAfterRedirects === '/login' || navigationEndEvent.urlAfterRedirects === '/signup') {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    });
  
}
}
