import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('authToken');
  if(userData){
  
  return true;
  }else{
    router.navigate(['/login']);
    return false;
  }


 
};
