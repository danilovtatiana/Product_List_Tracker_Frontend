import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { MaterialModule } from '../../components/shared/material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../../layout/layout.component';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  // providers: [AuthenticationService],
})
export class AuthenticationModule {}
