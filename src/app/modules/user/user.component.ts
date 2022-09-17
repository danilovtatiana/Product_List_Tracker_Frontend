import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from './user-model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser?: User;
  // name: string = '';
  // email: string = '';

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this._userService.getUser().subscribe({
      next: (response: User) => {
        this.currentUser = response;
        // this.email = response.email;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  getEmail(): string {
    return this.currentUser?.email ?? '';
  }

  getUsername(): string {
    return this.currentUser?.username ?? '';
  }
}
