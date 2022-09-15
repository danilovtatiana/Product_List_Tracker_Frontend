import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private _router: Router
  ) {
    this.isLogged$ = this._authService.isLogged$;
  }

  ngOnInit(): void {}

  onLogout() {
    this._authService.logout();
  }

  goTo(path: string): void {
    this._router.navigate([path]);
  }
}
