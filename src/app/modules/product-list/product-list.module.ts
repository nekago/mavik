import {NgModule} from "@angular/core";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
	declarations: [ProductListComponent],
	imports: [RouterModule, CommonModule],
})
export class ProductListModule {}
