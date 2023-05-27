import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProductCardComponent} from "./component/product-card.component";
import {CommonModule} from "@angular/common";


@NgModule({
	declarations: [ProductCardComponent],
	imports: [RouterModule, CommonModule],
	exports: [ProductCardComponent],
})
export class ProductCardModule {}
