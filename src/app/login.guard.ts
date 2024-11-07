import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('userdata');
  if(userData){
    return true; //allow access if user data is found
  }
 
  router.navigate(['/signup']);
  return false;
};
