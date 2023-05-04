import {Injectable} from "@angular/core";
import {ApiService} from "../../../global/services/api.services";
import {Categories, CategoriesParams} from "../../../global/entities/product.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductListService {

  constructor(private apiService: ApiService) {}

  public getCategoryByName(
    params: CategoriesParams
  ): Observable<Categories>{
    return this.apiService.get<Categories>("categories/")
  }

}
