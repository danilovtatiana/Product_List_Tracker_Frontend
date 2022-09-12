import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiServerUrl = environment.apiBaseUrl;
  readonly tokenKey = 'token';

  isLogged$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    //chech if user has saved token in local storage
    const hasToken = window.localStorage.getItem(this.tokenKey);
    if (!!hasToken) {
      this.isLogged$ = new BehaviorSubject<boolean>(true);
    } else {
      this.isLogged$ = new BehaviorSubject<boolean>(false);
    }
  }

  login(credentianls: CredentianlsI) {
    const formData = new FormData();

    formData.append('username', credentianls.username);
    formData.append('password', credentianls.password);

    const url: string = `${this.apiServerUrl}/login`;
    this.http
      .post(url, formData, {
        responseType: 'text',
        observe: 'response',
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.isLogged = true;
          this.isLogged$.next(true);
        },
        error: (error) => {
          this.isLogged = false;
          this.isLogged$.next(false);
        },
      });
  }

  logout() {
    this.isLogged$.next(false);
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  get isLogged(): boolean {
    const isLogged = window.localStorage.getItem(this.tokenKey);
    return !!isLogged;
  }

  set isLogged(state: boolean) {
    if (!state) {
      window.localStorage.removeItem(this.tokenKey);
    } else {
      window.localStorage.setItem(this.tokenKey, 'hardcodedTokenForTest');
    }
  }
}

export interface CredentianlsI {
  username: string;
  password: string;
}
