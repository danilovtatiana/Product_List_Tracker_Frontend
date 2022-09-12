import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isLogged$ = this.authService.isLogged$;
  }

  ngOnInit(): void {}
}
