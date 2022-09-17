import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from './stock-model';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  productStock?: Stock;
  constructor(private _stockService: StockService) {}

  ngOnInit(): void {
    this.getStockByPzn('00286212');
  }

  public getStockByPzn(pzn: string): void {
    this._stockService.getStockByProductPzn(pzn).subscribe({
      next: (response: Stock) => {
        this.productStock = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  getQuantity(): number {
    return this.productStock?.quantity ?? 0;
  }

  getPrice(): number {
    return this.productStock?.price ?? 0;
  }
}
