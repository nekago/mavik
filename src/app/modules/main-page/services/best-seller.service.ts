import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../global/entities/product.interface';
import {ApiService} from '../../../global/services/api.services';

@Injectable({
  providedIn: 'root'
})
export class BestSellerService {

  constructor(
    private apiService: ApiService,
  ) {
  }

  public bestSellers$(): Observable<{ results: Product[] }> {
    return this.apiService.get<{results: Product[] }>('bestseller/')
  }

}
