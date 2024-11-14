import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userinfoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('authToken');
  if(userData){
  
  return true;
  }

  router.navigate(['/login']);
  return false;
};
