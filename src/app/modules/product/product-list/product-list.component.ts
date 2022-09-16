import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/modules/product/product-model';
import { ProductService } from 'src/app/modules/product/product.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  products: Product[] = [];

  displayedColumns: string[] = [
    'PZN',
    'Supplier',
    'Product Name',
    'Strength',
    'Package Size',
    'Unit',
    'Stock',
    'Actions',
  ];

  dataSource = new MatTableDataSource(this.products);

  constructor(
    private http: HttpClient,
    private router: Router,
    private _productService: ProductService,
    private authService: AuthenticationService
  ) {}

  public getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.dataSource.data = this.products;
      },
      error: (error: HttpErrorResponse) => {
        this.authService.logout(); //ar trebui sa se faca logout doar la 401. dar momentan nu am setate bine erorile de pe BE
        console.error(error);
      },
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
