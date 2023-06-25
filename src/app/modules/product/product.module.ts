import {NgModule} from "@angular/core";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {ProductComponent} from "./components/product.component";
import {FormsModule} from "@angular/forms";
import {ProductInCartButtonModule} from '../../global/modules/product-in-cart-button/product-in-cart-button.module';
import {CommonModule} from '@angular/common';

@NgModule({
	declarations: [ProductComponent],
  imports: [BreadcrumbsModule, FormsModule, ProductInCartButtonModule, CommonModule],
})
export class ProductModule {}
