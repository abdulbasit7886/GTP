import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const createpostGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('authToken');
  if(!userData){
    router.navigate(['/login']);
  return false;
  }else{
    return false;
  }

};
