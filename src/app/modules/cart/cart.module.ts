import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './components/cart.component';
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {ProductCounterModule} from '../../global/modules/product-counter/product-counter.module';
import {AppRoutingModule} from '../../app-routing.module';
import {LoaderModule} from "../../global/modules/loader/loader.module";


@NgModule({
	declarations: [CartComponent],
	imports: [
		CommonModule,
		BreadcrumbsModule,
		ProductCounterModule,
		AppRoutingModule,
		LoaderModule,
	],
})
export class CartModule {}
