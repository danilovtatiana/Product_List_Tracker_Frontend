import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockComponent } from './stock.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [StockComponent],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  exports: [StockComponent],
})
export class StockModule {}
