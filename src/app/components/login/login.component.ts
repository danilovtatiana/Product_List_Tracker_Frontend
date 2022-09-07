import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showRegister = false;
  showError = false;

  username: String = '';
  password: String = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const formData = new FormData();
    formData.append('username', this.username.toString());
    formData.append('password', this.password.toString());

    this.http
      .post('http://localhost:8001/login', formData, {
        responseType: 'text',
        observe: 'response',
        withCredentials: true,
      })
      .subscribe(
        (r) => {
          console.log('Login Success!');
          this.router.navigate(['/products']);
        },
        (error) => {
          this.showError = true;
        }
      );
  }

  showLogin() {
    return !window.location.href.includes('products');
  }
  ngOnInit(): void {}
}
