import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  imports: [CommonModule, MaterialModule, MatSelectModule],
  exports: [ProductListComponent, ProductFormComponent],
})
export class ProductModule {}
