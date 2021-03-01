import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorTreatmentService } from './error-treatment.service';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { ServerConfig } from '../config/server.config';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private errorsAlert: ErrorTreatmentService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}
  private apiUrl = ServerConfig.apiBaseUrl;
  /**
   *  Get data from server. Can send url queries
   * @param url string
   * @param head Object
   * @return Observable
   */
  get(url: string, head?: object, baseUrl = this.apiUrl): Observable<any> {
    return this.sendData(baseUrl + url, 'get', null, head);
  }
  /**
   *  delete data from server. Can send url queries
   * @param url string
   * @param head Object
   * @return Observable
   */
  delete(url: string, head?: object, baseUrl = this.apiUrl): Observable<any> {
    return this.sendData(baseUrl + url, 'delete', null, head);
  }
  /**
   *  Post data array to server
   * @param url string
   * @param data any[]
   * @return Observable
   */
  post(url: string, data: any): Observable<any> {
    return this.sendData(this.apiUrl + url, 'post', data);
  }
  /**
   *  Put data array to server
   * @param url string
   * @param data any[]
   * @return Observable
   */
  put(url: string, data: any): Observable<any> {
    return this.sendData(this.apiUrl + url, 'put', data);
  }
  /**
   * Send data to server
   * @param url string
   * @param method string
   * @param data any[]
   */
  sendData(
    url: string,
    method: string,
    data?: any,
    head?: object
  ): Observable<any> {
    const headers: HttpHeaders = this.setHeader();
    const httpOptions = {
      headers,
      withCredentials: true,
    };
    const promise = data
      ? this.http[method](url, data, httpOptions)
      : this.http[method](url, httpOptions);
    return promise.pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorsAlert.notify(error);
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  /**
   * FILES FILES UPLOAD
   * @param url string
   * @param data any
   */
  postFiles(url: string, data: any): Observable<any> {
    const headers: HttpHeaders = this.setHeader();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http
      .post(this.apiUrl + url, data, {
        headers,
        observe: 'events',
        withCredentials: true,
        reportProgress: true,
      })
      .pipe(
        map((events: HttpEvent<object>) => {
          return this.getEventMessage(events);
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorsAlert.notify(error);
          if (error.status === 401 || error.status === 403) {
            this.authService.logout();
          }
          return throwError(error);
        })
      );
  }

  /**
   * Depending of event type, returns a string with a message
   * @param event HttpEvent<Object>
   * @returns object {status, message}
   */
  public getEventMessage(event: any | HttpEvent<object>): object {
    if (event) {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          return {
            status: 'progress',
            message: { loaded: event.loaded, total: event.total },
          };

        case HttpEventType.Response:
          return {
            status: 'loadend',
            message: 'Arquivos enviados com sucesso!',
            response: event,
          };

        default:
          return { status: 'undefined', message: 'undefined' };
      }
    }
  }

  public setHeader(): HttpHeaders {
    let headers: HttpHeaders;
    headers = new HttpHeaders({
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') ?? '',
    });
    return headers;
  }
}
