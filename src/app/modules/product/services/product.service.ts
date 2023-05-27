import { Injectable } from '@angular/core';
import { ApiService } from '../../../global/services/api.services';
import {BehaviorSubject, Observable} from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
  private product: BehaviorSubject<any> = new BehaviorSubject<any>('')
  public product$: Observable<any> = this.product.asObservable()

  get productName(): string {
    return this.product.getValue().name
  }

	constructor(
		private router: Router,
		private apiService: ApiService,
	) {}

	public getProductFromCategoryById(): Observable<any> {
    const url = this.router.url
    const slug = url.split('/')[2]
    const id = url.split('/')[3]
    const product = this.apiService.get<any>(`categories/${slug}/products/${id}/`);

    product.subscribe(product => {
      this.product.next(product)
    })

		return product
	}

  public reset() {
    this.product.next({})
  }
}
