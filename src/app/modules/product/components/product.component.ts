import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../../../global/entities/product.interface';
import {CartService} from '../../cart/service/cart.service';
import {LocalizerService} from '../../../global/services/localizer.service';
import {Subscription} from 'rxjs';
import {MobileService} from "../../../global/services/mobile.service";


@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly productCharacteristicsField: Array<string> = ['brand', 'country']


  public product!: Product;
  public count: number = 1;
  public selectedTab: string = 'Опис'

  private subscriptions: Subscription = new Subscription();

  public isMobile!: boolean

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private localizerService: LocalizerService,
    private mobileService: MobileService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    // TODO: cartService.getCartList()
    this.subscriptions.add(this.productService.getProductFromCategoryById().subscribe(product => {
      this.product = product;

      this.subscriptions.add(this.cartService.cartList$.subscribe((cartList) => {
        this.product.count = this.cartService.isProductInCart(cartList, this.product.id)
        this.product.in_cart = !!this.cartService.isProductInCart(cartList, this.product.id)
        this.count = this.product.count || 1
      }))
    }))

    this.subscriptions.add(
      this.mobileService.isMobile$.subscribe(data => {
        this.isMobile = data;
        this.cdr.detectChanges();
      })
    )

  }

  ngOnDestroy() {
    this.productService.reset()
    this.subscriptions.unsubscribe();
  }

  public toggleTab(tab: string) {
    this.selectedTab = tab
  }

  public productCharacteristics(): Array<[any, any]> {
    const productCharacteristics: Array<[any, any]> = []

    for (const key in this.product) {

      if (this.productCharacteristicsField.includes(key)) {
        productCharacteristics.push([this.localizerService.productCharacteristicsFieldToUkr(key), this.product[key as keyof Product]])
      }

    }

    for (const feature of this.product.features) {
      productCharacteristics.push([feature.type, feature.value]);
    }

    return productCharacteristics
  }
}
