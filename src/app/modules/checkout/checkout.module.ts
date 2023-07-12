import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CheckoutComponent} from "./components/checkout.component";
import {BreadcrumbsModule} from "../breadcrumbs/breadcrumbs.module";
import {AppRoutingModule} from '../../app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../../global/modules/loader/loader.module';


@NgModule({
  declarations: [CheckoutComponent],
    imports: [CommonModule, BreadcrumbsModule, AppRoutingModule, ReactiveFormsModule, LoaderModule],
})
export class CheckoutModule {}
