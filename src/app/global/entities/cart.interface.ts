import {CategoryNames} from './product.interface';

export interface CartItem {
  id: number;
  category: CategoryNames;
  name: string;
  price: string;
  sale_price: string,
  image: string;
  count: number
}

export type CartList = Array<CartItem>;
