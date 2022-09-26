import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged$: Observable<boolean>;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _dialogService: ConfirmDialogService
  ) {
    this.isLogged$ = this._authService.isLogged$;
  }

  ngOnInit(): void {}
  logout() {
    this._authService.logout();
  }

  openLogoutDialog() {
    const options = {
      title: 'Are you sure you want to logout?',
      message: 'You will be return to the login screen.',
      cancelText: 'Cancel',
      confirmText: 'Log out',
    };

    this._dialogService.open(options);

    this._dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.logout();
      }
    });
  }
}
