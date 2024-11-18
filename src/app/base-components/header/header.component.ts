import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = true;
  auth = inject(AuthService);
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  ngOnInit(): void {
    this.auth.checkAuth().subscribe({
      next: (value) => {
        console.log(value);
        this.auth.isAuthenticated = Object.values(value)[0];
        if (isPlatformBrowser(this.platformId)) {
          this.auth.username = Object.values(
            JSON.parse(localStorage.getItem('username') as string)[1]
          );
        }
      },
      error: (error) => console.log(error),
    });
  }
}
