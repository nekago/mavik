import {NgModule} from "@angular/core";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";

@NgModule({
	declarations: [ProductListComponent],
	imports: [RouterModule, CommonModule, BreadcrumbsModule],
})
export class ProductListModule {}
