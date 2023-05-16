import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProductListService} from "../../product-list/services/product-list.service";
import {ProductService} from "../services/product.service";

@Component({
	selector: 'app-product',
	templateUrl: 'product.component.html',
	styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

	ngOnInit() {

      this.productService.getProductFromCategoryById().subscribe( data => {
        console.log(data)
      } )
  }
}
