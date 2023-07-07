import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../entities/product.interface';
import {CartService} from '../../../modules/cart/service/cart.service';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss']
})
export class ProductCounterComponent implements OnInit {
  @Input() product!: Product;
  @Input() count = 1;

  @Input() isDelete = false

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  public plus() {
    this.count = this.count < 1000 ? this.count + 1 : this.count;
    this.product.count = this.count
    this.toggleProductInCart();
  }

  public minus() {
    // if (this.isDelete && this.count <= 1) {
    //   this.removeProductFromCart();
    //   return;
    // }
    this.count = this.count > 1 ? this.count - 1 : this.count;
    this.product.count = this.count
    this.toggleProductInCart();
  }

  public countValueValidator() {
    if (this.count < 1) {
      if (this.isDelete) {
        this.count = 1;
        this.removeProductFromCart();
        return;
      }
      this.count = 1;
      return;
    }

    if (this.count > 999) {
      this.count = 999;
    }

    this.product.count = this.count

    this.toggleProductInCart();
  }

  private toggleProductInCart() {
    if (this.product.in_cart) {
      this.cartService.modifyCart(this.product, 'edit', this.count);
    }
  }

  private removeProductFromCart() {
    if (confirm('Remove from cart?')) {
      this.cartService.modifyCart(this.product, 'remove');
    }
  }


}
