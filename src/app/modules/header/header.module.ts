import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent],
  providers: [ConfirmDialogService],
})
export class HeaderModule {}
