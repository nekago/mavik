import {Product} from './product.interface';

export interface CartItem extends Product{
}

export type CartList = Array<CartItem>;
