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
    quest: string;
		text: string;
		name: string;
		isSelect: boolean;
	}> = [
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Як виник інтернет-магазин "Смаколик" та яка історія стоїть за його відкриттям?',
			text: 'Наш фізичний магазин працював більше 10 років, і ми вирішили розвиватися, запускаючи інтернет-платформу для більшого охоплення та задоволення потреб наших клієнтів.',
			name: 'Смаколик',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Які цінності лежать в основі нашого інтернет-магазину сиру та деликатесів?',
			text: 'Ми прагнемо надавати не лише вишукані продукти, але і неповторний досвід покупок. Співпраця з партнерами виробниками дозволяє нам пропонувати продукцію високої якості, а також забезпечуємо найкращі ціни на ринку.',
			name: 'Смаколик',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Як ми відбираємо сир та масло для наших клієнтів?',
			text: 'Експерти в смаколиках ретельно відбирають найкращі сири та масла, забезпечуючи їхню вишуканість та високу якість через наші партнерські відносини.',
			name: 'Смаколик',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Що робить наш інтернет-магазин унікальним серед інших магазинів сиру та деликатесів?',
			text: 'Унікальність нашого магазину полягає в різноманітній пропозиції та стійких відносинах із партнерами-виробниками сиру та масла, а також в пропозиції найкращих цін на ринку.',
			name: 'Смаколик',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Як ми враховуємо різноманіття смаків у нашому асортименті продуктів?',
			text: 'Ми розуміємо, що кожен клієнт унікальний, тому ми пропонуємо різноманіття смаків та видів сирів та масел, щоб задовольнити найвибагливіші гастрономічні уподобання.',
			name: 'Смаколик',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Як ми гарантуємо якість наших продуктів та їх відповідність стандартам безпеки?',
			text: 'Наш інтернет-магазин пильно слідкує за якістю продуктів та дотримується високих стандартів безпеки, співпрацюючи тільки з надійними постачальниками та виробниками.',
			name: 'Смаколик',
			isSelect: true,
		},
		{
			src: 'assets/icons/review_icon.png',
      quest: 'Як ми стежимо за останніми тенденціями у світі сиру, масла та деликатесів для розширення нашого асортименту?',
			text: 'Ми постійно досліджуємо гастрономічні тенденції, щоб приводити в асортимент нові та захоплюючі продукти, які відповідають сучасним смаковим уподобанням.',
			name: 'Смаколик',
			isSelect: true,
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
