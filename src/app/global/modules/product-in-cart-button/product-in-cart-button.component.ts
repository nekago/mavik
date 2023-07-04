import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product.interface';
import {CartService} from '../../../modules/cart/service/cart.service';

@Component({
  selector: 'app-product-in-cart-button',
  templateUrl: './product-in-cart-button.component.html',
  styleUrls: ['./product-in-cart-button.component.scss']
})
export class ProductInCartButtonComponent implements OnInit {

  @Input() product!: Product;
  @Input() isLargeButton: boolean = false;

  constructor(
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
  }

  public addProductToCart() {
    this.cartService.modifyCart(this.product, 'add', this.product.count);
    this.product.in_cart = true;
  }
}
