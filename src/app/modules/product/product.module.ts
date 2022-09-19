import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
  ],
  exports: [ProductListComponent, ProductFormComponent],
})
export class ProductModule {}
