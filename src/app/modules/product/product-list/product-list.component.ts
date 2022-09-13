import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/modules/product/product-model';
import { ProductService } from 'src/app/modules/product/product.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
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

  products: Product[] = [];

  dataSource = new MatTableDataSource(this.products);

  constructor(
    private http: HttpClient,
    private router: Router,
    private productService: ProductService,
    private authService: AuthenticationService
  ) {}

  public getProducts(): void {
    this.productService.getProducts().subscribe({
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

  // loadProducts() {
  //   console.log('List of products');
  // }

  // logout() {
  //   this.http
  //     .post('http://localhost:8001/logout', {}, { withCredentials: true })
  //     .subscribe(
  //       () => {
  //         console.log('Logout Success!');
  //         this.router.navigate(['/']);
  //       },
  //       () => {
  //         this.router.navigate(['/']);
  //       }
  //     );
  // }

  ngOnInit(): void {
    this.getProducts();
  }
}
