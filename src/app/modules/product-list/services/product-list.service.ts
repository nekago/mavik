import {Injectable} from "@angular/core";
import {ApiService} from "../../../global/services/api.services";

@Injectable({
  providedIn: 'root'
})

export class ProductListService {

  constructor(private apiService: ApiService) {}



}
