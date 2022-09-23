import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AuthenticationRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  // providers: [AuthenticationService],
})
export class AuthenticationModule {}
