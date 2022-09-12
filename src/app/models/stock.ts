import { Product } from '../modules/product/product-model';

export interface Stock {
  stockId?: number;
  quantity: number;
  price: number;
  product: Product;
}
