import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user/user-model';
import { Credentianls } from './components/login/credentials-model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiServerUrl = environment.apiBaseUrl;
  readonly isLoggedKey = 'isLogged';

  isLogged$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    //check if user has saved token in local storage
    const hasToken = window.localStorage.getItem(this.isLoggedKey);
    if (!!hasToken) {
      this.isLogged$ = new BehaviorSubject<boolean>(true);
    } else {
      this.isLogged$ = new BehaviorSubject<boolean>(false);
    }
  }

  public createAccount(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/account/register`, user, {
      withCredentials: true,
    });
  }

  public logIn(credentianls: Credentianls): Observable<HttpResponse<string>> {
    const formData = new FormData();

    formData.append('username', credentianls.email);
    formData.append('password', credentianls.password);

    const url: string = `${this.apiServerUrl}/login`;

    return this.http
      .post(url, formData, {
        responseType: 'text',
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        //iau raspunsul de la obs si aplic operatorul tap.
        tap((response) => {
          // tap == asculta ce date trec prin observable
          if (response.ok) {
            // daca raspunsul e ok atunci salvez local ca user-ul e logat
            this.isLogged = true;
            this.isLogged$.next(true);
          }
        })
      );
  }

  logout() {
    this.isLogged$.next(false);
    this.isLogged = false;
    //delete cookie
    this.router.navigate(['/login']);
  }

  get isLogged(): boolean {
    const isLogged = window.localStorage.getItem(this.isLoggedKey);
    return !!isLogged;
  }

  set isLogged(state: boolean) {
    if (!state) {
      window.localStorage.removeItem(this.isLoggedKey);
    } else {
      window.localStorage.setItem(this.isLoggedKey, 'true');
    }
  }
}
