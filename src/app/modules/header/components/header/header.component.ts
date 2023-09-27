import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {map, Subscription} from 'rxjs';
import {CartService} from '../../../cart/service/cart.service';
import {MobileService} from '../../../../global/services/mobile.service';
import {HeaderService} from '../../header.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private headerConfig = {
    pagesToShowBlocks: {
      navMenu: ['main'],
    },
  };

  private currentPage: string = '';

  cartCounter = 0;

  public isHideNavMenu = true;
  public isHideSearch = true;

  private subscriptions: Subscription = new Subscription();

  public burgerIsClose: boolean = true;
  public isMobile!: boolean;

  constructor(
    private router: Router,
    private cartService: CartService,
    private mobileService: MobileService,
    private cdr: ChangeDetectorRef,
    private headerService: HeaderService
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.cartService.cartList$.subscribe(data => {
        this.cartCounter = data.length;
      })
    );

    this.subscriptions.add(
      this.mobileService.isMobile$.subscribe(data => {
        this.isMobile = data;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.headerService.burgerIsClose$.subscribe(state => {
        this.burgerIsClose = state
      })
    );
  }

  ngAfterViewInit() {
    this.toggleDisplayingBlocks(this.router.url)
    this.subscriptions.add(
      this.router.events
        .pipe(map(() => this.router.url))
        .subscribe(url => this.toggleDisplayingBlocks(url))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public toggleBurger() {
    this.headerService.toggleBurger(!this.burgerIsClose);
  }

  scrollHandler() {
    if (this.currentPage === 'main') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      this.router.navigateByUrl('/')
    }
  }

  private toggleDisplayingBlocks(url: string) {
    const pages = url.split('/');
    const page = pages[pages.length - 1];
    this.currentPage = page;
    this.isHideNavMenu =
      !this.headerConfig.pagesToShowBlocks.navMenu.includes(page);
    this.isHideSearch = !(pages[1] === 'categories' && !Number(pages[pages.length - 1]))
  }
}
