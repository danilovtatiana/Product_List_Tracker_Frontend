import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LeftPaddingFilterPipe } from 'src/app/pipes/left-padding-filter.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    LeftPaddingFilterPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSelectModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  exports: [ProductListComponent, ProductFormComponent],
  providers: [LeftPaddingFilterPipe],
})
export class ProductModule {}
