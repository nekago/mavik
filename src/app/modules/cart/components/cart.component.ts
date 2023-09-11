import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from '../service/cart.service';
import {CartItem, CartList} from '../../../global/entities/cart.interface';
import {CategorySlugNames, Product} from '../../../global/entities/product.interface';
import {Router} from '@angular/router';
import {LocalizerService} from '../../../global/services/localizer.service';
import {Subscription} from 'rxjs';
import {ProductListService} from '../../product-list/services/product-list.service';
import {MobileService} from "../../../global/services/mobile.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  public cartList: CartList = [];

  public totalPrice = 0;

  private subscriptions: Subscription = new Subscription();
  private categorySlug: CategorySlugNames = 'cheese';
  public isMobile!: boolean

  get backToShoppingLink(): string {
    return `/categories/${this.categorySlug}`
  }

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private localizerService: LocalizerService,
    private productListService: ProductListService,
    private mobileService: MobileService,

  ) {
  }

  ngOnInit() {
    this.subscriptions.add(this.cartService.cartList$.subscribe(list => {
      this.cartList = list;
      this.totalPrice = this.cartService.getTotalPrice(list);
      this.cdr.detectChanges();
    }));

    this.subscriptions.add(
      this.mobileService.isMobile$.subscribe(data => {
        this.isMobile = data;
        this.cdr.detectChanges();
      })
    )

    this.categorySlug = this.productListService.categorySlug || 'cheese';
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
