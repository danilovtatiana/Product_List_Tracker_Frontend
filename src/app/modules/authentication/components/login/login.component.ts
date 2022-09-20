import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { Credentianls } from './credentials-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigate(['/product']);
      }
    });
    this.form = this.formBuilder.group({
      email: ['tatiana.danilov@gmail.com', Validators.required],
      password: ['parolasecreta1', Validators.required],
    });
  }

  onSubmit() {
    const credentianls = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.login(credentianls);
  }

  login(credentianls: Credentianls) {
    this.authService.logIn(credentianls).subscribe({
      next: (response) => {
        this.router.navigate(['/product']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
