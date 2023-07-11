import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {CartItem, CartList} from '../../../global/entities/cart.interface';
import {Product} from '../../../global/entities/product.interface';
import {Router} from '@angular/router';
import {LocalizerService} from '../../../global/services/localizer.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public cartList: CartList = [];

  public totalPrice = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private localizerService: LocalizerService,
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(this.cartService.cartList$.subscribe(list => {
      this.cartList = list;
      this.totalPrice = this.cartService.getTotalPrice(list);
      this.cdr.detectChanges();
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public removeItemFormCart(product: Product) {
    this.cartService.modifyCart(product, 'remove')
  }

  public goToProduct(item: CartItem) {
    this.router.navigateByUrl(`categories/${this.localizerService.ukrCategoryToEng(item.category)}/${item.id}`);
  }
}
