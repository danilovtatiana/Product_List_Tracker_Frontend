import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          'teste',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        email: [
          'email@ss.tt',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]),
        ],
        password: [
          '12345678',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
          ]),
        ],
        confirmPassword: ['12345678'],
      },
      { validator: this.match('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      const user: User = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
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
        switchMap((returnedUser) =>
          this._authService.logIn({
            email: user.email,
            password: user.password,
          })
        )
      )
      .subscribe({
        next: (response) => this._router.navigate(['/product']),
        error: (error) => console.error(error),
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
}
