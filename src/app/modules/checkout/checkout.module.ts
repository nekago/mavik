import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CheckoutComponent} from "./components/checkout.component";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";


@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, BreadcrumbsModule],
})
export class CheckoutModule {}
