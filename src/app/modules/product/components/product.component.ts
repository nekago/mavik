import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
	selector: 'app-product',
	templateUrl: 'product.component.html',
	styleUrls: ['product.component.scss'],
})
export class ProductComponent implements OnInit {
	count: number = 1;

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.productService.getProductFromCategoryById().subscribe();
	}

	plus() {
		this.count = this.count < 1000 ? this.count + 1 : this.count;
	}

	minus() {
		this.count = this.count > 1 ? this.count - 1 : this.count;
	}

	countValueValidator() {
		if (this.count < 1) {
			this.count = 1;
			return;
		}

		if (this.count > 999) {
			this.count = 999;
		}
	}
}
