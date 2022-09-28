import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidationService {
  constructor() {}

  matchPassword(password: string, confirmPassword: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const passwordControl = controls.get(password);
      const confirmPasswordControl = controls.get(confirmPassword);

      if (
        confirmPasswordControl?.errors &&
        !confirmPasswordControl.errors['matching']
      ) {
        return null;
      }

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        controls.get(confirmPassword)?.setErrors({ matching: true });
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
