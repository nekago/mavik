import { Injectable } from '@angular/core';
import { ApiService } from '../../../global/services/api.services';
import {filter, Observable, Subscription} from 'rxjs';
import { ProductListService } from '../../product-list/services/product-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(
		private router: Router,
		private apiService: ApiService,
		private productListService: ProductListService
	) {}

	public getProductFromCategoryById(): Observable<any> {
    const url = this.router.url
    const slug = url.split('/')[2]
    const id = url.split('/')[3]
    console.log(this.productListService.categorySlug)
		return this.apiService.get<any>(`categories/${slug}/products/${id}`);
	}
}
