import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ErrorTreatmentService } from '../common/services/error-treatment.service';
import { ServerConfig } from '../common/config/server.config';
import { BasicRoutes } from '../common/config/routes.config';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private subs: Subscription;
  public isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private errorTreatment: ErrorTreatmentService,
    private cookieService: CookieService
  ) {}

  public checkSPALogged(): void {
    const headers = this.setHeader();
    this.subs = this.http
      .get(ServerConfig.apiBaseUrl + 'isLogged', { headers, withCredentials: true })
      .subscribe((data: any) => {
        if (!data) {
          this.logout();
        } else {
          /* fillUserData */
          this.isLoggedIn = true;
        }
      });
  }

  // store the URL so we can redirect after logging in
  public login(): void {
    this.isLoggedIn = true;
    // Redirect the user
    this.router.navigate([this.redirectUrl ? this.redirectUrl : '/']);
  }
  /**
   * logs out the user
   */
  public logout(): void {
    this.isLoggedIn = false;
    
    const headers = this.setHeader();
    this.redirectToLogin();

    this.subs = this.http
      .get(ServerConfig.apiBaseUrl + 'logout', { headers, withCredentials: true })
      .subscribe(
        (resp: boolean) => {
          this.cookieService.delete('XSRF-TOKEN');
          this.cookieService.deleteAll();
        },
        (error: HttpErrorResponse) => {
          this.errorTreatment.notify(error);
        }
      );
  }

  public redirectToLogin(): void {
    this.router.navigate([BasicRoutes.signIn]);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  setHeader(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') ?? '',
    });
    return headers;
  }
}
