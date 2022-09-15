import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './stock.component';

const stockRoutes: Routes = [
  {
    path: '',
    component: StockComponent,
  },
  {
    path: 'edit/:id',
    component: StockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(stockRoutes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
