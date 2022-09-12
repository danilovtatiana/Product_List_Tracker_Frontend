import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiServerUrl = environment.apiBaseUrl;
  // isLogged: boolean = false;
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

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

  get isLogged(): boolean {
    const isLogged = window.localStorage.getItem('token');
    return !!isLogged;
  }

  set isLogged(state: boolean) {
    if (!state) {
      window.localStorage.removeItem('token');
    }
    window.localStorage.setItem('token', 'bhaZjFQfct41TIGYslJjbg');
  }
}

export interface CredentianlsI {
  username: string;
  password: string;
}
