import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  http = inject(HttpClient);
  base_url = environment.domain;
  isAuthenticated: any;
  username: any;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  checkAuth() {
    return this.http.get(this.base_url + '/api/auth/check', {
      withCredentials: true,
    });
  }
  signupAuth(formData: any) {
    return this.http
      .post(this.base_url + '/api/auth/signup', formData)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/login']);
        },
        error: (error) => console.log(error),
      });
  }
  loginAuth(formData: any) {
    return this.http
      .post(this.base_url + '/api/auth/login', formData, {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('username', JSON.stringify(value));
          }
          this.router.navigate(['/'])
        },
        error: (error) => console.log(error),
      });
  }
  signOut() {
    return this.http
      .get(this.base_url + '/api/auth/signout', {
        withCredentials: true,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          localStorage.removeItem('username');
          const currentRoute = this.router.url;
          if(currentRoute === '/'){
            window.location.reload();
          }else{
            this.router.navigate(['/']).then(() => window.location.reload())
          }
        },
        error: (error) => console.log(error),
      });
  }
}
