import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

enum ProductFormComponentViewType {
  CreateProduct,
  UpdateProduct,
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  subscriptionList: Subscription[] = [];
  viewType: ProductFormComponentViewType;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) {
    this._createForm(); //trebuie sa am formul cand se initializeaza clasa

    if (_router.url == '/product/add') {
      this.viewType = ProductFormComponentViewType.CreateProduct;
    } else {
      this.viewType = ProductFormComponentViewType.UpdateProduct;
    }
  }

  ngOnInit(): void {
    if (this.viewType == ProductFormComponentViewType.UpdateProduct) {
      //fac asta ca sa nu am formul completat cand dau pe add product
      this.subscriptionList.push(
        this._productService.selectedProduct$.subscribe(
          (productToEdit: Product) => {
            this.productForm.patchValue(productToEdit);
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
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
    if (this.viewType == ProductFormComponentViewType.UpdateProduct) {
      // verific ca sa stiu ce apelez mai departe (update/save)
      this.updateProduct(productToPersist);
    } else {
      this.addNewProductOnServer(productToPersist);
    }
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

  getSubmitButtonTitle(): string {
    switch (+this.viewType) {
      case ProductFormComponentViewType.UpdateProduct: {
        return 'Update product';
      }

      case ProductFormComponentViewType.CreateProduct: {
        return 'Add product';
      }

      default: {
        return 'Add product';
      }
    }
  }

  updateProduct(productToUpdate: Product) {
    this._productService.updateProduct(productToUpdate).subscribe({
      next: (product: Product) => (
        this._router.navigate(['/product']), this.resetForm()
      ),

      error: (error) => console.error(error),
    });
  }

  addNewProductOnServer(productToPersist: Product) {
    //apelex functia care face API call ca sa salvez acest produs pe server
    this._productService.addProduct(productToPersist).subscribe({
      next: (product: Product) => (
        //add succes message
        this._router.navigate(['/product']), this.resetForm()
      ),
      // this._router.navigateByUrl('/product'),
      error: (error) => this.showError(error),
    });
  }
}
