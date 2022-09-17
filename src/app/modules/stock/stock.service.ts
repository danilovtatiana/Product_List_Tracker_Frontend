import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from './stock-model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getStockByProductPzn(pzn: string): Observable<Stock> {
    return this.http.get<Stock>(
      `${this.apiServerUrl}/stock/productPzn/${pzn}`,
      { withCredentials: true }
    );
  }
}
