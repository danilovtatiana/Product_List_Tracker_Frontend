import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../product/product-model';
import { ProductService } from '../../product/product.service';
import { Stock } from '../stock-model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
})
export class StockDetailsComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  productStock?: Stock;
  constructor(
    private _stockService: StockService,
    private _productService: ProductService,
    private _router: Router
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
  editStock() {
    if (!!this.productStock) {
      this._router.navigate(['stock/edit/:id']);
      this._stockService.selectedStock$.next(this.productStock!);
    }
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
