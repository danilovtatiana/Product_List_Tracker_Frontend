import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  selectedUser$: BehaviorSubject<User> = new BehaviorSubject({
    email: '',
    password: '',
    username: '',
  });

  constructor(private http: HttpClient) {}

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/account/me`, {
      withCredentials: true,
    });
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/account/me`, user, {
      withCredentials: true,
    });
  }
}
