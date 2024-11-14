import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const editpostGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('authToken');
  if(userData){
  
  return true;
  }

  router.navigate(['/login']);
  return false;
};
