import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) {
    this._createForm(); //trebuie sa am formul cand se initializeaza clasa
  }

  ngOnInit(): void {}

  addNewProductOnServer(productToPersist: Product) {
    //apelex API ca sa salvez acest produs pe server
    this._productService.addProduct(productToPersist).subscribe({
      next: (product: Product) =>
        //add succes message
        this._router.navigate(['/product']),
      // this._router.navigateByUrl('/product'),
      error: (error) => this.showError(error),
    });
  }

  showError(error: HttpErrorResponse) {
    console.error(
      'You can not add a new product because: ',
      error.error.message
    );
  }

  submitProductForm() {
    //se apeleaza cand se apasa butonul de submit
    // creez un obiect de tip Product cu toate entitatile din form
    const productToPersist: Product = { ...this.productForm?.getRawValue() };

    //apelam functia de addNewProductOnServer()

    this.addNewProductOnServer(productToPersist);

    this.resetForm();
  }
  resetForm() {
    this.productForm.reset();
  }

  private _createForm() {
    this.productForm = this._formBuilder.group({
      pzn: ['', Validators.required], // se genereaza automat
      productName: ['', Validators.required],
      supplier: ['', Validators.required],
      strength: ['', [Validators.required]],
      packageSize: ['', Validators.required],
      unit: ['', Validators.required],
    });
  }
}
