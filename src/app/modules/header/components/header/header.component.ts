import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { CartService } from '../../../cart/service/cart.service';
import { MobileService } from '../../../../global/services/mobile.service';
import { HeaderService } from '../../header.service';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
	private headerConfig = {
		pagesToHideBlocks: {
			appMenu: ['main'],
		},
	};

	cartCounter = 0;

	public isHideAppMenu = true;

	private subscriptions: Subscription = new Subscription();

	public burgerIsClose: boolean = true;
	public isMobile!: boolean;

	constructor(
		private router: Router,
		private cartService: CartService,
		private mobileService: MobileService,
		private cdr: ChangeDetectorRef,
		private headerService: HeaderService
	) {}

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
		this.subscriptions.add(
			this.router.events
				.pipe(filter(event => event instanceof NavigationEnd))
				.pipe(map(() => this.router.url))
				.subscribe(url => {
					const pages = url.split('/');
					const page = pages[pages.length - 1];
					this.isHideAppMenu =
						!this.headerConfig.pagesToHideBlocks.appMenu.includes(page);
				})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	public toggleBurger() {
		this.headerService.toggleBurger(!this.burgerIsClose);
	}
}
