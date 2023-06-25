import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './components/cart.component';
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";


@NgModule({
	declarations: [CartComponent],
	imports: [CommonModule, BreadcrumbsModule],
})
export class CartModule {}
