import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/all`, {
      withCredentials: true,
    });
  }

  public getProductByPzn(pzn: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiServerUrl}/product/${pzn}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/product/add`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiServerUrl}/product/update`,
      product
    );
  }
  public deleteProduct(pzn: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/product/delete/${pzn}`);
  }
}
