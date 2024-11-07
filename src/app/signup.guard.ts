import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signupGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isregister = localStorage.getItem('userdata') ! == null;

  if(isregister){
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
