import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockComponent } from './stock.component';
import { MatButtonModule } from '@angular/material/button';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StockRoutingModule,
  ],
  exports: [StockComponent],
})
export class StockModule {}
