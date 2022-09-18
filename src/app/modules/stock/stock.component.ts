import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product/product-model';
import { ProductService } from '../product/product.service';
import { Stock } from './stock-model';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  productStock?: Stock;
  constructor(
    private _stockService: StockService,
    private _productService: ProductService
  ) {
    //
  }

  ngOnInit(): void {
    this.subscriptionList.push(
      this._productService.selectedProduct$.subscribe((product: Product) => {
        this.getStockByPzn(product.pzn); //apelez stockul cu id produsului
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
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
    // return this.productStock?.quantity ?? 0;

    if (this.productStock === undefined) {
      return 0;
    } else {
      return this.productStock.quantity;
    }
  }

  getPrice(): number {
    return this.productStock?.price ?? 0;
  }
}
