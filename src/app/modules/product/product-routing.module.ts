import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'add',
    component: ProductFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
