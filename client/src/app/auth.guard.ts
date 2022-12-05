import { CookieService } from 'ngx-cookie';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.cookieService.get('id');
    if (currentUser) {
      //auth then return true
      return true;
    }

    //not logged in so go to login page
    this.router.navigateByUrl('/');
    return false;
  }
}
