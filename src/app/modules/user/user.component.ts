import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from './user-model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  currentUser?: User;
  isShowingMatDrawer = false;
  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,

    private _userService: UserService
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this.getUser();
  }
  private _createForm() {
    this.userForm = this._formBuilder.group(
      {
        email: [],
        username: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.patternValidator(),
            Validators.minLength(8),
            Validators.maxLength(20),
          ]),
        ],
        confirmPassword: [''],
      },
      { validator: this.match('password', 'confirmPassword') }
    );
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

  toggleShowMatDrawer(): boolean {
    if (!!this.currentUser) {
      this.userForm.get('email')?.disable();
      this.userForm.patchValue(this.currentUser!);
    }

    if (!this.isShowingMatDrawer) {
      return (this.isShowingMatDrawer = true);
    } else {
      return (this.isShowingMatDrawer = false);
    }
  }

  getEmail(): string {
    return this.currentUser?.email ?? '';
  }

  getUsername(): string {
    return this.currentUser?.username ?? '';
  }
  onSubmit() {}
}
