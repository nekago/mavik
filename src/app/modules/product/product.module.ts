import {NgModule} from "@angular/core";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {ProductComponent} from "./components/product.component";
import {FormsModule} from "@angular/forms";

@NgModule({
	declarations: [ProductComponent],
	imports: [BreadcrumbsModule, FormsModule],
})
export class ProductModule {}
