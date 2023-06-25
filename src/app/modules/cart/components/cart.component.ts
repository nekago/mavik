import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {CartList} from '../../../global/entities/cart.interface';
import {Product} from '../../../global/entities/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: CartList = [];


  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.cartService.cartList$.subscribe(list => {
      this.cartList = list;
      this.cdr.detectChanges();
    })
  }

  public removeItemFormCart(product: Product) {
    this.cartService.modifyCart(product, 'remove')
  }

}
