import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardMdImage, MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
