import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './components/cart.component';
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {ProductCounterModule} from '../../global/modules/product-counter/product-counter.module';
import {AppRoutingModule} from '../../app-routing.module';


@NgModule({
	declarations: [CartComponent],
    imports: [CommonModule, BreadcrumbsModule, ProductCounterModule, AppRoutingModule],
})
export class CartModule {}
