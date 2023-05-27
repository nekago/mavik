import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from '../../services/product-list.service';
import {
  CategoryNames, CategorySlugNames,
  Product,
} from '../../../../global/entities/product.interface';
import {FilterState} from "../../../../global/entities/filter.inerface";
import {Observable} from "rxjs";
import {FilterService} from "../../services/filter.service";
import {Options} from "@angular-slider/ngx-slider";

@Component({
	selector: 'app-product-list',
	templateUrl: 'product-list.component.html',
	styleUrls: ['product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
	public categoryName: CategoryNames = 'Сир';
	public slugName: CategorySlugNames = 'cheese';
	public productList: Array<Product> = [];

	public pagesCount: number = 1;
	public currentPage: number = 1;

	public params: any = {};

	public pages: Array<number> = [];

	public filterState$: Observable<FilterState> = new Observable<FilterState>();

	minPriceValue: number = 40;
	maxPriceValue: number = 60;
	options: Options = {
		floor: 0,
		ceil: 100,
	};

	constructor(
		private route: ActivatedRoute,
		private productListService: ProductListService,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private filterService: FilterService
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const slug = params['categorySlug'];
			this.productListService.getCategoryBySlug(slug).subscribe(res => {
				this.productList = res.results;
				this.pagesCount = Math.ceil(res.count / res.results.length);
				this.generatePages(this.pagesCount);
				this.cdr.detectChanges();
			});
			this.productListService.setCurrentCategoryBySlug(slug);
		});
		this.productListService.category$.subscribe(data => {
			this.categoryName = data.name;
			this.slugName = data.slug;
		});
		this.filterState$ = this.filterService.filterState$;
		this.filterService.priceSlider$.subscribe(options => {
			this.options = {
				...this.options,
				...options,
			};
			this.maxPriceValue = options.ceil || 0;
			this.minPriceValue = options.floor || 0;
		});
	}



	public changePage(action: 'first' | 'last' | number) {
		if (typeof action === 'number') {
			this.currentPage = action;
		} else {
			switch (action) {
				case 'first':
					this.currentPage = 1;
					return;

				case 'last':
					this.currentPage = this.pagesCount;
					return;
			}
		}

		this.setQueryParams({ ...this.params, page: this.currentPage });
	}

	private setQueryParams(params: any) {
		this.router.navigate([`/categories/${this.slugName}`], {
			queryParams: params,
		});
	}

	private generatePages(pagesNumber: number) {
		for (let i = 0; i < pagesNumber; i++) {
			this.pages.push(i + 1);
		}
	}
}
