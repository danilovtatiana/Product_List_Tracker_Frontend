import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StockRoutingModule } from './stock-routing.module';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [StockDetailsComponent, StockUpdateComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  exports: [StockDetailsComponent, StockUpdateComponent],
})
export class StockModule {}
