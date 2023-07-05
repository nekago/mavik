import { AfterViewInit, Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {CartService} from '../../../cart/service/cart.service';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  private headerConfig = {
    pagesToHideBlocks: {
      appMenu: ['main']
    }
  }

  cartCounter = 0

  public isHideAppMenu = true

	constructor(
    private router: Router,
    private cartService: CartService,
  ) {}

	ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).pipe(
      map(() => this.router.url)
    ).subscribe(url => {
      const pages = url.split('/')
      const page = pages[pages.length - 1]
      this.isHideAppMenu = !this.headerConfig.pagesToHideBlocks.appMenu.includes(page)
    })

    this.cartService.cartList$.subscribe(data => {
      this.cartCounter = data.length;
    })
  }

}
