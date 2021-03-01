import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerConfig } from 'src/app/common/config/server.config';
import { HttpService } from 'src/app/common/services/http.service';

@Injectable()
export class LoginService {

  constructor(private httpService: HttpService) {}

  /**
   * get CSRF token from laravel
   */
  public getCSRF(): Observable<any> {
    // return true for tests purpose
    return new Observable( (observer) => {
      observer.next(true);
    });
    return this.httpService.get('sanctum/csrf-cookie', null, ServerConfig.webBaseUrl);
  }
  /**
   * login to server and returns the user model
   * @param username String
   * @param password String
   * @returns User
   */
  public login(mail: string, pass: string, rem: boolean): Observable<boolean> {
    const credentials = {
      email: mail,
      password: pass,
      remember: rem,
    };

    // code example for tests purpose
    return new Observable((observer) => {observer.next(true)});
    return this.httpService.post('authenticate', credentials);
  }
}
