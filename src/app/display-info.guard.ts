import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const displayInfoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('userdata');
  if(userData){
  
  return true;
  }

  router.navigate(['/login']);
  return false;
};
