import { Component, Input } from '@angular/core';
import { Product } from '../../../global/entities/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizerService } from '../../../global/services/localizer.service';

@Component({
	selector: 'app-product-card',
	templateUrl: 'product-card.component.html',
	styleUrls: ['product-card.component.scss'],
})
export class ProductCardComponent {
	@Input() product!: Product;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private localizerService: LocalizerService
	) {}

	public redirectToProductPage() {
		this.activatedRoute.params.subscribe(params => {
			const slug =
				params['categorySlug'] ||
				this.localizerService.ukrCategoryToEng(this.product.category);

			this.router.navigateByUrl(`categories/${slug}/${this.product.id}`);
		});
	}
}
