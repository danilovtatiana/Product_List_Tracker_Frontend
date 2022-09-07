import { Product } from './product';

export interface Stock {
  stockId?: number;
  quantity: number;
  price: number;
  product: Product;
}
