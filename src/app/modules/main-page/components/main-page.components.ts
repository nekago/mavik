import {ChangeDetectorRef, Component,  OnDestroy, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { map, Observable, Subscription } from 'rxjs';
import {
	Categories,
	Product,
} from '../../../global/entities/product.interface';
import { ActivatedRoute } from '@angular/router';
import { MainPageService } from '../services/main-page.service';
import { FilterService } from '../../product-list/services/filter.service';
import { BestSellerService } from '../services/best-seller.service';
import { HeaderService } from '../../header/header.service';
import {MobileService} from "../../../global/services/mobile.service";

@Component({
	selector: 'app-main-page',
	templateUrl: 'main-page.component.html',
	styleUrls: ['main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
	public categories!: Categories;
	public bestSellers: Product[] = [];

	private subscriptions: Subscription = new Subscription();

	public displayCount: number = 6;

	public isBurgerClose$: Observable<boolean> = new Observable<boolean>();
  public isMobile!: boolean

	constructor(
		private mainPageService: MainPageService,
		private bestSellerService: BestSellerService,
		private route: ActivatedRoute,
		private filterService: FilterService,
		private headerService: HeaderService,
    private mobileService: MobileService,
    private cdr: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.subscriptions.add(
			this.mainPageService.getCategories().subscribe(data => {
				this.categories = data;
			})
		);

		this.subscriptions.add(
			this.bestSellerService
				.bestSellers$()
				.pipe(
					map(data => {
						return data.results;
					})
				)
				.subscribe(data => {
					this.bestSellers = data;
				})
		);
    this.subscriptions.add(
      this.mobileService.isMobile$.subscribe(data => {
        this.isMobile = data;
        this.cdr.detectChanges();
      })
    )

    this.isBurgerClose$ = this.headerService.burgerIsClose$

		this.filterService.reset(true);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	slides: Array<{
		src: string;
		text: string;
		name: string;
		isSelect: boolean;
	}> = [
		{
			src: 'assets/icons/review_icon.png',
			text: 'Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.',
			name: 'Dmitriy Ivanov',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
			text: 'Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.',
			name: 'Dmitriy Ivanov',
			isSelect: false,
		},
		{
			src: 'assets/icons/review_icon.png',
			text: 'Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.',
			name: 'Dmitriy Ivanov',
			isSelect: false,
		},
		{
			src: 'assets/icons/review_icon.png',
			text: 'Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.',
			name: 'Dmitriy Ivanov',
			isSelect: false,
		},
		{
			src: 'assets/icons/review_icon.png',
			text: 'Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu. Lorem ipsum dolor sit amet consectetur. Duis odio velit massa sit amet feugiat et eu.',
			name: 'Dmitriy Ivanov',
			isSelect: false,
		},
	];

	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: true,
		navSpeed: 700,
		items: 1,
		nav: false,
		responsive: {
			0: {
				items: 1,
			},
		},
	};
}
