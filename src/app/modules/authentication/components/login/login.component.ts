import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { Credentianls } from './credentials-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigate(['/product']);
      }
    });
    this.loginForm = this.formBuilder.group({
      email: [
        'tatiana.danilov@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['parolasecreta1', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentianls = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.login(credentianls);
    }
  }

  login(credentianls: Credentianls) {
    this.authService.logIn(credentianls).subscribe({
      next: (response) => {
        this.router.navigate(['/product']);
      },
      error: (error) => {
        // console.error(error);
        this._snackBar.open('Bad Credentials', 'Try again!', {
          duration: 5000,
        });
      },
    });
  }
}
