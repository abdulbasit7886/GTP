import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject} from '@angular/core';

export const signupGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isregister = localStorage.getItem('userdata') ! == null;

  if(isregister){
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
