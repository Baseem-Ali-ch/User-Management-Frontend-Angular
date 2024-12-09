import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const isAdminGuard: CanActivateChildFn = (childRoute, state) => {
  const token: string | null = localStorage.getItem('adminToken');
  const route: Router = inject(Router);

  const routes: string[] = ['/admin/login'];

  // prevent access protected route
  if (!token && !routes.includes(state.url)) {
    route.navigate(['/admin/login']);
    return false;
  }

  // prevent access admin/login after authenticated
  if (token && routes.includes(state.url)) {
    route.navigate(['/admin']);
    return false;
  }

  // allow access admin/login without beign authenticated
  if (!token && routes.includes(state.url)) {
    return true;
  }

  return true;
};
