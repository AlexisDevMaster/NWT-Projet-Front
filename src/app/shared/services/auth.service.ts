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
  USERNAME_KEY = 'username';

  apiUrl = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;

  private userToken;
  private _username: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<void> {
    console.log(this.apiUrl);
    const endpoint = this.apiUrl + '/login';
    const httpParams = {
      username,
      password
    };
    return this.httpClient
      .post<{ access_token: string }>(endpoint, httpParams, this.httpOptions)
      .pipe(
        map(token => {
          this.userToken = token.access_token;
          this._username = httpParams.username;
          this.storeToken();
          this.storeUsername();
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

  get username(): string{
    return this._username;
  }

  logoutAndRedirect(): void {
    this.logout();
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.userToken = undefined;
    this.clearToken();
    this._username = '';
  }

  getUserToken(): string {
    return this.userToken;
  }

  getUsername(): string {
    return this._username;
  }

  isLoggedIn(): boolean {
    return typeof this.userToken !== 'undefined';
  }

  storeToken(): void {
    sessionStorage.setItem(this.TOKEN_KEY, this.getUserToken());
  }

  storeUsername(): void {
    sessionStorage.setItem(this.USERNAME_KEY, this.getUsername());
  }

  clearToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USERNAME_KEY);
  }

  getUsernameStored(): string{
    return sessionStorage.getItem(this.USERNAME_KEY);
  }

  hasStoredToken(): boolean {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) &&
      sessionStorage.getItem(this.TOKEN_KEY).length > 0
    );
  }
}
