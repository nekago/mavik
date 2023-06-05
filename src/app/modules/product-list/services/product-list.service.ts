import { Injectable } from '@angular/core';
import { ApiService } from '../../../global/services/api.services';
import {
	Category,
	CategorySlugNames,
} from '../../../global/entities/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainPageService } from '../../main-page/services/main-page.service';
import { ProductListInterface } from '../../../global/entities/product-list.interface';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from './filter.service';

@Injectable({
	providedIn: 'root',
})
export class ProductListService {
	private category: BehaviorSubject<Category> = new BehaviorSubject<Category>(
		{} as Category
	);
	public category$: Observable<Category> = this.category.asObservable();

	private productList: BehaviorSubject<ProductListInterface> =
		new BehaviorSubject<ProductListInterface>({} as ProductListInterface);
	public productList$: Observable<ProductListInterface> =
		this.productList.asObservable();


	public get categorySlug(): CategorySlugNames {
		return this.category.getValue().slug;
	}

	constructor(
		private apiService: ApiService,
		private mainPageService: MainPageService,
		private route: ActivatedRoute,
		private filterService: FilterService
	) {}

	public getProductListBySlug(
		slug: CategorySlugNames
	) {
		this.apiService.get<ProductListInterface>(
			`categories/${slug}/products/`,
      this.filterService.queryParamsValueToString(this.filterService.params)
		).subscribe(data => {
      this.productList.next(data)
    });
	}

	public setCurrentCategoryBySlug(slug: CategorySlugNames) {
		if (!this.mainPageService.hasCategories) {
			this.mainPageService.getCategories().subscribe();
		}
		this.apiService.get<Category>(`categories/${slug}/`).subscribe(category => {
			const filters = category.filters;
			if (filters) {
				this.category.next(category);
				if (slug !== this.filterService.filterStateCategory) {
					this.filterService.reset();
					this.filterService.initFilterState(filters, slug);
				}
			}
		});
	}
}
