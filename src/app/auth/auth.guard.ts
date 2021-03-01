import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { BasicRoutes } from '../common/config/routes.config';
import { AuthService } from './auth.service';

export class UserToken {}
export class UserPermissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateTeam implements CanActivate {
  constructor(
    private permissions: UserPermissions,
    private currentUser: UserToken,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    if (
      !this.userIsLogged(url) ||
      !this.permissions.canActivate(this.currentUser, route.params.id)
    ) {
      this.router.navigateByUrl('/' + BasicRoutes.signIn);
    }
    return true;
  }

  userIsLogged(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else if (
      this.cookieService.get('XSRF-TOKEN') &&
      this.cookieService.get('usr')
    ) {
      // check if the session cookie exixsts and its valid

      // this.userService.fillMyData();
      this.authService.isLoggedIn = true;
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/' + BasicRoutes.signIn]);
    return false;
  }
}
