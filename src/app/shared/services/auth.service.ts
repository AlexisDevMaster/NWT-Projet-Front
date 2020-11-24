import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = 'admin';

  apiUrl = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;

  private userToken;

  // xClientInfoHeader = {
  //   appVersion: '1.0.0',
  //   os: 'macOS',
  //   osVersion: '10.14.5',
  //   device: 'mac Mini',
  //   lang: 'sv'
  // };
  //
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
      // 'X-ClientInfo': JSON.stringify(this.xClientInfoHeader)
    })
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<void> {
    console.log(this.apiUrl);
    const endpoint = this.apiUrl + '/auth/login';
    const httpParams = {
      username,
      password
    };
    console.log(username);
    console.log(password);

    return this.httpClient
      .post<{ access_token: string }>(endpoint, httpParams, this.httpOptions)
      .pipe(
        map(token => {
          this.userToken = token.access_token;
          this.storeToken();
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    const endpoint = this.apiUrl + '/register';
    const httpParams = {
      username,
      password
    };

    return this.httpClient
      .post(endpoint, httpParams);
  }



  logoutAndRedirect(): void {
    this.logout();
    const url = '/login';
    this.router.navigate([url]);
  }

  logout(): void {
    this.userToken = undefined;
    this.clearToken();
  }

  getUserToken(): string {
    return this.userToken;
  }

  isLoggedIn(): boolean {
    return typeof this.userToken !== 'undefined';
  }

  storeToken(): void {
    sessionStorage.setItem(this.TOKEN_KEY, this.getUserToken());
  }

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  hasStoredToken(): boolean {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) &&
      sessionStorage.getItem(this.TOKEN_KEY).length > 0
    );
  }
}
