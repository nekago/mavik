import {Injectable} from "@angular/core";
import {ApiService} from "../../../global/services/api.services";
import {Categories} from "../../../global/entities/product.interface";
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainPageService {

  private categories: BehaviorSubject<Categories> =
    new BehaviorSubject<Categories>({} as Categories);
  public categories$: Observable<Categories> =
    this.categories.asObservable();

  public get hasCategories(): boolean {
    return !!Object.keys(this.categories.getValue())?.length
  }

  constructor(private apiService: ApiService) {}

  public getCategories(): Observable<Categories> {
    return this.apiService.get<{results:Categories}>("categories/").pipe(
      map(data => {
        this.categories.next(data.results)
        return data.results
      })
    )
  }
}
