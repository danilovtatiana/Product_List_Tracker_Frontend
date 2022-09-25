import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stock } from '../stock-model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.scss'],
})
export class StockUpdateComponent implements OnInit {
  stockForm!: FormGroup;
  subscriptionList: Subscription[] = [];
  stockToEdit?: Stock;
  isEdit = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _stockService: StockService,
    private _router: Router
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this.subscriptionList.push(
      this._stockService.selectedStock$.subscribe((stockToEdit: Stock) => {
        this.stockForm.patchValue(stockToEdit);
        this.stockToEdit = stockToEdit;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }

  submitStockForm() {
    const stockFromForm: Stock = { ...this.stockForm?.getRawValue() };

    if (!!this.stockToEdit) {
      this.stockToEdit!.quantity = stockFromForm.quantity;
      this.stockToEdit.price = stockFromForm.price;
      this.updateStock(this.stockToEdit);
    }
  }

  updateStock(stockToUpdate: Stock) {
    this._stockService.updateStock(stockToUpdate).subscribe({
      next: (stock: Stock) => this._router.navigate(['/stock']),
      error: (error) => console.error(error),
    });
  }

  private _createForm() {
    this.stockForm = this._formBuilder.group({
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  getProductName(): string {
    return this.stockToEdit?.product.productName ?? '';
  }
}
