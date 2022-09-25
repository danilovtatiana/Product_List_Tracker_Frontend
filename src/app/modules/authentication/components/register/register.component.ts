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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          'tatiana',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]),
        ],
        email: [
          'tatiana.danilov@gmail.com',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]),
        ],
        password: [
          'parolasecreta3',
          Validators.compose([
            Validators.required,
            this.patternValidator(),
            Validators.minLength(8),
            Validators.maxLength(20),
          ]),
        ],
        confirmPassword: ['parolasecreta3'],
      },
      { validator: this.match('password', 'confirmPassword') }
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

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
  patternValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$'
      );

      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
