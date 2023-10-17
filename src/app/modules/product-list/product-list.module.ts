import {NgModule} from "@angular/core";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {ProductCardModule} from "../product-card/product-card.module";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {LoaderModule} from "../../global/modules/loader/loader.module";
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';

@NgModule({
	declarations: [ProductListComponent, FilterCategoryComponent],
	imports: [
		RouterModule,
		CommonModule,
		BreadcrumbsModule,
		ProductCardModule,
		NgxSliderModule,
		LoaderModule,
	],
})
export class ProductListModule {}
