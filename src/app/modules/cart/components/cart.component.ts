import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {Observable} from 'rxjs';
import {CartList} from '../../../global/entities/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList$: Observable<CartList> = new Observable<CartList>();


  constructor(
    public cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.cartList$ = this.cartService.cartList$;
  }

}
