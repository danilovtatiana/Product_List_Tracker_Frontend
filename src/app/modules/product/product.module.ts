import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ProductListComponent],
})
export class ProductModule {}
