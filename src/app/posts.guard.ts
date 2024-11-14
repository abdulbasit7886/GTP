import { CanActivateFn } from '@angular/router';

export const postsGuard: CanActivateFn = (route, state) => {
  return true;
};
