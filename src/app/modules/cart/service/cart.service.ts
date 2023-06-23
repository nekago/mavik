import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartList} from '../../../global/entities/cart.interface';
import {Product} from '../../../global/entities/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: BehaviorSubject<CartList> = new BehaviorSubject<CartList>([]);
  public cartList$: Observable<CartList> = this.cartList.asObservable();

  constructor() {
  }

  modifyCart(product: Product, type: 'add' | 'remove' | 'edit', count: number | string = 1) {
    const prevCartList = this.cartList.getValue();

    if (type === 'add') {
      this.cartList.next(
        this.addProductToCart(prevCartList, product, Number(count))
      );
    } else {
      const id = prevCartList.findIndex(item => item.id === id);

      if (type === 'remove') {
        this.cartList.next(
          this.removeProductFromCart(prevCartList, id)
        );
      } else {
        this.cartList.next(
          this.editProductInCart(prevCartList, id, count)
        )
      }
    }

  }

  public addProductToCart(
    prevCartList: CartList,
    {
      category,
      id,
      image,
      name,
      price,
      sale_price,
    }: Product, count: number): CartList {

    prevCartList.push({
      category,
      id,
      image,
      name,
      price,
      sale_price,
      count
    });

    return prevCartList;
  }

  public removeProductFromCart(prevCartList: CartList, id: number): CartList {
    return prevCartList.splice(id, 1);
  }

  public editProductInCart(prevCartList: CartList, id: number, count: number | string): CartList {
    const item = prevCartList[id];
    const modCount = Number(count);

    if (typeof count === 'string') {
      item.count += modCount;
    } else {
      item.count = modCount;
    }

    return prevCartList;
  }
}
