import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { User } from 'src/app/modules/user/user-model';
import { CustomvalidationService } from 'src/app/shared/validators/custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _customValidator: CustomvalidationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this._customValidator.patternValidator(),
            Validators.minLength(8),
            Validators.maxLength(20),
          ]),
        ],
        confirmPassword: [''],
      },
      {
        validator: this._customValidator.matchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      //apelez functia de create account din serviciu
      this._register(user);
    }
  }

  //private func register(account) si o sa faca call spre api
  private _register(user: User) {
    this._authService
      .createAccount(user)
      .pipe(
        //chain request (dupa register apelez login)
        switchMap(
          (
            returnedUser //transforma datele ce trec prin observalbe
          ) =>
            this._authService.logIn({
              email: user.email,
              password: user.password,
            })
        )
      )
      .subscribe({
        next: (response) => this._router.navigate(['/product']),
        error: (error) => {
          console.error(error.error);
          this._snackBar.open(error.error, 'Try again!', {
            duration: 5000,
          });
        },
      });
  }
}
