import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../product/product-model';
import { ProductService } from '../../product/product.service';
import { Stock } from '../stock-model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  stockForm!: FormGroup;
  isEditable = false;
  subscriptionList: Subscription[] = [];
  productStock?: Stock;

  constructor(
    private _formBuilder: FormBuilder,
    private _stockService: StockService,
    private _productService: ProductService,
    private _router: Router,
    private _dialogRef: MatDialogRef<StockComponent>
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this._changeFormStatus(false);
    this.subscriptionList.push(
      this._productService.selectedProduct$.subscribe((product: Product) => {
        this.getStockByPzn(product.pzn); //apelez stockul cu id produsului
      })
    );
  }

  ngOnDestroy(): void {}

  public getStockByPzn(pzn: string): void {
    this._stockService.getStockByProductPzn(pzn).subscribe({
      next: (response: Stock) => {
        this.productStock = response;
        this.stockForm.patchValue(response);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }
  submitStockForm() {
    if (this.isEditable && !!this.productStock) {
      let stockFromForm: Stock = { ...this.stockForm?.getRawValue() };
      stockFromForm.stockId = this.productStock!.stockId;
      stockFromForm.product = this.productStock!.product;

      this.updateStock(stockFromForm);
    }
    this._changeFormStatus(true);
  }

  private _createForm() {
    this.stockForm = this._formBuilder.group({
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  private _changeFormStatus(isEditable: boolean) {
    this.isEditable = isEditable;

    if (this.isEditable) {
      this.stockForm.enable();
    } else {
      this.stockForm.disable();
    }
  }
  updateStock(stockToUpdate: Stock) {
    this._stockService.updateStock(stockToUpdate).subscribe({
      next: (stock: Stock) => (
        this._changeFormStatus(false), this._dialogRef.close()
      ),
      error: (error) => console.error(error),
    });
  }
  getProductName(): string {
    return this.productStock?.product.productName ?? '';
  }
}
