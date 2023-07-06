import {NgModule} from "@angular/core";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {ProductComponent} from "./components/product.component";
import {FormsModule} from "@angular/forms";
import {ProductInCartButtonModule} from '../../global/modules/product-in-cart-button/product-in-cart-button.module';
import {CommonModule} from '@angular/common';
import {ProductCounterModule} from '../../global/modules/product-counter/product-counter.module';

@NgModule({
	declarations: [ProductComponent],
    imports: [BreadcrumbsModule, FormsModule, ProductInCartButtonModule, CommonModule, ProductCounterModule],
})
export class ProductModule {}
