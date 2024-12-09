import { inject } from '@angular/core';
import { CanActivateChildFn,Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

export const authGuardGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)
  const userService = inject(UserService)

  const routes = [
    '/login', '/register'
  ]
  const token = localStorage.getItem('token')

  // prevent protected routes before authentication
  if (!token && !routes.includes(state.url)) {
    router.navigate(['/login']);
    return false;
  }

  // prevent login and register routes after authenticated
  if (token && routes.includes(state.url)) {
    router.navigate(['/']);
    return false;
  }

  // allow access to register and login without being authenticated
  if (!token&&routes.includes(state.url)) {
    return true;
  }


 return true
};
