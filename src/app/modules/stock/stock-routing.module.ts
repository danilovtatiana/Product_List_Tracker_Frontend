import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';

const stockRoutes: Routes = [
  {
    path: '',
    component: StockDetailsComponent,
  },
  {
    path: 'edit/:id',
    component: StockUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(stockRoutes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
