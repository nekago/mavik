import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';
import {CartService} from '../../../cart/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private headerConfig = {
    pagesToHideBlocks: {
      appMenu: ['main']
    }
  }

  cartCounter = 0

  public isHideAppMenu = true

  private subscriptions: Subscription = new Subscription()

  constructor(
    private router: Router,
    private cartService: CartService,
  ) {
  }

  ngAfterViewInit() {
    this.subscriptions.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).pipe(
      map(() => this.router.url)
    ).subscribe(url => {
      const pages = url.split('/')
      const page = pages[pages.length - 1]
      this.isHideAppMenu = !this.headerConfig.pagesToHideBlocks.appMenu.includes(page)
    }))

    this.subscriptions.add(this.cartService.cartList$.subscribe(data => {
      this.cartCounter = data.length;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
