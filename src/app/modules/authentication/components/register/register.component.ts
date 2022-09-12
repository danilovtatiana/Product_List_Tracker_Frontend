import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: [
        '',
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
      password: [
        '',
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ],
    });
  }

  onSubmit() {
    //fac un obiect care contine user si password
    const credentianls = {
      username: this.form.value.username,
      password: this.form.value.password,
    };
  }
}
