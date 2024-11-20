import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import {inject} from '@angular/core';
export const dashboardGuard: CanActivateFn = (route, state) => {
  const router =inject(Router)
  const token = localStorage.getItem('token');
  if(token){
    return true;
  }else{
  router.navigate(['auth/signup']);
  return false;
  }
};
