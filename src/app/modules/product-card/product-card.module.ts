import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProductCardComponent} from "./component/product-card.component";
import {CommonModule} from "@angular/common";
import {ProductInCartButtonModule} from '../../global/modules/product-in-cart-button/product-in-cart-button.module';


@NgModule({
	declarations: [ProductCardComponent],
    imports: [RouterModule, CommonModule, ProductInCartButtonModule],
	exports: [ProductCardComponent],
})
export class ProductCardModule {}
