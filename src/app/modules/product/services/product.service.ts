import { Injectable } from '@angular/core';
import { ApiService } from '../../../global/services/api.services';
import { Observable} from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(
		private router: Router,
		private apiService: ApiService,
	) {}

	public getProductFromCategoryById(): Observable<any> {
    const url = this.router.url
    const slug = url.split('/')[2]
    const id = url.split('/')[3]
		return this.apiService.get<any>(`categories/${slug}/products/${id}`);
	}
}
