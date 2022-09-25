import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/modules/product/product-model';
import { ProductService } from 'src/app/modules/product/product.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { StockDetailsComponent } from '../../stock/stock-details/stock-details.component';
import { StockUpdateComponent } from '../../stock/stock-update/stock-update.component';
import { StockComponent } from '../../stock/stock/stock.component';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  subscriptionList: Subscription[] = [];
  products: Product[] = [];

  displayedColumns: string[] = [
    'Position',
    'PZN',
    'Supplier',
    'Product Name',
    'Strength',
    'Package Size',
    'Unit',
    'Stock',
    'Actions',
  ];

  dataSource = new MatTableDataSource<Product>(this.products); //tabelul trebuie sa-si ia datele de undeva. aici initializez un table datasource caruia ii dau lista de produse
  //se noteaza clasa care rasp de interconectare intre view si date care trebuie afisate

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private _productService: ProductService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private _dialogService: ConfirmDialogService
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
    // this.goTo('/stock');
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    this.dialog.open(StockComponent, dialogConfig);
    this._productService.selectedProduct$.next(forProduct);
  }

  editProduct(productToEdit: Product) {
    this._productService.selectedProduct$.next(productToEdit); //emit produsul selectat
    // this.goTo('/product/edit/${productToEdit.pzn}');

    this.router.navigate([`/product/edit/${productToEdit.pzn}`]); //trimit spre pagina de edit
  }

  deleteProduct(selectedProduct: Product) {
    this._productService
      .deleteProductByPzn(selectedProduct.pzn)
      .subscribe((product) => {
        console.log('The product was deleted', product), this.getProducts();
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  openDeleteDialog(selectedProduct: Product) {
    const options = {
      title: 'Are you sure you want to delete this product?',
      message: 'Selected product will be permanently deleted from catalog.',
      cancelText: 'Cancel',
      confirmText: 'Delete',
    };

    this._dialogService.open(options);

    this._dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct(selectedProduct);
      }
    });
  }
}
