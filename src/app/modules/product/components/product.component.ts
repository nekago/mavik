import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../../../global/entities/product.interface';
import {CartService} from '../../cart/service/cart.service';
import {LocalizerService} from '../../../global/services/localizer.service';


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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private localizerService: LocalizerService
  ) {
  }

  ngOnInit() {
    this.productService.getProductFromCategoryById().subscribe(product => {
      this.product = product;

      this.cartService.cartList$.subscribe((cartList) => {
        this.product.count = this.cartService.isProductInCart(cartList, this.product.id)
        this.product.in_cart = !!this.cartService.isProductInCart(cartList, this.product.id)
        this.count = this.product.count || 1
      });
    })

  }

  ngOnDestroy() {
    this.productService.reset()
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
