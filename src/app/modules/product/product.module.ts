import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductRoutingModule } from './product-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectModule,
    ProductRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [ProductListComponent, ProductFormComponent],
})
export class ProductModule {}
