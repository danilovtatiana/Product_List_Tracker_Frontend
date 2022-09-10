import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  // public products: Product[] = [];
  // constructor(
  //   private http: HttpClient,
  //   private router: Router,
  //   private productService: ProductService
  // ) {}

  // public getProducts(): void {
  //   this.productService.getProducts().subscribe(
  //     (response: Product[]) => {
  //       this.products = response;
  //       // console.log("List");
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

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
    // this.getProducts();
  }
}
