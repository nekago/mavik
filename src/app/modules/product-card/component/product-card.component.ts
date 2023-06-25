import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../global/entities/product.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalizerService} from '../../../global/services/localizer.service';
import {CartService} from '../../cart/service/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localizerService: LocalizerService,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.cartService.cartList$.subscribe((cartList) => {
      if (this.product?.count) {
        this.product.count = this.cartService.isProductInCart(cartList, this.product?.id)
        this.product.in_cart = !!this.cartService.isProductInCart(cartList, this.product?.id)
      }
    });
  }

  public redirectToProductPage() {
    this.activatedRoute.params.subscribe(params => {
      const slug =
        params['categorySlug'] ||
        this.localizerService.ukrCategoryToEng(this.product.category);

      this.router.navigateByUrl(`categories/${slug}/${this.product.id}`);
    });
  }
}
