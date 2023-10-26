import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userSvc: UserService = inject(UserService);
  const router: Router = inject(Router);
  let user: User | any;

  user = userSvc.getCurrentUser() ?? undefined;
  if(!user) {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
