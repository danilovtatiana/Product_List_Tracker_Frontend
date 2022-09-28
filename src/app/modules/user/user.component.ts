import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomvalidationService } from 'src/app/shared/validators/custom-validation.service';
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

    private _userService: UserService,
    private _customValidator: CustomvalidationService,
    private _snackBar: MatSnackBar
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this.getUser();

    //disable temporary. missing api
    this.userForm.get('oldPassword')?.disable();
    this.userForm.get('password')?.disable();
    this.userForm.get('confirmPassword')?.disable();
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
        oldPassword: [''],
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

  updateUser(userToUpdate: User) {
    this._userService.updateUser(userToUpdate).subscribe({
      next: (user: User) => (
        this._snackBar.open('User details successfully updated', 'OK', {
          duration: 5000,
        }),
        (this.currentUser = user)
      ),

      error: (error) => {
        console.error(error.error);
        this._snackBar.open(error.error, 'Try again!', {
          duration: 5000,
        });
      },
    });
  }

  submitUserForm() {
    if (this.userForm.valid) {
      let userToUpdate: User = { ...this.userForm?.getRawValue() };

      this.updateUser(userToUpdate);
    }
  }
}
