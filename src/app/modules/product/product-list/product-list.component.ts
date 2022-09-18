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

  dataSource = new MatTableDataSource(this.products); //tabelul trebuie sa-si ia datele de undeva. aici initializez un table datasource caruia ii dau lista de produse
  //se noteaza clasa care rasp de interconectare intre view si date care trebuie afisate
  constructor(
    private http: HttpClient,
    private router: Router,
    private _productService: ProductService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getProducts(); //cand se deschide pagina sa fie incarcata cu produse de pe BE
  }

  public getProducts(): void {
    //apelez API ca sa iau lista de produse din server
    this._productService.getProducts().subscribe({
      next: (response: Product[]) => {
        this.products = response;
        this.dataSource.data = this.products; // tabelul trebuie populat cu date (datele mele e lista de produse)
      },
      error: (error: HttpErrorResponse) => {
        this.authService.logout(); //ar trebui sa se faca logout doar la 401. dar momentan nu am setate bine erorile de pe BE
        console.error(error);
      },
    });
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

  showStock(forProduct: Product) {
    this.goTo('/stock');
    this._productService.selectedProduct$.next(forProduct);
  }

  editProduct(productToEdit: Product) {
    this.goTo('/product/edit/${productToEdit.pzn}'); //trimit spre pagina de edit
    this._productService.selectedProduct$.next(productToEdit); //emit produsul selectat
  }

  deleteProduct(selectedProduct: Product) {
    this._productService
      .deleteProductByPzn(selectedProduct.pzn)
      .subscribe((product) => {
        console.log('The product was deleted', product), this.getProducts();
        // window.location.reload();
      });
  }
}