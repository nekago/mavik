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

  public getCartList(): CartList {
    return this.cartList.getValue();
  }

  public getTotalPrice(cartList?: CartList): number {
    cartList = cartList || this.getCartList();
    let totalPrice = 0;

    for (let i = 0; i < cartList.length; i++) {
      const item = cartList[i];
      const sum = item.count * (+item.sale_price || +item.price)
      totalPrice += sum
    }

    return totalPrice;
  }

  public setCartListFromLocalStorage() {
    const cartList = JSON.parse(window.localStorage.getItem('cartList') || '');
    this.cartList.next(cartList)
  }

  public isProductInCart(cartList: CartList, id: number): number {
    for (let i = 0; i < cartList.length; i++) {
      const item = cartList[i];
      if (item.id === id) {
        return item.count;
      }
    }
    return 0
  }

  public modifyCart(product: Product, type: 'add' | 'remove' | 'edit', count: number | string = 1) {
    const prevCartList = this.cartList.getValue();

    if (type === 'add') {
      this.cartList.next(
        CartService.addProductToCart(prevCartList, product, Number(count))
      );
    } else {
      const id = prevCartList.findIndex(item => item?.id === product.id);

      if (type === 'remove') {

        this.cartList.next(
          CartService.removeProductFromCart(prevCartList, id)
        );
      } else {
        this.cartList.next(
          CartService.editProductInCart(prevCartList, id, count)
        )
      }
    }

    window.localStorage.setItem('cartList', JSON.stringify(this.cartList.value))
  }

  private static addProductToCart(
    prevCartList: CartList,
    product: Product,
    count: number): CartList {

    prevCartList.push({...product, in_cart: true, count: count || 1});

    return prevCartList;
  }

  private static removeProductFromCart(prevCartList: CartList, id: number): CartList {
    prevCartList.splice(id, 1);
    return prevCartList;
  }

  private static editProductInCart(prevCartList: CartList, id: number, count: number | string): CartList {
    const item = prevCartList[id];
    const modCount = Number(count);

    if (typeof count === 'string') {
      item.count += modCount;
    } else {
      if (!item?.count) {
        item.count = 0;
      }
      item.count = modCount;
    }

    return prevCartList;
  }
}
