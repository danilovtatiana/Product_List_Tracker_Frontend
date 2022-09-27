import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Unit } from 'src/app/enums/unit.enum';
import { LeftPaddingFilterPipe } from 'src/app/pipes/left-padding-filter.pipe';
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

  unitOptions = Object.entries(Unit).map(([key, value]) => ({
    key,
    value,
  }));

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _leftPadding: LeftPaddingFilterPipe
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
            this.productForm.get('pzn')?.disable();
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
    if (this.productForm.valid) {
      const productToPersist: Product = { ...this.productForm?.getRawValue() };
      productToPersist.pzn = this._leftPadding.transform(productToPersist.pzn);

      //apelam functia de addNewProductOnServer()
      if (this.viewType == ProductFormComponentViewType.UpdateProduct) {
        // verific ca sa stiu ce apelez mai departe (update/save)
        this.updateProduct(productToPersist);
      } else {
        this.addNewProductOnServer(productToPersist);
      }
    }
  }
  resetForm() {
    this.productForm.reset();
  }

  private _createForm() {
    this.productForm = this._formBuilder.group({
      pzn: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(8),
        ]),
      ],
      productName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      supplier: ['', Validators.maxLength(100)],
      strength: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      packageSize: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      unit: ['', Validators.required],
    });
  }

  getSubmitButtonTitle(): string {
    switch (this.viewType) {
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
        this._snackBar.open('Product successfully updated', 'OK', {
          duration: 5000,
        }),
        this._router.navigate(['/product']),
        this.resetForm()
      ),

      error: (error) => console.error(error),
    });
  }

  addNewProductOnServer(productToPersist: Product) {
    //apelex functia care face API call ca sa salvez acest produs pe server
    this._productService.addProduct(productToPersist).subscribe({
      next: (product: Product) => (
        this._snackBar.open('Product successfully added', 'OK', {
          duration: 5000,
        }),
        this._router.navigate(['/product']),
        this.resetForm()
      ),
      // this._router.navigateByUrl('/product'),
      error: (error) => this.showError(error),
    });
  }
  cancel() {
    this._router.navigate(['product']);
  }
}
